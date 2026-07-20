
-- Followup templates
CREATE TABLE public.followup_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event TEXT NOT NULL UNIQUE,
  channel TEXT NOT NULL DEFAULT 'whatsapp',
  message TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.followup_templates TO authenticated;
GRANT ALL ON public.followup_templates TO service_role;
ALTER TABLE public.followup_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage templates" ON public.followup_templates FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_ft_updated BEFORE UPDATE ON public.followup_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Followups log
CREATE TABLE public.lead_followups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'whatsapp',
  message TEXT NOT NULL,
  wa_link TEXT,
  status TEXT NOT NULL DEFAULT 'pendente',
  sent_at TIMESTAMPTZ,
  sent_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_lead_followups_lead ON public.lead_followups(lead_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_followups TO authenticated;
GRANT ALL ON public.lead_followups TO service_role;
ALTER TABLE public.lead_followups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view followups" ON public.lead_followups FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update followups" ON public.lead_followups FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete followups" ON public.lead_followups FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_lf_updated BEFORE UPDATE ON public.lead_followups
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default templates
INSERT INTO public.followup_templates (event, message) VALUES
('novo_lead', 'Olá {{name}}! Recebemos sua solicitação de análise sobre o imóvel na planta. Nossa equipe vai analisar os dados e retorna em breve com os próximos passos. Qualquer dúvida, é só responder por aqui.'),
('em_contato', 'Olá {{name}}, tudo bem? Sou da equipe de análise da SeuDinheiroRecuperado. Estou revisando seu caso e gostaria de agendar uma conversa rápida para entender melhor seu contrato. Qual o melhor horário para você?'),
('ganho', 'Excelente notícia, {{name}}! Seu caso foi aceito para prosseguir com a ação de restituição. Em breve enviaremos os documentos necessários. Obrigado pela confiança!'),
('perdido', 'Olá {{name}}, agradecemos o contato. Após análise, não identificamos base para prosseguir no momento, mas ficamos à disposição para reavaliar caso surjam novas informações. Um abraço!');

-- Helper: render template with {{name}}, {{city}}, {{property_value}}
CREATE OR REPLACE FUNCTION public.render_followup_message(_tpl TEXT, _lead public.leads)
RETURNS TEXT LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT replace(replace(replace(replace(_tpl,
    '{{name}}', COALESCE(_lead.name, '')),
    '{{city}}', COALESCE(_lead.city, '')),
    '{{property_value}}', COALESCE(_lead.property_value, '')),
    '{{email}}', COALESCE(_lead.email, ''));
$$;

-- Helper: build wa.me link
CREATE OR REPLACE FUNCTION public.build_wa_link(_phone TEXT, _message TEXT)
RETURNS TEXT LANGUAGE plpgsql IMMUTABLE SET search_path = public AS $$
DECLARE
  digits TEXT;
BEGIN
  digits := regexp_replace(COALESCE(_phone, ''), '[^0-9]', '', 'g');
  IF length(digits) = 0 THEN RETURN NULL; END IF;
  IF left(digits, 2) <> '55' THEN digits := '55' || digits; END IF;
  RETURN 'https://wa.me/' || digits || '?text=' || replace(replace(replace(replace(replace(replace(
    _message,
    '%', '%25'), ' ', '%20'), E'\n', '%0A'), '!', '%21'), '?', '%3F'), '&', '%26');
END; $$;

-- Trigger: auto-enqueue followups
CREATE OR REPLACE FUNCTION public.enqueue_lead_followup()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  ev TEXT;
  tpl RECORD;
  rendered TEXT;
BEGIN
  IF TG_OP = 'INSERT' THEN
    ev := 'novo_lead';
  ELSIF TG_OP = 'UPDATE' AND NEW.status <> OLD.status THEN
    ev := NEW.status::text;
  ELSE
    RETURN NEW;
  END IF;

  SELECT * INTO tpl FROM public.followup_templates WHERE event = ev AND active = true;
  IF NOT FOUND THEN RETURN NEW; END IF;

  rendered := public.render_followup_message(tpl.message, NEW);

  INSERT INTO public.lead_followups (lead_id, event, channel, message, wa_link, status)
  VALUES (NEW.id, ev, tpl.channel, rendered, public.build_wa_link(NEW.phone, rendered), 'pendente');

  RETURN NEW;
END; $$;

CREATE TRIGGER trg_lead_followup_ins
  AFTER INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.enqueue_lead_followup();

CREATE TRIGGER trg_lead_followup_upd
  AFTER UPDATE OF status ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.enqueue_lead_followup();
