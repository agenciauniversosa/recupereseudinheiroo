import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Beta namespace typing — kept local to avoid touching auto-gen supabase client.
type OAuthClient = {
  name?: string;
  client_name?: string;
  redirect_uri?: string;
};
type OAuthDetails = {
  client?: OAuthClient;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthResult = { data: OAuthDetails | null; error: { message: string } | null };
type OAuthNs = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
  approveAuthorization: (id: string) => Promise<OAuthResult>;
  denyAuthorization: (id: string) => Promise<OAuthResult>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthNs }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Autorizar acesso | Seu Dinheiro Recuperado";
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Parâmetro authorization_id ausente.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      setEmail(sess.session.user.email ?? null);
      try {
        const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
        if (!active) return;
        if (error) {
          setError(error.message);
          return;
        }
        const immediate = data?.redirect_url ?? data?.redirect_to;
        if (immediate && !data?.client) {
          window.location.href = immediate;
          return;
        }
        setDetails(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro ao carregar autorização.");
      }
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    try {
      const { data, error } = approve
        ? await oauth.approveAuthorization(authorizationId)
        : await oauth.denyAuthorization(authorizationId);
      if (error) {
        setError(error.message);
        setBusy(false);
        return;
      }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) {
        setError("O servidor de autorização não retornou uma URL de redirecionamento.");
        setBusy(false);
        return;
      }
      window.location.href = target;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao processar decisão.");
      setBusy(false);
    }
  };

  const clientName = details?.client?.client_name ?? details?.client?.name ?? "aplicativo externo";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md p-8 space-y-6">
        {error ? (
          <>
            <h1 className="font-display text-2xl font-bold text-navy">Não foi possível carregar</h1>
            <p className="text-sm text-muted-foreground">{error}</p>
          </>
        ) : !details ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div>
              <h1 className="font-display text-2xl font-bold text-navy">
                Conectar {clientName} à sua conta
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {clientName} poderá chamar as ferramentas MCP deste painel enquanto você estiver conectado.
              </p>
            </div>
            {email && (
              <div className="text-xs text-muted-foreground border rounded p-3">
                Autorizando como <strong>{email}</strong>
              </div>
            )}
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>Listar e detalhar leads do painel</li>
              <li>Atualizar status e adicionar notas</li>
              <li>Consultar estatísticas agregadas</li>
            </ul>
            <p className="text-xs text-muted-foreground">
              Isso não ignora as permissões do banco de dados: as ações continuam sujeitas às políticas do seu usuário.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => decide(true)} disabled={busy} className="flex-1 bg-navy">
                {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Aprovar
              </Button>
              <Button onClick={() => decide(false)} disabled={busy} variant="outline" className="flex-1">
                Recusar
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default OAuthConsent;