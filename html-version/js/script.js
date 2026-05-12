/* =========================================================
   Recupere Seu Dinheiro — JS estático
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderIcons();

  initNavbar();
  initMarquee();
  initHeroCount();
  initStatsCount();
  initReveal();
  initFAQ();
  initCalculator();
  initContactForm();
  initFAB();
});

/* ---------- NAVBAR ---------- */
function initNavbar() {
  const nav = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");

  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", () => {
    mobile.classList.toggle("open");
    const icon = mobile.classList.contains("open") ? "x" : "menu";
    toggle.innerHTML = `<i data-lucide="${icon}"></i>`;
    renderIcons();
  });

  mobile.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobile.classList.remove("open");
      toggle.innerHTML = `<i data-lucide="menu"></i>`;
      renderIcons();
    })
  );
}

/* ---------- MARQUEE ---------- */
function initMarquee() {
  const items = ["Lei nº 10.931/2004", "Análise Gratuita", "100% Remoto", "Sem Compromisso", "Para todo Brasil", "Casos Reais Vencidos", "Atendimento Especializado", "Tese Consolidada"];
  const track = document.getElementById("marqueeTrack");
  const all = [...items, ...items, ...items];
  track.innerHTML = all
    .map(
      (t) => `<div class="marquee-item"><i data-lucide="sparkles"></i><span>${t}</span></div>`
    )
    .join("");
  renderIcons();
}

/* ---------- HERO COUNT-UP ---------- */
function initHeroCount() {
  const el = document.getElementById("heroCount");
  const hero = document.getElementById("hero");
  if (!el || !hero) return;

  let raf;
  const run = () => {
    cancelAnimationFrame(raf);
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / 1500, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const v = Math.floor(80000 * eased);
      el.textContent = "R$ " + v.toLocaleString("pt-BR") + "+";
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
  };

  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && run()),
    { threshold: 0.3 }
  );
  obs.observe(hero);
}

/* ---------- STATS COUNT-UP ---------- */
function initStatsCount() {
  document.querySelectorAll(".stat-card").forEach((card) => {
    const target = parseInt(card.dataset.target, 10);
    const format = card.dataset.format || "plain";
    const suffix = card.dataset.suffix || "";
    const valueEl = card.querySelector(".stat-value");

    const formatStat = (value) => {
      if (format === "compact") {
        if (value >= 1_000_000) return (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1) + "M";
        if (value >= 1_000) return Math.floor(value / 1_000) + "mil";
        return String(value);
      }
      if (format === "currency-compact") {
        if (value >= 1_000) return "R$ " + Math.floor(value / 1_000) + "mil";
        return "R$ " + value;
      }
      return String(value);
    };

    let raf;
    const run = () => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / 1500, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const v = Math.floor(target * eased);
        valueEl.textContent = formatStat(v) + suffix;
        if (progress < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    };

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 }
    );
    obs.observe(card);
  });
}

