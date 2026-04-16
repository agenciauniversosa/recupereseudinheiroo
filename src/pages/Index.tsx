import { Shield, DollarSign, Scale, Clock, CheckCircle, ChevronDown, Phone, MessageCircle, ArrowRight, Building2, Users, FileCheck, Gavel } from "lucide-react";
import { useState } from "react";
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
    <FAQSection />
    <CTASection />
    <Footer />
  </>
);

export default Index;
