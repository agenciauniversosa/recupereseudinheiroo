<?php
// Configuração principal
$WHATSAPP = "5500000000000";
$ANO_ATUAL = date("Y");

// Processamento do formulário (envio para WhatsApp via PHP server-side opcional)
$formSubmitted = false;
$formError = "";

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["form_type"]) && $_POST["form_type"] === "contato") {
    $name  = trim($_POST["name"]  ?? "");
    $phone = trim($_POST["phone"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $city  = trim($_POST["city"]  ?? "");
    $propertyValue = trim($_POST["propertyValue"] ?? "");
    $details = trim($_POST["details"] ?? "");

    if (strlen($name) >= 2 && strlen(preg_replace('/\D/', '', $phone)) >= 10 && strpos($email, "@") !== false) {
        // Aqui você pode integrar com mail(), salvar em banco, ou apenas redirecionar para WhatsApp.
        // Exemplo: salvar em arquivo de log
        $line = date("Y-m-d H:i:s") . " | $name | $phone | $email | $city | $propertyValue | $details" . PHP_EOL;
        @file_put_contents(__DIR__ . "/leads.log", $line, FILE_APPEND);

        // Monta link do WhatsApp e redireciona
        $msg = "Olá! Preenchi o formulário no site.\n\n"
             . "Nome: $name\nTelefone: $phone\nE-mail: $email\nCidade: $city\n"
             . "Valor do Imóvel: $propertyValue\nDetalhes: $details";
        $waUrl = "https://wa.me/{$WHATSAPP}?text=" . rawurlencode($msg);

        header("Location: $waUrl");
        exit;
    } else {
        $formError = "Por favor, preencha nome, telefone e e-mail válidos.";
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Recupere Seu Dinheiro | Juros Indevidos em Imóvel na Planta</title>
  <meta name="description" content="Comprou imóvel na planta nos últimos 5 anos? Você pode ter pago juros indevidos. Recupere seu dinheiro sem pagar nada até ganhar. Todo o Brasil." />
  <meta name="author" content="Universo S.A." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Recupere Seu Dinheiro | Juros Indevidos em Imóvel na Planta" />
  <meta property="og:description" content="Comprou imóvel na planta nos últimos 5 anos? Você pode ter pago juros indevidos. Recupere seu dinheiro sem pagar nada até ganhar. Todo o Brasil." />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Recupere Seu Dinheiro | Juros Indevidos em Imóvel na Planta" />
  <meta name="twitter:description" content="Comprou imóvel na planta nos últimos 5 anos? Você pode ter pago juros indevidos. Recupere seu dinheiro sem pagar nada até ganhar. Todo o Brasil." />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Lucide icons (sem defer para garantir que window.lucide esteja disponível antes do script.js) -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <!-- ================= NAVBAR ================= -->
  <nav id="navbar" class="navbar">
    <div class="nav-inner">
      <a href="#" class="nav-logo" aria-label="Recupere Seu Dinheiro">
        <img src="assets/logo.png" alt="Recupere Seu Dinheiro" />
      </a>
      <div class="nav-links">
        <a href="#como-funciona">Como Funciona</a>
        <a href="#calculadora">Calculadora</a>
        <a href="#faq">FAQ</a>
        <a href="#contato">Contato</a>
      </div>
      <a href="https://wa.me/<?= htmlspecialchars($WHATSAPP) ?>" target="_blank" rel="noopener" class="nav-cta">
        <i data-lucide="message-circle"></i> WhatsApp
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Menu">
        <i data-lucide="menu"></i>
      </button>
    </div>
    <div class="nav-mobile" id="navMobile">
      <a href="#como-funciona">Como Funciona</a>
      <a href="#calculadora">Calculadora</a>
      <a href="#faq">FAQ</a>
      <a href="#contato">Contato</a>
      <a href="https://wa.me/<?= htmlspecialchars($WHATSAPP) ?>" target="_blank" rel="noopener" class="nav-cta-mobile">
        <i data-lucide="message-circle"></i> Falar no WhatsApp
      </a>
    </div>
  </nav>

  <!-- ================= HERO ================= -->
  <header class="hero" id="hero">
    <div class="hero-bg" style="background-image: url('assets/hero-construction.jpg');"></div>
    <div class="hero-overlay-1"></div>
    <div class="hero-overlay-2"></div>
    <div class="hero-grid"></div>

    <div class="container hero-content">
      <div class="hero-badge fade-up">
        <span class="ping-dot"><span></span><span></span></span>
        <span>Sem custo até ganhar • Risco Zero</span>
      </div>
      <h1 class="hero-title fade-up delay-100">
        Quem compra imóvel <br class="hide-mobile" />na planta<br />
        <span class="text-gradient-gold">nem sempre economiza.</span>
      </h1>
      <p class="hero-desc fade-up delay-200">
        Muitos contratos escondem <strong>juros indevidos</strong> que podem ser revertidos a seu favor.
        Mostramos o caminho para <strong>recuperar parte do que você pagou</strong> — e <strong class="text-gold-dark">você só paga quando ganhar.</strong>
      </p>
      <div class="hero-actions fade-up delay-300">
        <a href="#contato" class="btn-primary">
          <span>Quero Recuperar Meu Dinheiro</span>
          <i data-lucide="arrow-right"></i>
        </a>
      </div>
      <div class="hero-checks fade-up delay-500">
        <div><i data-lucide="check-circle"></i><span>Sem custo até ganhar</span></div>
        <div><i data-lucide="check-circle"></i><span>100% dentro da Lei</span></div>
        <div><i data-lucide="check-circle"></i><span>Para todo o Brasil</span></div>
      </div>
    </div>
    <div class="scroll-ind"><i data-lucide="chevron-down"></i></div>
  </header>

  <!-- ================= MARQUEE ================= -->
  <section class="marquee">
    <div class="marquee-track" id="marqueeTrack"></div>
  </section>

  <!-- ================= STATS ================= -->
  <section class="stats">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-card" data-target="2" data-format="plain" data-suffix="M+">
          <div class="stat-icon"><i data-lucide="building-2"></i></div>
          <div class="stat-value tabular-nums">0</div>
          <div class="stat-label">Imóveis vendidos na planta</div>
        </div>
        <div class="stat-card" data-target="300000" data-format="compact" data-suffix="+">
          <div class="stat-icon"><i data-lucide="users"></i></div>
          <div class="stat-value tabular-nums">0</div>
          <div class="stat-label">Compradores potencialmente afetados</div>
        </div>
        <div class="stat-card" data-target="100" data-format="plain" data-suffix="%">
          <div class="stat-icon"><i data-lucide="map-pin"></i></div>
          <div class="stat-value tabular-nums">0</div>
          <div class="stat-label">Remoto · Atendimento em todo Brasil</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= PROBLEM ================= -->
  <section class="problem reveal">
    <div class="container">
      <div class="section-head">
        <span class="kicker">Entenda o Problema</span>
        <h2>Construtoras cobram juros <span class="highlight">ilegais</span> em imóveis na planta</h2>
        <p>A <strong>Lei nº 10.931/2004</strong> proíbe a cobrança de correção monetária mensal em contratos quitados em prazo inferior a 36 meses. Mesmo assim, milhares de construtoras continuam aplicando esses juros.</p>
      </div>
      <div class="problem-grid">
        <article class="problem-card">
          <span class="problem-num">01</span>
          <div class="problem-icon"><i data-lucide="file-check"></i></div>
          <h3>Cobrança Indevida</h3>
          <p>Correção monetária mensal aplicada onde a lei proíbe — direto no seu bolso.</p>
        </article>
        <article class="problem-card">
          <span class="problem-num">02</span>
          <div class="problem-icon"><i data-lucide="scale"></i></div>
          <h3>Seus Direitos</h3>
          <p>A legislação garante o ressarcimento — muitas vezes em dobro do que foi pago.</p>
        </article>
        <article class="problem-card">
          <span class="problem-num">03</span>
          <div class="problem-icon"><i data-lucide="dollar-sign"></i></div>
          <h3>Restituição Real</h3>
          <p>Valores que podem chegar a R$ 80.000 ou mais, dependendo do contrato.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ================= ZERO COST ================= -->
  <section class="zero-cost reveal">
    <div class="container two-col">
      <div>
        <span class="kicker">Risco Zero</span>
        <h2>Você não paga <span class="highlight italic">nada</span> até ganhar a ação.</h2>
        <p class="lead">Nosso modelo é 100% baseado no êxito. Você só paga honorários quando receber a restituição. Sem risco, sem surpresas, sem adiantamentos.</p>
        <ul class="check-list">
          <li><div class="check-ic"><i data-lucide="check-circle"></i></div><div><strong>Risco Zero Real</strong><span>Você não gasta nenhum centavo do seu bolso para iniciar o processo.</span></div></li>
          <li><div class="check-ic"><i data-lucide="check-circle"></i></div><div><strong>Base Legal Sólida</strong><span>Tese fundamentada na Lei nº 10.931/2004, com casos vencidos no Brasil.</span></div></li>
          <li><div class="check-ic"><i data-lucide="check-circle"></i></div><div><strong>100% Remoto</strong><span>Atendemos clientes em todo o território nacional, sem precisar sair de casa.</span></div></li>
        </ul>
      </div>
      <div class="quote-card-wrap">
        <div class="quote-glow"></div>
        <div class="quote-card">
          <div class="quote-shield float"><i data-lucide="shield"></i></div>
          <p class="quote-kicker">Nosso Compromisso</p>
          <p class="quote-text">"Se não recuperarmos seu dinheiro, você não paga absolutamente nada."</p>
          <div class="quote-foot">
            <div>
              <p class="quote-foot-kicker">Honorários</p>
              <p class="quote-foot-value">Apenas no êxito</p>
            </div>
            <div class="quote-gavel"><i data-lucide="gavel"></i></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= HOW IT WORKS ================= -->
  <section id="como-funciona" class="how reveal">
    <div class="container">
      <div class="section-head">
        <span class="kicker">Como Funciona</span>
        <h2>Simples, rápido e <span class="highlight italic">sem risco.</span></h2>
      </div>
      <div class="how-grid">
        <article class="how-card">
          <div class="how-icon-wrap"><div class="how-icon"><i data-lucide="message-circle"></i></div><span class="how-step">01</span></div>
          <h3>Entre em Contato</h3>
          <p>Fale conosco pelo WhatsApp ou formulário e envie os dados do seu contrato.</p>
        </article>
        <article class="how-card">
          <div class="how-icon-wrap"><div class="how-icon"><i data-lucide="file-check"></i></div><span class="how-step">02</span></div>
          <h3>Análise Gratuita</h3>
          <p>Nossa equipe verifica se há cobrança indevida — sem nenhum custo.</p>
        </article>
        <article class="how-card">
          <div class="how-icon-wrap"><div class="how-icon"><i data-lucide="gavel"></i></div><span class="how-step">03</span></div>
          <h3>Ação Judicial</h3>
          <p>Entramos com o processo para recuperar seus valores pagos a mais.</p>
        </article>
        <article class="how-card">
          <div class="how-icon-wrap"><div class="how-icon"><i data-lucide="dollar-sign"></i></div><span class="how-step">04</span></div>
          <h3>Receba de Volta</h3>
          <p>Você recebe a restituição e só então paga nossos honorários.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ================= CALCULATOR ================= -->
  <section id="calculadora" class="calc reveal">
    <div class="container two-col">
      <div class="calc-intro">
        <span class="kicker">Simulação Gratuita</span>
        <h2>Quanto você pode <span class="highlight italic">recuperar?</span></h2>
        <p class="lead">Faça uma estimativa rápida e gratuita do valor que pode ser restituído. Sem compromisso.</p>
        <ul class="check-list">
          <li><div class="check-ic"><i data-lucide="shield"></i></div><div><strong>100% Confidencial</strong><span>Seus dados não são armazenados sem consentimento.</span></div></li>
          <li><div class="check-ic"><i data-lucide="zap"></i></div><div><strong>Estimativa Rápida</strong><span>Resultado em segundos, baseado em casos reais.</span></div></li>
        </ul>
      </div>
      <div class="calc-card-wrap">
        <div class="quote-glow"></div>
        <div class="calc-card">
          <div class="calc-fields">
            <div>
              <label>Valor do Imóvel</label>
              <input type="text" inputmode="numeric" id="calcPropValue" placeholder="R$ 0,00" />
            </div>
            <div>
              <label>Valor da Parcela Mensal</label>
              <input type="text" inputmode="numeric" id="calcMonthly" placeholder="R$ 0,00" />
            </div>
            <div>
              <label>Parcelas Já Pagas</label>
              <input type="text" inputmode="numeric" id="calcInstallments" maxlength="3" placeholder="Ex: 24" />
            </div>
          </div>
          <div class="calc-result-area" id="calcResultArea">
            <button id="calcBtn" class="btn-dark" disabled>
              <i data-lucide="calculator"></i> Calcular Estimativa
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= FAQ ================= -->
  <section id="faq" class="faq reveal">
    <div class="container faq-grid">
      <div>
        <span class="kicker">FAQ</span>
        <h2>Tire suas <span class="highlight italic">dúvidas.</span></h2>
        <p class="lead">Reunimos as perguntas mais frequentes para ajudar você a entender todo o processo.</p>
      </div>
      <div class="faq-list" id="faqList">
        <!-- itens injetados via JS -->
      </div>
    </div>
  </section>

  <!-- ================= CONTACT FORM ================= -->
  <section id="contato" class="contato reveal">
    <div class="container two-col">
      <div>
        <span class="kicker">Análise Gratuita</span>
        <h2>Solicite sua <span class="highlight italic">avaliação.</span></h2>
        <p class="lead">Preencha o formulário e nossa equipe fará uma análise completa e gratuita do seu caso.</p>
        <div class="check-simple">
          <div><i data-lucide="check-circle"></i><span>Resposta em até 24 horas</span></div>
          <div><i data-lucide="check-circle"></i><span>Análise 100% gratuita e sem compromisso</span></div>
          <div><i data-lucide="check-circle"></i><span>Atendimento em todo o Brasil</span></div>
        </div>
      </div>
      <div class="form-card-wrap">
        <div class="quote-glow"></div>
        <form class="form-card" method="POST" action="" id="contactForm">
          <input type="hidden" name="form_type" value="contato" />
          <?php if ($formError): ?>
            <div class="form-error"><?= htmlspecialchars($formError) ?></div>
          <?php endif; ?>
          <div class="form-row">
            <div><label>Nome *</label><input type="text" name="name" id="fName" maxlength="100" placeholder="Seu nome" required /></div>
            <div><label>Telefone *</label><input type="tel" name="phone" id="fPhone" placeholder="(00) 00000-0000" required /></div>
          </div>
          <div class="form-row">
            <div><label>E-mail *</label><input type="email" name="email" id="fEmail" maxlength="255" placeholder="seu@email.com" required /></div>
            <div><label>Cidade / UF</label><input type="text" name="city" id="fCity" maxlength="100" placeholder="São Paulo - SP" /></div>
          </div>
          <div><label>Valor do Imóvel</label><input type="text" name="propertyValue" id="fProp" maxlength="30" placeholder="Ex: R$ 500.000" /></div>
          <div><label>Detalhes do Imóvel</label><textarea name="details" id="fDetails" maxlength="500" rows="3" placeholder="Construtora, empreendimento, ano da compra, parcelas..."></textarea></div>
          <button type="submit" class="btn-dark" id="submitBtn">
            <i data-lucide="send"></i> Solicitar Análise Gratuita
          </button>
          <p class="form-hint">Seus dados são confidenciais e usados apenas para análise do seu caso.</p>
        </form>
      </div>
    </div>
  </section>

  <!-- ================= CTA ================= -->
  <section class="cta">
    <div class="cta-bg" style="background-image: url('assets/cta-blueprint.jpg');"></div>
    <div class="cta-overlay"></div>
    <div class="cta-grid"></div>
    <div class="container cta-content">
      <h2>Não deixe seu dinheiro nas mãos da <span class="text-gradient-gold italic">construtora.</span></h2>
      <p>Cada dia que passa é um dia a menos do seu prazo de 5 anos. Fale conosco agora e descubra quanto você pode recuperar.</p>
      <div class="cta-actions">
        <a href="https://wa.me/<?= htmlspecialchars($WHATSAPP) ?>?text=<?= rawurlencode('Olá! Quero saber se tenho direito à restituição.') ?>" target="_blank" rel="noopener" class="btn-gold">
          <i data-lucide="message-circle"></i> Falar pelo WhatsApp <i data-lucide="arrow-right"></i>
        </a>
        <a href="tel:+<?= htmlspecialchars($WHATSAPP) ?>" class="btn-outline-light">
          <i data-lucide="phone"></i> Ligar Agora
        </a>
      </div>
    </div>
  </section>

  <!-- ================= FOOTER ================= -->
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <a href="#" class="footer-logo"><img src="assets/logo.png" alt="Recupere Seu Dinheiro" /></a>
        <div class="footer-links">
          <a href="#como-funciona">Como Funciona</a>
          <a href="#calculadora">Calculadora</a>
          <a href="#contato">Contato</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Recupere Seu Dinheiro é um produto da agência <strong>Universo S.A.</strong></p>
        <p class="muted">© <?= $ANO_ATUAL ?> Todos os direitos reservados. Este site não constitui aconselhamento jurídico. Consulte um advogado para análise do seu caso específico.</p>
      </div>
    </div>
  </footer>

  <!-- ================= WHATSAPP FAB ================= -->
  <a href="https://wa.me/<?= htmlspecialchars($WHATSAPP) ?>?text=<?= rawurlencode('Olá! Quero saber mais sobre a recuperação de juros.') ?>" target="_blank" rel="noopener" class="fab" id="waFab" aria-label="Falar no WhatsApp">
    <span class="fab-ping"></span>
    <i data-lucide="message-circle"></i>
  </a>

  <script>
    window.WHATSAPP = "<?= htmlspecialchars($WHATSAPP) ?>";
  </script>
  <script src="js/script.js" defer></script>
</body>
</html>