/* ---------- REVEAL ON SCROLL ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  els.forEach((el) => obs.observe(el));
}

/* ---------- FAQ ---------- */
function initFAQ() {
  const faqs = [
    { q: "Quem tem direito à restituição?", a: "Qualquer pessoa que comprou um imóvel na planta nos últimos 5 anos e pagou parcelas com correção monetária mensal em contratos quitados em prazo inferior a 36 meses." },
    { q: "A análise inicial tem algum custo?", a: "Sim. A análise do seu contrato depende de um parecer de um perito contábil que tem um custo simbólico perante os valores que podem ser recuperados. Avaliamos sua documentação e explicamos suas opções antes de qualquer próximo passo." },
    { q: "Qual o valor médio que posso recuperar?", a: "Depende do contrato, mas casos reais já resultaram em restituições de valores substanciais. A equipe faz uma análise para estimar seu caso." },
    { q: "Isso é legal? É seguro?", a: "Totalmente! A tese é baseada na Lei nº 10.931/2004 e já foi aplicada com sucesso em diversos tribunais brasileiros. Seu direito está 100% amparado pela legislação." },
    { q: "Meu imóvel está financiado pelo banco, tenho direito assim mesmo?", a: "Sim! Muitos possuem imóveis financiados através de instituições financeiras, e isso não impede em nada no direito de recuperar seu dinheiro." },
    { q: "Funciona para qualquer cidade do Brasil?", a: "Sim! Atendemos clientes em todo o território nacional. Todo o processo pode ser feito de forma remota." },
    { q: "Quanto tempo demora o processo?", a: "O prazo varia, mas muitos casos são resolvidos em meses. Nossa equipe utiliza tecnologia para acelerar cada etapa." },
    { q: "Preciso ter documentação específica para solicitar a análise?", a: "Sim, é necessário o extrato financeiro do contrato com a construtora e o próprio contrato. A partir do envio desses documentos, nossa equipe faz a análise de viabilidade da ação." },
    { q: "E se o imóvel já foi entregue? Ainda tenho direito?", a: "Sim! O direito à restituição não depende do status de entrega do imóvel. Se você pagou parcelas com correção monetária mensal indevida em um contrato quitado em prazo inferior a 36 meses, você pode ter direito à recuperação." },
    { q: "Qual é o prazo máximo para solicitar a restituição?", a: "O prazo é de 5 anos a contar da data em que você pagou a parcela indevida. Por isso é importante agir rápido, pois cada dia que passa é um dia a menos do seu direito." },
    { q: "Como funciona o pagamento dos honorários da Recupere Seu Dinheiro?", a: "Nosso modelo é baseado em sucesso. Você só paga se ganhar o processo. Os honorários são cobrados apenas quando há recuperação efetiva dos valores." },
    { q: "Posso ter mais de um imóvel na planta? Posso recuperar valores de todos?", a: "Sim! Se você comprou múltiplos imóveis na planta e pagou juros indevidos em mais de um contrato, cada caso pode ser analisado e recuperado independentemente. Basta informar todos os imóveis na sua solicitação." },
    { q: "O que acontece se a construtora não tiver mais recursos para pagar?", a: "A ação é movida contra a construtora, e se houver sentença favorável, existem mecanismos legais para execução da dívida. Nossa equipe está familiarizada com esses procedimentos e ajuda em todas as etapas." },
    { q: "Existe alguma restrição de valor mínimo ou máximo para solicitar a análise?", a: "Não! Analisamos casos de qualquer valor. Se você pagou juros indevidos, independentemente do montante, você pode ter direito à restituição. Desde pequenas quantias até recuperações de milhares de centenas de reais." },
    { q: "Posso fazer a solicitação de análise por telefone ou apenas pelo formulário?", a: "Você pode entrar em contato pelo formulário do site ou via WhatsApp. Escolha o canal que for mais conveniente para você. Todos levam ao mesmo atendimento especializado." },
    { q: "Se eu já tentei resolver isso com a construtora, ainda posso contar com vocês?", a: "Sim! Muitos clientes já tentaram negociar diretamente com a construtora sem sucesso. Nossa equipe tem experiência em casos que já passaram por tentativas de resolução prévia e consegue reverter a situação a seu favor através de ação judicial." },
    { q: "Sobre o Laudo pericial contábil, qual o custo dele?", a: "O valor cobrado pelos especialistas parceiros é de em média R$ 1.000,00 (mil reais) que podem ser pagos com cartão de crédito em até 5 parcelas sem juros." },
    { q: "Vocês garantem o resultado?", a: "Apesar de praticamente 100% das ações terem resultado positivo para o cliente, ainda dependemos de uma decisão judicial." },
  ];

  const list = document.getElementById("faqList");
  list.innerHTML = faqs
    .map(
      (f, i) => `
      <div class="faq-item ${i === 0 ? "open" : ""}" data-i="${i}">
        <button class="faq-q" type="button">
          <span>${f.q}</span>
          <span class="faq-q-icon"><i data-lucide="chevron-down"></i></span>
        </button>
        <div class="faq-a"><div class="faq-a-inner"><div class="faq-a-text">${f.a}</div></div></div>
      </div>`
    )
    .join("");
  renderIcons();

  list.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-q").addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      list.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
}

