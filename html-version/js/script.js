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
  const items = ["Lei nº 10.931/2004", "Risco Zero", "Análise Gratuita", "100% Remoto", "Pague só no êxito", "Para todo Brasil", "Casos Reais Vencidos", "Sem Adiantamentos"];
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
    { q: "Preciso pagar algo para iniciar o processo?", a: "Não! Você não paga absolutamente nada até ganhar a ação. Nosso modelo é 100% baseado no êxito — só cobramos honorários quando você receber a restituição." },
    { q: "Qual o valor médio que posso recuperar?", a: "Depende do contrato, mas casos reais já resultaram em restituições de R$ 50.000 a R$ 80.000 ou mais. Nossa equipe faz uma análise gratuita para estimar seu caso." },
    { q: "Isso é legal? É seguro?", a: "Totalmente! A tese é baseada na Lei nº 10.931/2004 e já foi aplicada com sucesso em diversos tribunais brasileiros. Seu direito está 100% amparado pela legislação." },
    { q: "Funciona para qualquer cidade do Brasil?", a: "Sim! Atendemos clientes em todo o território nacional. Todo o processo pode ser feito de forma remota." },
    { q: "Quanto tempo demora o processo?", a: "O prazo varia, mas muitos casos são resolvidos em meses. Nossa equipe utiliza tecnologia para acelerar cada etapa." },
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
  };

  propEl.addEventListener("input", handleCurrency(propEl, "prop"));
  monthEl.addEventListener("input", handleCurrency(monthEl, "month"));
  instEl.addEventListener("input", handleInst);

  btn.addEventListener("click", () => {
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
    const msg = encodeURIComponent("Olá! Fiz a simulação no site e quero uma análise detalhada.");

    btn.style.display = "none";
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
  });
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
