import { Shield, DollarSign, Scale, Clock, CheckCircle, ChevronDown, Phone, MessageCircle, ArrowRight, Building2, Users, FileCheck, Gavel, Calculator, Send, Menu, X, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useReveal } from "@/hooks/use-reveal";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-construction.jpg";
import ctaBg from "@/assets/cta-blueprint.jpg";

const WHATSAPP = "5500000000000";

/* ---------- NAVBAR ---------- */
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent border-b border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center group" aria-label="Recupere Seu Dinheiro">
          <img
            src={logo}
            alt="Recupere Seu Dinheiro"
            className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </a>
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-navy/70">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-dark group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-navy text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gold hover:text-navy transition-all hover:scale-105 hover:shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-navy" aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-fade-in-soft">
          <div className="px-6 py-6 flex flex-col gap-2">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-navy/80 hover:text-gold-dark hover:bg-muted/50 transition-all py-3 px-4 -mx-4 rounded-xl font-medium">{l.label}</a>
            ))}
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="bg-navy text-primary-foreground px-5 py-3.5 rounded-full text-sm font-semibold text-center mt-3 inline-flex items-center justify-center gap-2 hover:bg-gold hover:text-navy transition-colors">
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

/* ---------- HERO ---------- */
const HeroSection = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / 1500, 1);
      setCount(Math.floor(80000 * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <header className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-8 overflow-hidden bg-background">
      {/* Background image with transparency */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none animate-fade-in-soft"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Soft gradient overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />

      {/* Animated blobs */}

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(hsl(var(--navy)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--navy)) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-2 mb-8 animate-fade-up backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-dark opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-dark" />
            </span>
            <span className="text-gold-dark text-xs font-bold tracking-wide uppercase">
              Sem custo até ganhar • Risco Zero
            </span>
          </div>

          <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1] md:leading-[0.95] tracking-tight text-navy mb-6 md:mb-8 animate-fade-up delay-100">
            Comprou imóvel <br className="hidden md:block" />na planta?
            <br />
            <span className="inline-block bg-gradient-to-r from-gold-dark via-gold to-gold-dark bg-clip-text text-transparent animate-gradient-shift">
              Recupere seu dinheiro.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-navy/70 max-w-2xl leading-relaxed mb-12 animate-fade-up delay-200">
            Milhares de brasileiros pagaram <strong className="text-navy font-semibold">juros indevidos</strong> em seus contratos.
            A lei está do seu lado — e nós entramos com a ação <strong className="text-gold-dark font-semibold">sem você pagar nada até ganhar.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 animate-fade-up delay-300">
            <a
              href="#contato"
              className="group relative bg-navy text-primary-foreground px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[13px] sm:text-sm font-bold uppercase tracking-wide sm:tracking-wider overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-navy/30 inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative group-hover:text-navy transition-colors">Quero Recuperar Meu Dinheiro</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 group-hover:text-navy transition-all" />
            </a>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gold-dark" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-display font-bold text-navy tabular-nums">
                  R$ {count.toLocaleString("pt-BR")}+
                </span>
                <span className="text-xs text-navy/50 tracking-wider uppercase">Recuperado em caso real</span>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-3 text-sm text-navy/60 animate-fade-up delay-500">
            {["Sem custo até ganhar", "100% dentro da Lei", "Para todo o Brasil"].map((t, i) => (
              <div key={t} className="flex items-center gap-2 group cursor-default">
                <CheckCircle className="w-4 h-4 text-gold-dark group-hover:scale-125 transition-transform" />
                <span className="group-hover:text-navy transition-colors">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <ChevronDown className="w-6 h-6 text-navy/30" />
      </div>
    </header>
  );
};

/* ---------- MARQUEE ---------- */
const MarqueeSection = () => {
  const items = ["Lei nº 10.931/2004", "Risco Zero", "Análise Gratuita", "100% Remoto", "Pague só no êxito", "Para todo Brasil", "Casos Reais Vencidos", "Sem Adiantamentos"];
  return (
    <section className="bg-navy py-6 overflow-hidden border-y-4 border-gold">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-4 mx-8">
            <Sparkles className="w-4 h-4 text-gold shrink-0" />
            <span className="text-primary-foreground font-display font-bold text-lg uppercase tracking-wider">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------- STATS ---------- */
const StatsSection = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-20 md:py-24 bg-background">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: "2M+", label: "Imóveis vendidos na planta", icon: Building2 },
            { value: "300mil+", label: "Potenciais lesados no Brasil", icon: Users },
            { value: "R$ 80mil", label: "Recuperado em caso real", icon: DollarSign },
            { value: "5 anos", label: "Prazo para reivindicar", icon: Clock },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-gold-dark hover:-translate-y-2 transition-all duration-500 cursor-default overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mb-5 group-hover:bg-gold-dark group-hover:scale-110 transition-all">
                  <stat.icon className="w-6 h-6 text-gold-dark group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-navy tabular-nums">{stat.value}</div>
                <div className="text-xs md:text-sm text-navy/60 mt-2">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- PROBLEM ---------- */
const ProblemSection = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-24 md:py-32 bg-muted/50 relative overflow-hidden">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 md:px-8 relative">
        <div className="mb-16 max-w-3xl">
          <span className="inline-block text-gold-dark text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 bg-gold/10 rounded-full">Entenda o Problema</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-[1.05]">
            Construtoras cobram juros{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-gold-dark">ilegais</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-gold/30 -z-0" />
            </span>{" "}
            em imóveis na planta
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mt-6">
            A <strong className="text-navy">Lei nº 10.931/2004</strong> proíbe a cobrança de correção monetária mensal em contratos quitados em prazo
            inferior a 36 meses. Mesmo assim, milhares de construtoras continuam aplicando esses juros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: FileCheck, title: "Cobrança Indevida", desc: "Correção monetária mensal aplicada onde a lei proíbe — direto no seu bolso." },
            { icon: Scale, title: "Seus Direitos", desc: "A legislação garante o ressarcimento — muitas vezes em dobro do que foi pago." },
            { icon: DollarSign, title: "Restituição Real", desc: "Valores que podem chegar a R$ 80.000 ou mais, dependendo do contrato." },
          ].map((item, i) => (
            <div
              key={item.title}
              className="group relative bg-card border border-border rounded-3xl p-8 hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-3 hover:border-gold-dark transition-all duration-500"
            >
              <div className="absolute top-6 right-6 text-7xl font-display font-bold text-muted opacity-50 group-hover:text-gold/30 transition-colors">
                0{i + 1}
              </div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center mb-6 group-hover:bg-gold-dark group-hover:rotate-6 transition-all duration-500">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-display font-bold text-navy mb-3">{item.title}</h3>
                <p className="text-navy/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- ZERO COST ---------- */
const ZeroCostSection = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-block text-gold-dark text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 bg-gold/10 rounded-full">Risco Zero</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8 leading-[1.05]">
              Você não paga{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-gold-dark italic">nada</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-gold/30 -z-0" />
              </span>{" "}
              até ganhar a ação.
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-xl">
              Nosso modelo é 100% baseado no êxito. Você só paga honorários quando receber a restituição.
              Sem risco, sem surpresas, sem adiantamentos.
            </p>
            <ul className="space-y-5">
              {[
                { title: "Risco Zero Real", desc: "Você não gasta nenhum centavo do seu bolso para iniciar o processo." },
                { title: "Base Legal Sólida", desc: "Tese fundamentada na Lei nº 10.931/2004, com casos vencidos no Brasil." },
                { title: "100% Remoto", desc: "Atendemos clientes em todo o território nacional, sem precisar sair de casa." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold-dark group-hover:scale-110 transition-all">
                    <CheckCircle className="w-5 h-5 text-gold-dark group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <strong className="block text-navy text-base mb-1">{item.title}</strong>
                    <span className="text-navy/60 text-sm">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-4 bg-navy/5 rounded-3xl blur-2xl" />
            <div className="relative bg-card border border-border rounded-3xl p-10 md:p-12 shadow-2xl shadow-navy/10">
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-2xl bg-gold flex items-center justify-center shadow-lg shadow-gold/30 animate-float">
                <Shield className="w-8 h-8 text-navy" />
              </div>
              <p className="text-navy/50 text-xs uppercase tracking-[0.2em] mb-4 font-semibold">Nosso Compromisso</p>
              <p className="text-navy font-display text-2xl md:text-3xl leading-tight mb-8 font-bold">
                "Se não recuperarmos seu dinheiro, você não paga absolutamente nada."
              </p>
              <div className="border-t border-border pt-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-navy/50 uppercase tracking-wider mb-1 font-semibold">Honorários</p>
                  <p className="text-gold-dark font-display text-2xl font-bold">Apenas no êxito</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center">
                  <Gavel className="w-7 h-7 text-gold" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- HOW IT WORKS ---------- */
const HowItWorksSection = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-muted/50">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16 max-w-3xl">
          <span className="inline-block text-gold-dark text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 bg-gold/10 rounded-full">Como Funciona</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-[1.05]">
            Simples, rápido e <span className="text-gold-dark italic">sem risco.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Entre em Contato", desc: "Fale conosco pelo WhatsApp ou formulário e envie os dados do seu contrato.", icon: MessageCircle },
              { step: "02", title: "Análise Gratuita", desc: "Nossa equipe verifica se há cobrança indevida — sem nenhum custo.", icon: FileCheck },
              { step: "03", title: "Ação Judicial", desc: "Entramos com o processo para recuperar seus valores pagos a mais.", icon: Gavel },
              { step: "04", title: "Receba de Volta", desc: "Você recebe a restituição e só então paga nossos honorários.", icon: DollarSign },
            ].map((item, i) => (
              <div
                key={item.step}
                className="group relative bg-card border border-border rounded-3xl p-8 hover:border-gold-dark hover:shadow-xl hover:shadow-navy/10 hover:-translate-y-2 transition-all duration-500"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gold rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                  <div className="relative w-16 h-16 rounded-full bg-navy flex items-center justify-center group-hover:bg-gold-dark transition-colors">
                    <item.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-xs shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-navy mb-3 text-center">{item.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- CALCULATOR ---------- */
const CalculatorSection = () => {
  const ref = useReveal<HTMLDivElement>();
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
    <section id="calculadora" className="py-24 md:py-32 bg-background relative overflow-hidden">

      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="inline-block text-gold-dark text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 bg-gold/10 rounded-full">Simulação Gratuita</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8 leading-[1.05]">
              Quanto você pode <span className="text-gold-dark italic">recuperar?</span>
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-xl">
              Faça uma estimativa rápida e gratuita do valor que pode ser restituído. Sem compromisso.
            </p>
            <ul className="space-y-4">
              {[
                { icon: Shield, title: "100% Confidencial", desc: "Seus dados não são armazenados sem consentimento." },
                { icon: Zap, title: "Estimativa Rápida", desc: "Resultado em segundos, baseado em casos reais." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold-dark transition-colors">
                    <item.icon className="w-5 h-5 text-gold-dark group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <strong className="block text-navy mb-1">{item.title}</strong>
                    <span className="text-navy/60 text-sm">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-navy/5 rounded-3xl blur-2xl" />
            <div className="relative bg-card border border-border rounded-3xl p-8 md:p-10 shadow-2xl shadow-navy/10">
              <div className="space-y-7">
                {[
                  { label: "Valor do Imóvel", value: propertyValue, onChange: handleCurrencyInput(setPropertyValue), formatted: propertyValue ? formatCurrency(propertyValue) : "", placeholder: "R$ 0,00" },
                  { label: "Valor da Parcela Mensal", value: monthlyInstallment, onChange: handleCurrencyInput(setMonthlyInstallment), formatted: monthlyInstallment ? formatCurrency(monthlyInstallment) : "", placeholder: "R$ 0,00" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/60 mb-3">{field.label}</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={field.formatted}
                      onChange={field.onChange}
                      placeholder={field.placeholder}
                      className="w-full bg-muted/50 border-2 border-border rounded-xl px-5 py-4 text-2xl font-display font-bold text-navy placeholder:text-navy/20 focus:outline-none focus:border-gold-dark focus:bg-background transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy/60 mb-3">Parcelas Já Pagas</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={installmentsPaid}
                    onChange={handleInstallments}
                    placeholder="Ex: 24"
                    maxLength={3}
                    className="w-full bg-muted/50 border-2 border-border rounded-xl px-5 py-4 text-2xl font-display font-bold text-navy placeholder:text-navy/20 focus:outline-none focus:border-gold-dark focus:bg-background transition-all"
                  />
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                {calculated && estimate ? (
                  <div className="animate-fade-up">
                    <div className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-6 mb-6 text-center">
                      <span className="text-xs text-primary-foreground/60 uppercase tracking-wider mb-2 block font-semibold">Estimativa de Recuperação</span>
                      <div className="text-3xl md:text-4xl font-display font-bold text-gold tabular-nums leading-tight">
                        {estimate.min.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
                        <span className="text-primary-foreground/30 text-2xl mx-2">a</span>
                        {estimate.max.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
                      </div>
                      <p className="text-primary-foreground/40 text-xs mt-3">*Estimativa simplificada</p>
                    </div>
                    <a
                      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Fiz a simulação no site e quero uma análise detalhada.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-navy text-primary-foreground py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-gold hover:text-navy transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Quero Análise Gratuita
                    </a>
                  </div>
                ) : (
                  <button
                    onClick={() => setCalculated(true)}
                    disabled={!canCalculate}
                    className="w-full bg-navy text-primary-foreground py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-gold hover:text-navy transition-all hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Calculator className="w-5 h-5" />
                    Calcular Estimativa
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- FAQ ---------- */
const FAQSection = () => {
  const ref = useReveal<HTMLDivElement>();
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
    <section id="faq" className="py-24 md:py-32 bg-muted/50">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <span className="inline-block text-gold-dark text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 bg-gold/10 rounded-full">FAQ</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-[1.05]">
              Tire suas <span className="text-gold-dark italic">dúvidas.</span>
            </h2>
            <p className="text-navy/60 mt-6 leading-relaxed">
              Reunimos as perguntas mais frequentes para ajudar você a entender todo o processo.
            </p>
          </div>
          <div className="lg:col-span-2 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-card border-2 rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? "border-gold-dark shadow-lg shadow-navy/5" : "border-border hover:border-gold/40"}`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-6 md:px-7 py-5 flex items-center justify-between gap-4 group"
                >
                  <span className="font-display font-bold text-navy text-lg">{faq.q}</span>
                  <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${open === i ? "bg-gold-dark rotate-180" : "bg-muted group-hover:bg-gold/20"}`}>
                    <ChevronDown className={`w-4 h-4 transition-colors ${open === i ? "text-primary-foreground" : "text-navy"}`} />
                  </div>
                </button>
                <div className={`grid transition-all duration-500 ease-out ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-7 pb-6 text-navy/70 leading-relaxed">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- CONTACT FORM ---------- */
const ContactFormSection = () => {
  const ref = useReveal<HTMLDivElement>();
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
    <section id="contato" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <span className="inline-block text-gold-dark text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 bg-gold/10 rounded-full">Análise Gratuita</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8 leading-[1.05]">
              Solicite sua <span className="text-gold-dark italic">avaliação.</span>
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-xl">
              Preencha o formulário e nossa equipe fará uma análise completa e gratuita do seu caso.
            </p>
            <div className="space-y-4">
              {["Resposta em até 24 horas", "Análise 100% gratuita e sem compromisso", "Atendimento em todo o Brasil"].map((t) => (
                <div key={t} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center group-hover:bg-gold-dark transition-colors">
                    <CheckCircle className="w-4 h-4 text-gold-dark group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-navy/70 group-hover:text-navy transition-colors">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-navy/5 rounded-3xl blur-2xl" />
            {submitted ? (
              <div className="relative bg-card border border-border rounded-3xl p-10 text-center shadow-2xl shadow-navy/10 animate-scale-in">
                <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6 animate-float">
                  <CheckCircle className="w-10 h-10 text-gold-dark" />
                </div>
                <h3 className="text-3xl font-display font-bold text-navy mb-4">Recebemos seus dados!</h3>
                <p className="text-navy/60 mb-6">Nossa equipe entrará em contato em breve.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", city: "", propertyValue: "", details: "" }); }}
                  className="text-gold-dark font-semibold hover:underline text-sm uppercase tracking-wider"
                >
                  Enviar outro contato
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative bg-card border border-border rounded-3xl p-8 md:p-10 shadow-2xl shadow-navy/10">
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy/60 mb-2">Nome *</label>
                      <input type="text" value={form.name} onChange={handleChange("name")} maxLength={100} placeholder="Seu nome" className="w-full bg-muted/50 border-2 border-border rounded-xl px-4 py-3 text-navy placeholder:text-navy/30 focus:outline-none focus:border-gold-dark focus:bg-background transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy/60 mb-2">Telefone *</label>
                      <input type="tel" value={form.phone} onChange={handleChange("phone")} placeholder="(00) 00000-0000" className="w-full bg-muted/50 border-2 border-border rounded-xl px-4 py-3 text-navy placeholder:text-navy/30 focus:outline-none focus:border-gold-dark focus:bg-background transition-all" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy/60 mb-2">E-mail *</label>
                      <input type="email" value={form.email} onChange={handleChange("email")} maxLength={255} placeholder="seu@email.com" className="w-full bg-muted/50 border-2 border-border rounded-xl px-4 py-3 text-navy placeholder:text-navy/30 focus:outline-none focus:border-gold-dark focus:bg-background transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy/60 mb-2">Cidade / UF</label>
                      <input type="text" value={form.city} onChange={handleChange("city")} maxLength={100} placeholder="São Paulo - SP" className="w-full bg-muted/50 border-2 border-border rounded-xl px-4 py-3 text-navy placeholder:text-navy/30 focus:outline-none focus:border-gold-dark focus:bg-background transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/60 mb-2">Valor do Imóvel</label>
                    <input type="text" value={form.propertyValue} onChange={handleChange("propertyValue")} maxLength={30} placeholder="Ex: R$ 500.000" className="w-full bg-muted/50 border-2 border-border rounded-xl px-4 py-3 text-navy placeholder:text-navy/30 focus:outline-none focus:border-gold-dark focus:bg-background transition-all" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/60 mb-2">Detalhes do Imóvel</label>
                    <textarea value={form.details} onChange={handleChange("details")} maxLength={500} rows={3} placeholder="Construtora, empreendimento, ano da compra, parcelas..." className="w-full bg-muted/50 border-2 border-border rounded-xl px-4 py-3 text-navy placeholder:text-navy/30 focus:outline-none focus:border-gold-dark focus:bg-background transition-all resize-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid}
                    className="w-full bg-navy text-primary-foreground py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-gold hover:text-navy transition-all hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
                  >
                    <Send className="w-5 h-5" />
                    Solicitar Análise Gratuita
                  </button>

                  <p className="text-xs text-navy/40 text-center">
                    Seus dados são confidenciais e usados apenas para análise do seu caso.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- CTA ---------- */
const CTASection = () => (
  <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
    {/* Blueprint background image with overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none animate-fade-in-soft"
      style={{ backgroundImage: `url(${ctaBg})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/85 to-navy/95 pointer-events-none" />

    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

    <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
      <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-8 leading-[1.05] max-w-4xl mx-auto">
        Não deixe seu dinheiro nas mãos da{" "}
        <span className="inline-block bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent animate-gradient-shift italic">
          construtora.
        </span>
      </h2>
      <p className="text-primary-foreground/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
        Cada dia que passa é um dia a menos do seu prazo de 5 anos. Fale conosco agora e descubra quanto você pode recuperar.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Quero saber se tenho direito à restituição.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gold text-navy px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-2xl hover:shadow-gold/40 inline-flex items-center justify-center gap-3"
        >
          <MessageCircle className="w-5 h-5" />
          Falar pelo WhatsApp
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href={`tel:+${WHATSAPP}`}
          className="bg-transparent border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-primary-foreground/10 hover:border-primary-foreground transition-all inline-flex items-center justify-center gap-3"
        >
          <Phone className="w-5 h-5" />
          Ligar Agora
        </a>
      </div>
    </div>
  </section>
);

/* ---------- FOOTER ---------- */
const Footer = () => (
  <footer className="bg-background border-t border-border py-12 px-6 md:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <a href="#" className="flex items-center" aria-label="Recupere Seu Dinheiro">
          <img src={logo} alt="Recupere Seu Dinheiro" className="h-10 w-auto" />
        </a>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-navy/60">
          <a href="#como-funciona" className="hover:text-gold-dark transition-colors">Como Funciona</a>
          <a href="#calculadora" className="hover:text-gold-dark transition-colors">Calculadora</a>
          <a href="#contato" className="hover:text-gold-dark transition-colors">Contato</a>
        </div>
      </div>
      <div className="border-t border-border pt-8 text-center">
        <p className="text-sm text-navy/70 mb-3">
          Recupere Seu Dinheiro é um produto da agência <strong className="text-navy">Universo S.A.</strong>
        </p>
        <p className="text-xs text-navy/40 max-w-2xl mx-auto">
          © {new Date().getFullYear()} Todos os direitos reservados. Este site não constitui aconselhamento jurídico.
          Consulte um advogado para análise do seu caso específico.
        </p>
      </div>
    </div>
  </footer>
);

/* ---------- WHATSAPP FLOATING BUTTON ---------- */
const WhatsAppFAB = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 600;
      // Hide when contato section is in view (avoids covering form fields)
      const contato = document.getElementById("contato");
      let inContato = false;
      if (contato) {
        const rect = contato.getBoundingClientRect();
        inContato = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      }
      setVisible(scrolled && !inContato);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Quero saber mais sobre a recuperação de juros.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gold text-navy shadow-2xl shadow-gold/40 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:bg-gold-dark hover:text-primary-foreground ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}
    >
      <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-30" />
      <MessageCircle className="relative w-6 h-6 md:w-7 md:h-7" />
    </a>
  );
};

const Index = () => (
  <div className="bg-background min-h-screen overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <MarqueeSection />
    <StatsSection />
    <ProblemSection />
    <ZeroCostSection />
    <HowItWorksSection />
    <CalculatorSection />
    <FAQSection />
    <ContactFormSection />
    <CTASection />
    <Footer />
    <WhatsAppFAB />
  </div>
);

export default Index;
