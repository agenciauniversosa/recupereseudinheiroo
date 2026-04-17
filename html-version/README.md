# Recupere Seu Dinheiro — Versão HTML/CSS/JS/PHP

Versão estática do site, pronta para hospedagem em qualquer servidor com suporte a **PHP** (Hostinger, Locaweb, cPanel, KingHost, etc.).

> A versão React continua funcionando normalmente no projeto principal — esta pasta é independente.

## 📁 Estrutura

```
html-version/
├── index.php          # Página principal (PHP processa o formulário)
├── css/
│   └── styles.css     # Todos os estilos (mesmas cores e tokens do React)
├── js/
│   └── script.js      # Animações, count-up, FAQ, calculadora, marquee
├── assets/
│   ├── logo.png
│   ├── hero-construction.jpg
│   └── cta-blueprint.jpg
└── leads.log          # Gerado automaticamente quando alguém envia o formulário
```

## 🚀 Como publicar

1. **Copie a pasta `html-version/` inteira** para o diretório `public_html/` (ou equivalente) da sua hospedagem.
2. Acesse `https://seudominio.com.br/index.php` (ou apenas `https://seudominio.com.br/` se renomear/configurar como índice).
3. Pronto! Tudo funciona — count-up, FAQ, calculadora, formulário, WhatsApp.

> Servidor com PHP 7.4+ é suficiente. Não precisa de banco de dados.

## ⚙️ Configurar o WhatsApp

Edite **`index.php`**, linha 3:

```php
$WHATSAPP = "5500000000000"; // troque pelo seu número (com DDI 55)
```

Exemplo: para o número `(11) 91234-5678` use `"5511912345678"`.

## 📩 Formulário de contato

Quando o usuário envia o formulário:

1. Os dados são gravados em `leads.log` (uma linha por envio).
2. O usuário é redirecionado automaticamente para o seu WhatsApp com a mensagem pré-preenchida.

> Para receber por **e-mail** em vez de log, edite o bloco PHP no topo do `index.php` e adicione uma chamada `mail($para, $assunto, $corpo)`.

## 🎨 Customização

- **Cores:** edite as variáveis HSL no topo do `css/styles.css` (`:root { ... }`).
- **Textos:** todo o conteúdo está direto no `index.php`.
- **FAQ:** edite o array `faqs` no topo de `js/script.js`.
- **Marquee:** edite o array `items` em `initMarquee()` no `js/script.js`.

## 🔄 Diferenças vs. versão React

| Recurso | React | HTML/PHP |
|---|---|---|
| Animações count-up | ✅ | ✅ |
| Reveal on scroll | ✅ | ✅ |
| Marquee | ✅ | ✅ |
| FAQ accordion | ✅ | ✅ |
| Calculadora | ✅ | ✅ |
| Formulário → WhatsApp | client-side | server-side (PHP) + log |
| Toast de sucesso | ✅ | substituído por redirect direto |

Tudo o mais (design, fontes, ícones via [Lucide CDN], breakpoints) é idêntico.
