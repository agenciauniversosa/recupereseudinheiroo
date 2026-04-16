import { Shield, DollarSign, Scale, Clock, CheckCircle, ChevronDown, Phone, MessageCircle, ArrowRight, Building2, Users, FileCheck, Gavel, Calculator, Mail, User, MapPin, Send } from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.jpg";
import shieldIcon from "@/assets/shield-icon.png";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="Edifícios em construção" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-navy opacity-85" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-transparent to-transparent" />
    </div>
    <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
          <Shield className="w-4 h-4 text-gold" />
          <span className="text-gold text-sm font-semibold tracking-wide uppercase">Seu Direito Garantido por Lei</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black leading-tight mb-6">
          <span className="text-primary-foreground">Comprou imóvel na planta nos últimos </span>
          <span className="text-gradient-gold">5 anos?</span>
        </h1>
        <p className="text-xl md:text-2xl text-gold-light font-semibold mb-4">
          Você pode ter perdido dinheiro — e pode recuperá-lo!
        </p>
        <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10">
          Milhares de brasileiros pagaram juros indevidos em seus contratos de imóveis na planta. 
          A lei está do seu lado e nós podemos ajudar você a reaver esse dinheiro.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="https://wa.me/5500000000000?text=Olá! Quero saber se tenho direito à restituição do meu imóvel na planta."
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-gold text-accent-foreground font-bold text-lg px-8 py-4 rounded-full shadow-gold hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <MessageCircle className="w-5 h-5" />
            Quero Recuperar Meu Dinheiro
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-primary-foreground/80 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-gold" />
            <span>Sem custo até ganhar</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-gold" />
            <span>100% dentro da Lei</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-gold" />
            <span>Para todo o Brasil</span>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-8 h-8 text-gold/60" />
    </div>
  </section>
);

