import { Shield, DollarSign, Scale, Clock, CheckCircle, ChevronDown, Phone, MessageCircle, ArrowRight, Building2, Users, FileCheck, Gavel, Calculator, Mail, User, MapPin, Send, Menu, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP = "5500000000000";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Calculadora", href: "#calculadora" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 border-b transition-all ${scrolled ? "border-gold/10 bg-navy-dark/95 backdrop-blur-md" : "border-transparent bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 bg-gold" />
          <span className="font-display font-bold text-lg md:text-xl tracking-widest uppercase text-primary-foreground">
            Recupere Seu Dinheiro
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide text-primary-foreground/70">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-gold transition-colors">{l.label}</a>
          ))}
        </div>
        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex bg-gold text-navy-dark px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-primary-foreground transition-colors"
        >
          Falar no WhatsApp
        </a>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground" aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-navy-dark/98 backdrop-blur-md border-t border-gold/10">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-gold transition-colors py-2">{l.label}</a>
            ))}
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="bg-gold text-navy-dark px-5 py-3 text-xs font-bold uppercase tracking-wider text-center mt-2">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => (
  <header className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-8 overflow-hidden bg-navy-dark">
    {/* Spotlight */}
    <div className="absolute top-0 right-0 lg:right-1/4 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[radial-gradient(circle_at_center,_hsl(var(--gold)/0.18)_0%,_transparent_60%)] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_hsl(var(--navy)/0.4)_0%,_transparent_70%)] pointer-events-none" />

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="max-w-4xl">
        <div className="inline-block border border-gold/30 bg-gold/10 px-4 py-1.5 mb-8">
          <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
            Sem Custo até Ganhar • Risco Zero
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-black leading-[0.95] tracking-tight text-primary-foreground mb-8">
          Comprou imóvel <br className="hidden md:block" />na planta?
          <br />
          <span className="text-gold italic font-bold">Recupere seu dinheiro.</span>
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl leading-relaxed mb-12 font-light">
          Milhares de brasileiros pagaram <strong className="text-primary-foreground/90 font-semibold">juros indevidos</strong> em seus contratos.
          A lei está do seu lado — e nós entramos com a ação <strong className="text-gold font-semibold">sem você pagar nada até ganhar.</strong>
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
            href="#contato"
            className="group bg-gold text-navy-dark px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary-foreground transition-all shadow-[4px_4px_0px_hsl(var(--primary-foreground))] hover:shadow-[6px_6px_0px_hsl(var(--primary-foreground))] hover:-translate-y-0.5 inline-flex items-center gap-3"
          >
            Quero Recuperar Meu Dinheiro
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-display font-black text-primary-foreground tabular-nums">R$ 80mil+</span>
            <span className="text-xs text-primary-foreground/50 tracking-wider uppercase">Recuperados em caso real</span>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-3 text-sm text-primary-foreground/60">
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Sem custo até ganhar</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 100% dentro da Lei</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Para todo o Brasil</div>
        </div>
      </div>
    </div>
  </header>
);