/* ---------- CALCULATOR ---------- */
function initCalculator() {
  const propEl = document.getElementById("calcPropValue");
  const monthEl = document.getElementById("calcMonthly");
  const instEl = document.getElementById("calcInstallments");
  const btn = document.getElementById("calcBtn");
  const resultArea = document.getElementById("calcResultArea");
  const leadForm = document.getElementById("calcLeadForm");
  const leadName = document.getElementById("leadName");
  const leadEmail = document.getElementById("leadEmail");
  const leadPhone = document.getElementById("leadPhone");
  const leadSubmit = document.getElementById("leadSubmit");
  const leadBack = document.getElementById("leadBack");

  const state = { prop: "", month: "", inst: "" };

  const formatCurrency = (raw) => {
    const amount = parseInt(raw || "0", 10) / 100;
    return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handleCurrency = (el, key) => (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 12);
    state[key] = raw;
    el.value = raw ? formatCurrency(raw) : "";
    update();
  };

  const handleInst = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (parseInt(raw || "0", 10) <= 360) {
      state.inst = raw;
      instEl.value = raw;
    } else {
      instEl.value = state.inst;
    }
    update();
  };

  const update = () => {
    const prop = parseInt(state.prop || "0", 10) / 100;
    const month = parseInt(state.month || "0", 10) / 100;
    const inst = parseInt(state.inst || "0", 10);
    const can = prop >= 10000 && inst >= 6 && month >= 100;
    btn.disabled = !can;
    // remove previous result if user changes inputs
    const r = document.getElementById("calcResultBox");
    if (r) r.remove();
    btn.style.display = "flex";
    if (leadForm) leadForm.style.display = "none";
  };

  propEl.addEventListener("input", handleCurrency(propEl, "prop"));
  monthEl.addEventListener("input", handleCurrency(monthEl, "month"));
  instEl.addEventListener("input", handleInst);

  const formatPhoneLead = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const validateLead = () => {
    const name = leadName.value.trim();
    const email = leadEmail.value.trim();
    const phone = leadPhone.value;
    const ok =
      name.length >= 2 &&
      email.includes("@") &&
      email.includes(".") &&
      phone.replace(/\D/g, "").length >= 10;
    leadSubmit.disabled = !ok;
    return ok;
  };

  if (leadPhone) {
    leadPhone.addEventListener("input", (e) => {
      e.target.value = formatPhoneLead(e.target.value);
      validateLead();
    });
    leadName.addEventListener("input", validateLead);
    leadEmail.addEventListener("input", validateLead);
  }

  if (leadBack) {
    leadBack.addEventListener("click", () => {
      leadForm.style.display = "none";
      btn.style.display = "flex";
    });
  }

  const showResult = () => {
    const prop = parseInt(state.prop || "0", 10) / 100;
    const month = parseInt(state.month || "0", 10) / 100;
    const inst = parseInt(state.inst || "0", 10);
    if (!(prop >= 10000 && inst >= 6 && month >= 100)) return;

    const totalPaid = month * inst;
    const avgRate = 0.01;
    const overcharge = totalPaid * avgRate * inst * 0.5;
    const min = Math.max(Math.round(overcharge * 0.6), 500);
    const max = Math.max(Math.round(overcharge * 1.4), 2000);

    const fmt = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
    const name = leadName ? leadName.value.trim() : "";
    const email = leadEmail ? leadEmail.value.trim() : "";
    const phoneVal = leadPhone ? leadPhone.value : "";
    const msg = encodeURIComponent(
      `Olá! Fiz a simulação no site e quero uma análise detalhada.\n\nNome: ${name}\nE-mail: ${email}\nTelefone: ${phoneVal}`
    );

    btn.style.display = "none";
    if (leadForm) leadForm.style.display = "none";
    const html = `
      <div class="calc-result" id="calcResultBox">
        <div class="calc-result-box">
          <span class="label">Estimativa de Recuperação</span>
          <div class="value tabular-nums">${fmt(min)}<span class="sep">a</span>${fmt(max)}</div>
          <p class="note">*Estimativa simplificada</p>
        </div>
        <a href="https://wa.me/${window.WHATSAPP}?text=${msg}" target="_blank" rel="noopener" class="btn-dark" style="text-decoration:none;">
          <i data-lucide="message-circle"></i> Quero Análise Gratuita
        </a>
      </div>`;
    resultArea.insertAdjacentHTML("beforeend", html);
    renderIcons();
  };

  btn.addEventListener("click", () => {
    if (btn.disabled) return;
    btn.style.display = "none";
    leadForm.style.display = "flex";
    validateLead();
    setTimeout(() => leadName && leadName.focus(), 50);
  });

  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateLead()) return;
      showResult();
    });
  }
}

/* ---------- CONTACT FORM (formatação telefone) ---------- */
function initContactForm() {
  const phone = document.getElementById("fPhone");
  if (!phone) return;
  const formatPhone = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };
  phone.addEventListener("input", (e) => {
    e.target.value = formatPhone(e.target.value);
  });

  // Caso JS esteja disponível, podemos também redirecionar diretamente para WhatsApp
  // (mantendo o fallback PHP para servidores sem JS).
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    const name = document.getElementById("fName").value.trim();
    const ph = phone.value;
    const email = document.getElementById("fEmail").value.trim();
    const valid = name.length >= 2 && ph.replace(/\D/g, "").length >= 10 && email.includes("@") && email.includes(".");
    if (!valid) {
      e.preventDefault();
      alert("Por favor, preencha nome, telefone e e-mail válidos.");
    }
    // se válido, o PHP cuida do redirect para o WhatsApp
  });
}

/* ---------- WHATSAPP FAB ---------- */
function initFAB() {
  const fab = document.getElementById("waFab");
  const onScroll = () => {
    const scrolled = window.scrollY > 600;
    const contato = document.getElementById("contato");
    let inContato = false;
    if (contato) {
      const rect = contato.getBoundingClientRect();
      inContato = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    }
    if (scrolled && !inContato) fab.classList.add("visible");
    else fab.classList.remove("visible");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