const StatsSection = () => (
  <section className="py-16 bg-card border-y border-border">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { value: "2M+", label: "Imóveis vendidos na planta desde 2021", icon: Building2 },
          { value: "300mil+", label: "Potenciais lesados em todo o Brasil", icon: Users },
          { value: "R$80mil", label: "Valor recuperado em caso real", icon: DollarSign },
          { value: "5 anos", label: "Prazo para solicitar seus direitos", icon: Clock },
        ].map((stat) => (
          <div key={stat.label} className="group">
            <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
            <div className="text-3xl md:text-4xl font-display font-black text-navy">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-gold font-semibold text-sm uppercase tracking-widest">Entenda o Problema</span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-navy mt-3 mb-6">
          Construtoras cobram juros <span className="text-gradient-gold">ilegais</span> em imóveis na planta
        </h2>
        <p className="text-lg text-muted-foreground">
          A Lei nº 10.931/2004 proíbe a cobrança de correção monetária mensal em contratos quitados em prazo 
          inferior a 36 meses. Mesmo assim, milhares de construtoras continuam aplicando esses juros indevidamente.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: FileCheck,
            title: "Cobrança Indevida",
            desc: "Construtoras aplicam correção monetária mensal em contratos de imóveis na planta, mesmo quando a lei proíbe essa prática.",
          },
          {
            icon: Scale,
            title: "Seus Direitos",
            desc: "A legislação brasileira garante que você pode ser ressarcido dos valores pagos a mais — muitas vezes em dobro.",
          },
          {
            icon: DollarSign,
            title: "Restituição",
            desc: "Valores que podem chegar a R$ 80.000 ou mais, dependendo do contrato e das parcelas pagas indevidamente.",
          },
        ].map((item) => (
          <div key={item.title} className="bg-card rounded-2xl p-8 shadow-navy border border-border hover:border-gold/30 transition-colors group">
            <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-5">
              <item.icon className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-display font-bold text-navy mb-3">{item.title}</h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ZeroCostSection = () => (
  <section className="py-20 md:py-28 bg-gradient-navy text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, hsl(45 90% 55% / 0.3), transparent 50%), radial-gradient(circle at 80% 20%, hsl(45 90% 55% / 0.2), transparent 50%)' }} />
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <img src={shieldIcon} alt="Escudo de proteção" className="w-24 h-24 mx-auto mb-8" loading="lazy" width={512} height={512} />
        <h2 className="text-3xl md:text-5xl font-display font-black mb-6">
          Você <span className="text-gradient-gold">não paga nada</span> até ganhar a ação
        </h2>
        <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10">
          Nosso modelo é 100% baseado no êxito. Você só paga honorários quando receber a restituição. 
          Sem risco, sem surpresas, sem adiantamentos.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Shield, title: "Risco Zero", desc: "Você não gasta nenhum centavo do seu bolso para iniciar o processo" },
            { icon: Gavel, title: "Base Legal Sólida", desc: "Tese jurídica fundamentada na Lei nº 10.931/2004" },
            { icon: CheckCircle, title: "Casos Reais", desc: "Clientes já recuperaram valores significativos em todo o Brasil" },
          ].map((item) => (
            <div key={item.title} className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6">
              <item.icon className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-primary-foreground/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-gold font-semibold text-sm uppercase tracking-widest">Simples e Rápido</span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-navy mt-3">
          Como funciona?
        </h2>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8">
        {[
          { step: "01", title: "Entre em Contato", desc: "Fale conosco pelo WhatsApp e envie os dados do seu contrato." },
          { step: "02", title: "Análise Gratuita", desc: "Nossa equipe analisa seu contrato e verifica se há cobrança indevida." },
          { step: "03", title: "Ação Judicial", desc: "Entramos com o processo para recuperar seus valores pagos a mais." },
          { step: "04", title: "Receba de Volta", desc: "Você recebe a restituição e só então paga nossos honorários." },
        ].map((item) => (
          <div key={item.step} className="text-center relative">
            <div className="text-5xl font-display font-black text-gradient-gold mb-4">{item.step}</div>
            <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
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
    // Estimativa simplificada: juros indevidos ~0.8-1.2% ao mês sobre valor pago
    const totalPaid = rawMonthly * rawInstallments;
    const averageRate = 0.01; // ~1% ao mês de juros indevidos estimados
    const estimatedOvercharge = totalPaid * averageRate * rawInstallments * 0.5;
    const minValue = Math.round(estimatedOvercharge * 0.6);
    const maxValue = Math.round(estimatedOvercharge * 1.4);
    return { min: Math.max(minValue, 500), max: Math.max(maxValue, 2000) };
  }, [rawPropertyValue, rawInstallments, rawMonthly]);

  const canCalculate = rawPropertyValue >= 10000 && rawInstallments >= 6 && rawMonthly >= 100;

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">Simulação Gratuita</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-navy mt-3 mb-4">
            Quanto você pode <span className="text-gradient-gold">recuperar?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preencha os dados abaixo para ter uma estimativa do valor que pode ser restituído.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-card rounded-3xl border border-border shadow-navy p-8 md:p-10">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Valor do Imóvel</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={propertyValue ? formatCurrency(propertyValue) : ""}
                  onChange={handleCurrencyInput(setPropertyValue)}
                  placeholder="R$ 0,00"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Valor da Parcela Mensal</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={monthlyInstallment ? formatCurrency(monthlyInstallment) : ""}
                  onChange={handleCurrencyInput(setMonthlyInstallment)}
                  placeholder="R$ 0,00"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Parcelas Já Pagas</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={installmentsPaid}
                  onChange={handleInstallments}
                  placeholder="Ex: 24"
                  maxLength={3}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                />
              </div>
            </div>

            <button
              onClick={() => setCalculated(true)}
              disabled={!canCalculate}
              className="w-full bg-gradient-gold text-accent-foreground font-bold text-lg py-4 rounded-xl shadow-gold hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Calculator className="w-5 h-5" />
              Calcular Estimativa
            </button>
          </div>

          {calculated && estimate && (
            <div className="mt-8 p-6 bg-gradient-navy rounded-2xl text-center">
              <p className="text-primary-foreground/70 text-sm mb-2">Valor estimado de recuperação:</p>
              <p className="text-3xl md:text-4xl font-display font-black text-gradient-gold mb-2">
                {estimate.min.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} a {estimate.max.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
              <p className="text-primary-foreground/50 text-xs mt-3 mb-6">
                *Estimativa simplificada. O valor exato depende da análise completa do contrato.
              </p>
              <a
                href="https://wa.me/5500000000000?text=Olá! Fiz a simulação no site e quero uma análise detalhada do meu caso."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-gold text-accent-foreground font-bold px-6 py-3 rounded-full shadow-gold hover:scale-105 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Quero Análise Gratuita
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Quem tem direito à restituição?", a: "Qualquer pessoa que comprou um imóvel na planta nos últimos 5 anos e pagou parcelas com correção monetária mensal em contratos quitados em prazo inferior a 36 meses." },
    { q: "Preciso pagar algo para iniciar o processo?", a: "Não! Você não paga absolutamente nada até ganhar a ação. Nosso modelo é 100% baseado no êxito — só cobramos honorários quando você receber a restituição." },
    { q: "Qual o valor médio que posso recuperar?", a: "Depende do contrato, mas casos reais já resultaram em restituições de R$ 50.000 a R$ 80.000 ou mais. Nossa equipe faz uma análise gratuita para estimar seu caso." },
    { q: "Isso é legal? É seguro?", a: "Totalmente! A tese é baseada na Lei nº 10.931/2004 e já foi aplicada com sucesso em diversos tribunais brasileiros. Seu direito está 100% amparado pela legislação." },
    { q: "Funciona para qualquer cidade do Brasil?", a: "Sim! Atendemos clientes em todo o território nacional. Todo o processo pode ser feito de forma remota." },
    { q: "Quanto tempo demora o processo?", a: "O prazo varia, mas muitos casos são resolvidos em meses. Nossa equipe utiliza tecnologia para acelerar cada etapa do processo." },
  ];

  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">Tire Suas Dúvidas</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-navy mt-3">Perguntas Frequentes</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-semibold text-navy hover:text-gold transition-colors"
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 text-gold transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-muted-foreground">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20 md:py-28 bg-gradient-navy text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, hsl(45 90% 55% / 0.4), transparent 60%)' }} />
    <div className="container mx-auto px-4 relative z-10 text-center">
      <h2 className="text-3xl md:text-5xl font-display font-black mb-6">
        Não deixe seu dinheiro nas mãos da construtora
      </h2>
      <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10">
        Cada dia que passa é um dia a menos do seu prazo de 5 anos. Fale conosco agora e descubra quanto você pode recuperar.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://wa.me/5500000000000?text=Olá! Quero saber se tenho direito à restituição do meu imóvel na planta."
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gradient-gold text-accent-foreground font-bold text-lg px-8 py-4 rounded-full shadow-gold hover:scale-105 transition-all duration-300 flex items-center gap-3 justify-center"
        >
          <MessageCircle className="w-5 h-5" />
          Falar pelo WhatsApp
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="tel:+5500000000000"
          className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 font-bold text-lg px-8 py-4 rounded-full hover:bg-primary-foreground/20 transition-all duration-300 flex items-center gap-3 justify-center"
        >
          <Phone className="w-5 h-5" />
          Ligar Agora
        </a>
      </div>
    </div>
  </section>
);

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
    window.open(`https://wa.me/5500000000000?text=${message}`, "_blank");

    setSubmitted(true);
    toast({ title: "Dados enviados!", description: "Você será redirecionado ao WhatsApp para finalizar o contato." });
  };

  if (submitted) {
    return (
      <section className="py-20 md:py-28 bg-muted" id="contato">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-card rounded-3xl border border-border shadow-navy p-10">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
            <h2 className="text-3xl font-display font-black text-navy mb-4">Recebemos seus dados!</h2>
            <p className="text-muted-foreground mb-6">Nossa equipe entrará em contato em breve para fazer a análise gratuita do seu caso.</p>
            <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", city: "", propertyValue: "", details: "" }); }} className="text-gold font-semibold hover:underline">
              Enviar outro contato
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-muted" id="contato">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">Análise Gratuita</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-navy mt-3 mb-4">
            Solicite sua <span className="text-gradient-gold">avaliação</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preencha o formulário e nossa equipe fará uma análise completa e gratuita do seu caso.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card rounded-3xl border border-border shadow-navy p-8 md:p-10">
          <div className="grid gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Nome Completo *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Seu nome"
                    maxLength={100}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Telefone *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="(00) 00000-0000"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">E-mail *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="seu@email.com"
                    maxLength={255}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Cidade / Estado</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={form.city}
                    onChange={handleChange("city")}
                    placeholder="Ex: São Paulo - SP"
                    maxLength={100}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Valor Aproximado do Imóvel</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={form.propertyValue}
                  onChange={handleChange("propertyValue")}
                  placeholder="Ex: R$ 500.000"
                  maxLength={30}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Detalhes do Imóvel</label>
              <textarea
                value={form.details}
                onChange={handleChange("details")}
                placeholder="Construtora, nome do empreendimento, ano da compra, quantidade de parcelas..."
                maxLength={500}
                rows={3}
                className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="w-full bg-gradient-gold text-accent-foreground font-bold text-lg py-4 rounded-xl shadow-gold hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              Solicitar Análise Gratuita
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Seus dados estão seguros e serão utilizados apenas para análise do seu caso.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-navy-dark text-primary-foreground/50 py-10">
    <div className="container mx-auto px-4 text-center">
      <p className="text-sm mb-2">
        Recupere Seu Dinheiro é um produto da agência Universo S.A.
      </p>
      <p className="text-xs text-primary-foreground/30 mt-4">
        © {new Date().getFullYear()} Todos os direitos reservados. Este site não constitui aconselhamento jurídico. 
        Consulte um advogado para análise do seu caso específico.
      </p>
    </div>
  </footer>
);

const Index = () => (
  <>
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
  </>
);

export default Index;