const StatsSection = () => (
  <section className="py-20 md:py-24 bg-navy-dark border-t border-gold/10">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 border border-gold/10 p-px">
        {[
          { value: "2M+", label: "Imóveis vendidos na planta", icon: Building2 },
          { value: "300mil+", label: "Potenciais lesados no Brasil", icon: Users },
          { value: "R$80mil", label: "Recuperado em caso real", icon: DollarSign },
          { value: "5 anos", label: "Prazo para reivindicar", icon: Clock },
        ].map((stat) => (
          <div key={stat.label} className="bg-navy-dark p-8 md:p-10 flex flex-col group hover:bg-navy/50 transition-colors">
            <stat.icon className="w-7 h-7 text-gold mb-6" />
            <div className="text-3xl md:text-4xl font-display font-black text-primary-foreground tabular-nums">{stat.value}</div>
            <div className="text-xs md:text-sm text-primary-foreground/50 mt-2 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="py-24 md:py-32 bg-navy border-t border-gold/10">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="mb-16 max-w-3xl">
        <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Entenda o Problema</span>
        <h2 className="text-4xl md:text-5xl font-display font-black text-primary-foreground mt-4 mb-6 leading-tight">
          Construtoras cobram juros <span className="text-gold italic">ilegais</span> em imóveis na planta
        </h2>
        <p className="text-primary-foreground/60 text-lg leading-relaxed">
          A <strong className="text-primary-foreground/90">Lei nº 10.931/2004</strong> proíbe a cobrança de correção monetária mensal em contratos quitados em prazo
          inferior a 36 meses. Mesmo assim, milhares de construtoras continuam aplicando esses juros indevidamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10 border border-gold/10 p-px">
        {[
          { icon: FileCheck, title: "Cobrança Indevida", desc: "Correção monetária mensal aplicada onde a lei proíbe — direto no seu bolso." },
          { icon: Scale, title: "Seus Direitos", desc: "A legislação garante o ressarcimento — muitas vezes em dobro do que foi pago." },
          { icon: DollarSign, title: "Restituição Real", desc: "Valores que podem chegar a R$ 80.000 ou mais, dependendo do contrato." },
        ].map((item, i) => (
          <div key={item.title} className="bg-navy p-8 md:p-10 flex flex-col group hover:bg-navy-dark transition-colors">
            <div className="text-gold text-5xl font-light mb-8 font-display">0{i + 1}.</div>
            <item.icon className="w-7 h-7 text-gold mb-4" />
            <h3 className="text-xl font-display font-bold text-primary-foreground mb-3 uppercase tracking-wide">{item.title}</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ZeroCostSection = () => (
  <section className="py-24 md:py-32 bg-navy-dark border-t border-gold/10 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_hsl(var(--gold)/0.1)_0%,_transparent_70%)] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div>
          <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Risco Zero</span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-primary-foreground mt-4 mb-8 leading-[1.05]">
            Você não paga <i className="text-gold">nada</i> até ganhar a ação.
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10 max-w-xl">
            Nosso modelo é 100% baseado no êxito. Você só paga honorários quando receber a restituição.
            Sem risco, sem surpresas, sem adiantamentos.
          </p>
          <ul className="space-y-5">
            {[
              { title: "Risco Zero Real", desc: "Você não gasta nenhum centavo do seu bolso para iniciar o processo." },
              { title: "Base Legal Sólida", desc: "Tese fundamentada na Lei nº 10.931/2004, com casos vencidos no Brasil." },
              { title: "100% Remoto", desc: "Atendemos clientes em todo o território nacional, sem precisar sair de casa." },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <div className="w-6 h-6 border border-gold flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-gold" />
                </div>
                <div>
                  <strong className="block text-primary-foreground uppercase tracking-wide text-sm mb-1">{item.title}</strong>
                  <span className="text-primary-foreground/60 text-sm">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-navy border border-gold/20 p-10 md:p-12 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
          <Shield className="w-12 h-12 text-gold mb-6" />
          <p className="text-primary-foreground/50 text-xs uppercase tracking-[0.2em] mb-3">Compromisso</p>
          <p className="text-primary-foreground font-display text-2xl md:text-3xl leading-tight italic mb-8">
            "Se não recuperarmos seu dinheiro, você não paga absolutamente nada."
          </p>
          <div className="border-t border-gold/20 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-primary-foreground/50 uppercase tracking-wider mb-1">Honorários</p>
                <p className="text-gold font-display text-2xl">Apenas no êxito</p>
              </div>
              <Gavel className="w-8 h-8 text-gold/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section id="como-funciona" className="py-24 md:py-32 bg-navy border-t border-gold/10">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="mb-16 max-w-3xl">
        <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Como Funciona</span>
        <h2 className="text-4xl md:text-5xl font-display font-black text-primary-foreground mt-4 leading-tight">
          Simples, rápido e <span className="text-gold italic">sem risco.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 border border-gold/10 p-px">
        {[
          { step: "01", title: "Entre em Contato", desc: "Fale conosco pelo WhatsApp ou formulário e envie os dados do seu contrato." },
          { step: "02", title: "Análise Gratuita", desc: "Nossa equipe verifica se há cobrança indevida — sem nenhum custo." },
          { step: "03", title: "Ação Judicial", desc: "Entramos com o processo para recuperar seus valores pagos a mais." },
          { step: "04", title: "Receba de Volta", desc: "Você recebe a restituição e só então paga nossos honorários." },
        ].map((item) => (
          <div key={item.step} className="bg-navy p-8 md:p-10 flex flex-col group hover:bg-navy-dark transition-colors min-h-[260px]">
            <div className="text-gold text-5xl font-light mb-8 font-display">{item.step}.</div>
            <h3 className="text-lg font-display font-bold text-primary-foreground mb-3 uppercase tracking-wide">{item.title}</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CalculatorSection = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [installmentsPaid, setInstallmentsPaid] = useState("");
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  const [calculated, setCalculated] = useState(false);

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const amount = parseInt(numbers || "0", 10) / 100;
    return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handleCurrencyInput = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 12) setter(raw);
    setCalculated(false);
  };

  const handleInstallments = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (parseInt(raw || "0", 10) <= 360) setInstallmentsPaid(raw);
    setCalculated(false);
  };

  const rawPropertyValue = parseInt(propertyValue || "0", 10) / 100;
  const rawMonthly = parseInt(monthlyInstallment || "0", 10) / 100;
  const rawInstallments = parseInt(installmentsPaid || "0", 10);

  const estimate = useMemo(() => {
    if (rawPropertyValue < 100 || rawInstallments < 1 || rawMonthly < 100) return null;
    const totalPaid = rawMonthly * rawInstallments;
    const averageRate = 0.01;
    const estimatedOvercharge = totalPaid * averageRate * rawInstallments * 0.5;
    const minValue = Math.round(estimatedOvercharge * 0.6);
    const maxValue = Math.round(estimatedOvercharge * 1.4);
    return { min: Math.max(minValue, 500), max: Math.max(maxValue, 2000) };
  }, [rawPropertyValue, rawInstallments, rawMonthly]);

  const canCalculate = rawPropertyValue >= 10000 && rawInstallments >= 6 && rawMonthly >= 100;

  return (
    <section id="calculadora" className="py-24 md:py-32 bg-navy-dark border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Simulação Gratuita</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-primary-foreground mt-4 mb-8 leading-[1.05]">
              Quanto você pode <i className="text-gold">recuperar?</i>
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10 max-w-xl">
              Faça uma estimativa rápida e gratuita do valor que pode ser restituído. Sem compromisso.
            </p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 border border-gold flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-gold" />
                </div>
                <div>
                  <strong className="block text-primary-foreground uppercase tracking-wide text-sm mb-1">100% Confidencial</strong>
                  <span className="text-primary-foreground/60 text-sm">Seus dados não são armazenados sem consentimento.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 border border-gold flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-gold" />
                </div>
                <div>
                  <strong className="block text-primary-foreground uppercase tracking-wide text-sm mb-1">Estimativa Rápida</strong>
                  <span className="text-primary-foreground/60 text-sm">Resultado em segundos, baseado em casos reais.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-navy border border-gold/20 p-8 md:p-12 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">Valor do Imóvel</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={propertyValue ? formatCurrency(propertyValue) : ""}
                  onChange={handleCurrencyInput(setPropertyValue)}
                  placeholder="R$ 0,00"
                  className="w-full bg-transparent border-b border-gold/30 pb-3 text-2xl md:text-3xl font-display text-primary-foreground placeholder:text-primary-foreground/20 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">Valor da Parcela Mensal</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={monthlyInstallment ? formatCurrency(monthlyInstallment) : ""}
                  onChange={handleCurrencyInput(setMonthlyInstallment)}
                  placeholder="R$ 0,00"
                  className="w-full bg-transparent border-b border-gold/30 pb-3 text-2xl md:text-3xl font-display text-primary-foreground placeholder:text-primary-foreground/20 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">Parcelas Já Pagas</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={installmentsPaid}
                  onChange={handleInstallments}
                  placeholder="Ex: 24"
                  maxLength={3}
                  className="w-full bg-transparent border-b border-gold/30 pb-3 text-2xl md:text-3xl font-display text-primary-foreground placeholder:text-primary-foreground/20 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gold/20">
              {calculated && estimate ? (
                <div>
                  <span className="text-xs text-primary-foreground/60 uppercase tracking-[0.2em] mb-2 block">Estimativa de Recuperação</span>
                  <span className="block text-3xl md:text-5xl text-gold font-display font-light tabular-nums leading-tight mb-4">
                    {estimate.min.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
                    <span className="text-primary-foreground/40 text-2xl mx-2">a</span>
                    {estimate.max.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
                  </span>
                  <p className="text-primary-foreground/40 text-xs mb-6">*Estimativa simplificada. O valor exato depende da análise completa do contrato.</p>
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Fiz a simulação no site e quero uma análise detalhada.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gold text-navy-dark py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary-foreground transition-colors flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Quero Análise Gratuita
                  </a>
                </div>
              ) : (
                <button
                  onClick={() => setCalculated(true)}
                  disabled={!canCalculate}
                  className="w-full bg-primary-foreground text-navy-dark py-4 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-colors flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Calculator className="w-5 h-5" />
                  Calcular Estimativa
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "Quem tem direito à restituição?", a: "Qualquer pessoa que comprou um imóvel na planta nos últimos 5 anos e pagou parcelas com correção monetária mensal em contratos quitados em prazo inferior a 36 meses." },
    { q: "Preciso pagar algo para iniciar o processo?", a: "Não! Você não paga absolutamente nada até ganhar a ação. Nosso modelo é 100% baseado no êxito — só cobramos honorários quando você receber a restituição." },
    { q: "Qual o valor médio que posso recuperar?", a: "Depende do contrato, mas casos reais já resultaram em restituições de R$ 50.000 a R$ 80.000 ou mais. Nossa equipe faz uma análise gratuita para estimar seu caso." },
    { q: "Isso é legal? É seguro?", a: "Totalmente! A tese é baseada na Lei nº 10.931/2004 e já foi aplicada com sucesso em diversos tribunais brasileiros. Seu direito está 100% amparado pela legislação." },
    { q: "Funciona para qualquer cidade do Brasil?", a: "Sim! Atendemos clientes em todo o território nacional. Todo o processo pode ser feito de forma remota." },
    { q: "Quanto tempo demora o processo?", a: "O prazo varia, mas muitos casos são resolvidos em meses. Nossa equipe utiliza tecnologia para acelerar cada etapa." },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-navy border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Perguntas Frequentes</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-primary-foreground mt-4 leading-tight">
              Tire suas <span className="text-gold italic">dúvidas.</span>
            </h2>
          </div>
          <div className="lg:col-span-2 space-y-px bg-gold/10 border border-gold/10 p-px">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-navy">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-6 md:px-8 py-6 flex items-center justify-between gap-4 group"
                >
                  <span className="font-display font-bold text-primary-foreground text-lg group-hover:text-gold transition-colors">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gold shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-6 md:px-8 pb-6 text-primary-foreground/60 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactFormSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", propertyValue: "", details: "" });
  const [submitted, setSubmitted] = useState(false);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = field === "phone" ? formatPhone(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = form.name.trim().length >= 2 && form.phone.replace(/\D/g, "").length >= 10 && form.email.includes("@") && form.email.includes(".");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    const message = encodeURIComponent(
      `Olá! Preenchi o formulário no site.\n\nNome: ${form.name.trim()}\nTelefone: ${form.phone}\nE-mail: ${form.email.trim()}\nCidade: ${form.city.trim()}\nValor do Imóvel: ${form.propertyValue.trim()}\nDetalhes: ${form.details.trim()}`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${message}`, "_blank");
    setSubmitted(true);
    toast({ title: "Dados enviados!", description: "Você será redirecionado ao WhatsApp." });
  };

  return (
    <section id="contato" className="py-24 md:py-32 bg-navy-dark border-t border-gold/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_hsl(var(--gold)/0.1)_0%,_transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Análise Gratuita</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-primary-foreground mt-4 mb-8 leading-[1.05]">
              Solicite sua <i className="text-gold">avaliação.</i>
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10 max-w-xl">
              Preencha o formulário e nossa equipe fará uma análise completa e gratuita do seu caso.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-4 text-primary-foreground/70">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" /> Resposta em até 24 horas
              </div>
              <div className="flex items-center gap-4 text-primary-foreground/70">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" /> Análise 100% gratuita e sem compromisso
              </div>
              <div className="flex items-center gap-4 text-primary-foreground/70">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" /> Atendimento em todo o Brasil
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="bg-navy border border-gold/20 p-10 text-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
              <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
              <h3 className="text-3xl font-display font-black text-primary-foreground mb-4">Recebemos seus dados!</h3>
              <p className="text-primary-foreground/60 mb-6">Nossa equipe entrará em contato em breve.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", city: "", propertyValue: "", details: "" }); }}
                className="text-gold font-semibold hover:underline text-sm uppercase tracking-wider"
              >
                Enviar outro contato
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-navy border border-gold/20 p-8 md:p-10 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">Nome *</label>
                    <input type="text" value={form.name} onChange={handleChange("name")} maxLength={100} placeholder="Seu nome" className="w-full bg-transparent border-b border-gold/30 pb-2 text-primary-foreground placeholder:text-primary-foreground/20 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">Telefone *</label>
                    <input type="tel" value={form.phone} onChange={handleChange("phone")} placeholder="(00) 00000-0000" className="w-full bg-transparent border-b border-gold/30 pb-2 text-primary-foreground placeholder:text-primary-foreground/20 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">E-mail *</label>
                    <input type="email" value={form.email} onChange={handleChange("email")} maxLength={255} placeholder="seu@email.com" className="w-full bg-transparent border-b border-gold/30 pb-2 text-primary-foreground placeholder:text-primary-foreground/20 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">Cidade / UF</label>
                    <input type="text" value={form.city} onChange={handleChange("city")} maxLength={100} placeholder="São Paulo - SP" className="w-full bg-transparent border-b border-gold/30 pb-2 text-primary-foreground placeholder:text-primary-foreground/20 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">Valor do Imóvel</label>
                  <input type="text" value={form.propertyValue} onChange={handleChange("propertyValue")} maxLength={30} placeholder="Ex: R$ 500.000" className="w-full bg-transparent border-b border-gold/30 pb-2 text-primary-foreground placeholder:text-primary-foreground/20 focus:outline-none focus:border-gold transition-colors" />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">Detalhes do Imóvel</label>
                  <textarea value={form.details} onChange={handleChange("details")} maxLength={500} rows={3} placeholder="Construtora, empreendimento, ano da compra, parcelas..." className="w-full bg-transparent border-b border-gold/30 pb-2 text-primary-foreground placeholder:text-primary-foreground/20 focus:outline-none focus:border-gold transition-colors resize-none" />
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full bg-gold text-navy-dark py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary-foreground transition-colors flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed mt-4"
                >
                  <Send className="w-5 h-5" />
                  Solicitar Análise Gratuita
                </button>

                <p className="text-xs text-primary-foreground/40 text-center">
                  Seus dados são confidenciais e usados apenas para análise do seu caso.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-24 md:py-32 bg-navy border-t border-gold/10 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,_hsl(var(--gold)/0.12)_0%,_transparent_60%)] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-primary-foreground mb-8 leading-[1.05] max-w-4xl mx-auto">
        Não deixe seu dinheiro nas mãos da <i className="text-gold">construtora.</i>
      </h2>
      <p className="text-primary-foreground/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
        Cada dia que passa é um dia a menos do seu prazo de 5 anos. Fale conosco agora e descubra quanto você pode recuperar.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Quero saber se tenho direito à restituição.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gold text-navy-dark px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary-foreground transition-all shadow-[4px_4px_0px_hsl(var(--primary-foreground))] hover:shadow-[6px_6px_0px_hsl(var(--primary-foreground))] hover:-translate-y-0.5 inline-flex items-center justify-center gap-3"
        >
          <MessageCircle className="w-5 h-5" />
          Falar pelo WhatsApp
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href={`tel:+${WHATSAPP}`}
          className="bg-transparent border border-primary-foreground/30 text-primary-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary-foreground/10 transition-colors inline-flex items-center justify-center gap-3"
        >
          <Phone className="w-5 h-5" />
          Ligar Agora
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-navy-dark border-t border-gold/10 py-12 px-6 md:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 bg-gold" />
          <span className="font-display font-bold text-lg tracking-widest uppercase text-primary-foreground">Recupere Seu Dinheiro</span>
        </div>
        <div className="flex gap-6 text-xs uppercase tracking-widest text-primary-foreground/40">
          <a href="#como-funciona" className="hover:text-gold transition-colors">Como Funciona</a>
          <a href="#calculadora" className="hover:text-gold transition-colors">Calculadora</a>
          <a href="#contato" className="hover:text-gold transition-colors">Contato</a>
        </div>
      </div>
      <div className="border-t border-gold/10 pt-8 text-center">
        <p className="text-sm text-primary-foreground/60 mb-3">
          Recupere Seu Dinheiro é um produto da agência <strong className="text-primary-foreground/80">Universo S.A.</strong>
        </p>
        <p className="text-xs text-primary-foreground/30 max-w-2xl mx-auto">
          © {new Date().getFullYear()} Todos os direitos reservados. Este site não constitui aconselhamento jurídico.
          Consulte um advogado para análise do seu caso específico.
        </p>
      </div>
    </div>
  </footer>
);

const Index = () => (
  <div className="bg-navy-dark min-h-screen">
    <Navbar />
    <HeroSection />
    <StatsSection />
    <ProblemSection />
    <ZeroCostSection />
    <HowItWorksSection />
    <CalculatorSection />
    <FAQSection />
    <ContactFormSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
