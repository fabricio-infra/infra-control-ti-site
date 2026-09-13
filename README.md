# Infra Control TI

Site institucional completo em **HTML, CSS e JavaScript puro**, preparado para publicação no **Cloudflare Pages com um repositório GitHub**. Não precisa de framework, npm, instalação de dependências ou backend.

## Comece por aqui

1. Extraia o ZIP em uma pasta.
2. Configure o número real da empresa em `js/script.js`, na constante `WHATSAPP_NUMBER`.
3. Abra `index.html` no navegador para conhecer o site.
4. Envie **os arquivos extraídos**, mantendo a estrutura de pastas, para o GitHub.
5. Conecte o repositório ao Cloudflare Pages seguindo as instruções abaixo.

**O WhatsApp ainda precisa do seu número.** Como ele não foi informado, a constante foi deixada vazia. Nesse estado, o botão flutuante leva ao contato; a ação de WhatsApp do contato e o formulário oferecem o Instagram como alternativa. Nenhuma mensagem é enviada para um número inventado. Basta configurar a constante para ativar todos os links de WhatsApp e o envio do formulário.

## Estrutura

```text
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── logo.png
│   ├── logo.svg
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── imagens/
│       ├── infraestrutura.webp
│       └── infraestrutura-mobile.webp
├── robots.txt
├── sitemap.xml
└── README.md
```

## Alterar o WhatsApp

Abra `js/script.js`. A configuração fica no começo do arquivo:

```js
const WHATSAPP_NUMBER = "";
```

Dentro das aspas, coloque **55 + DDD + número real da empresa**, somente com dígitos. Para Maringá, use o DDD **44**. Não inclua o zero de ligação interurbana, espaços, parênteses ou traços.

Mantenha o número como texto entre aspas. A constante é a única configuração necessária: ela alimenta o botão flutuante, o link da seção Contato e o formulário.

Para alterar a mensagem dos links diretos, edite `WHATSAPP_INITIAL_MESSAGE` logo abaixo. O texto do formulário é montado em `buildContactMessage()`, com nome, empresa, telefone, e-mail, assunto e mensagem.

O formulário valida os campos e abre o WhatsApp na mesma aba. O visitante revisa a mensagem e confirma o envio no próprio WhatsApp. A página não exibe uma confirmação falsa de envio e não usa banco de dados, cookies ou armazenamento local para guardar o formulário. Sem JavaScript, os campos ficam desativados e aparece um link alternativo para o Instagram.

## Editar textos e links

Os textos visíveis estão em `index.html`, separados por seções:

| Conteúdo | Identificador para localizar |
| --- | --- |
| Destaque inicial | `id="inicio"` |
| Quem somos | `id="quem-somos"` |
| Serviços | `id="servicos"` |
| Problemas que resolvemos | `class="problems-section"` |
| Diferenciais | `id="diferenciais"` |
| Como trabalhamos | `id="como-trabalhamos"` |
| Chamada comercial | `class="cta-section"` |
| Contato e formulário | `id="contato"` |
| Rodapé | `class="site-footer"` |

Edite o texto entre as tags e preserve os identificadores usados pela navegação. Os oito serviços aparecem em HTML, inclusive quando o JavaScript está desativado.

Os links dos cards preenchem o assunto do formulário. Se renomear um serviço, mantenha o mesmo texto no atributo `data-service` do link e na opção correspondente do campo `select#subject`.

Para alterar o Instagram, atualize os links em `index.html`, o campo `sameAs` dos dados estruturados e a constante `INSTAGRAM_URL` em `js/script.js`.

O ano do rodapé está definido como **2026**, conforme solicitado, e pode ser alterado diretamente em `index.html`.

## Logo, ícones e fotografia

Foi incluída uma identidade tipográfica própria para esta versão do site, com o símbolo azul e o nome da empresa. Para usar seu logo oficial, substitua **`assets/logo.png`**. O cabeçalho e o rodapé usarão o novo arquivo automaticamente.

- O PNG atual tem fundo transparente e mede **476 × 112 px**. Uma proporção semelhante funciona bem no cabeçalho escuro.
- O arquivo `assets/logo.svg` contém a versão vetorial editável do desenho incluído. O site utiliza o PNG; editar apenas o SVG não altera o logo exibido.
- Se usar uma imagem com outra proporção, atualize os atributos `width` e `height` dos dois logos no HTML para reservar o espaço correto durante o carregamento.
- Para ajustar o tamanho visual, procure `.brand` e `.footer-brand` no CSS.
- O favicon está em `assets/favicon.svg`; o ícone de atalhos móveis está em `assets/apple-touch-icon.png`.

A fotografia de servidores é **ilustrativa, gerada para este projeto**, e não representa uma instalação real da empresa. Os dois arquivos WebP já estão otimizados: uma versão de 1440 × 960 px e outra de 768 × 512 px para telas pequenas.

Para substituir a fotografia, mantenha os nomes dos arquivos ou atualize o `picture` da primeira seção. Ajuste também o texto alternativo. A imagem principal carrega com prioridade, pois aparece na primeira tela; o logo do rodapé utiliza `loading="lazy"`.

## Alterar cores e estilos

As cores principais estão nas variáveis de `:root`, no início de `css/style.css`:

```css
--navy: #06111f;
--navy-secondary: #0f2438;
--blue: #169cff;
--cyan: #35d2ff;
--white: #f7fbff;
--muted: #a9b9c9;
```

O site usa fontes do sistema, ícones SVG locais e imagens locais. Não depende de Google Fonts, CDNs, bibliotecas de animação ou serviços externos para renderizar a página.

As animações de entrada usam `IntersectionObserver`; navegação, efeitos de hover e transições usam CSS. A preferência de acessibilidade **reduzir movimento** é respeitada. Sem suporte a animações, o conteúdo continua visível.

## Testar no computador

### Opção simples

Abra `index.html` com Chrome, Edge, Firefox ou Safari. Todos os caminhos são relativos e o projeto funciona sem servidor de desenvolvimento.

### Opção com servidor local

Com Python instalado, abra um terminal dentro da pasta do projeto.

Windows:

```powershell
py -m http.server 8000 --bind 127.0.0.1
```

Linux/macOS:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Acesse [o site local](http://127.0.0.1:8000). Para encerrar, pressione `Ctrl+C` no terminal.

Após editar textos ou a identidade visual, confira o resultado no modo responsivo do navegador, por exemplo em 320, 375, 768, 1024 e 1440 px. Verifique os links do menu, o fechamento com `Esc`, a navegação com `Tab` e o formulário. Com seu WhatsApp configurado, faça um teste e confira o destinatário e a mensagem antes de enviá-la.

## Publicar no GitHub e Cloudflare Pages

### 1. Enviar os arquivos ao GitHub

1. Crie um repositório chamado `infra-control-ti` na sua conta GitHub.
2. No repositório, use **Add file → Upload files**.
3. Envie `index.html`, `README.md`, `robots.txt`, `sitemap.xml` e as pastas `css`, `js` e `assets`, preservando seus arquivos internos.
4. Confirme o commit na branch `main`.

O **`index.html` deve ficar na raiz do repositório**, ao lado das pastas `css`, `js` e `assets`. Não envie somente o ZIP e não crie uma pasta extra envolvendo o site.

### 2. Conectar ao Pages

No painel Cloudflare, acesse **Workers & Pages → Create application → Pages → Import an existing Git repository**. Conecte o GitHub, selecione o repositório e configure a publicação conforme a [documentação oficial para HTML estático](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

| Configuração | Valor para este projeto |
| --- | --- |
| Nome do projeto | `infra-control-ti` ou outro nome disponível |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `exit 0` |
| Build output directory | `/` — raiz onde está `index.html` |
| Root directory | Deixe vazio, se o site está na raiz do repositório |
| Variáveis de ambiente | Nenhuma |

O diretório de saída acima corresponde à estrutura entregue, com o HTML na raiz. O comando `exit 0` encerra a etapa sem compilar, porque os arquivos já estão prontos para servir. Não é necessário configurar Workers, Functions ou um comando de deploy separado para este projeto.

Clique em **Save and Deploy**. Ao terminar, o Pages fornece um endereço `*.pages.dev`. Novos commits na branch de produção atualizam a publicação; veja também a [configuração de builds do Pages](https://developers.cloudflare.com/pages/configuration/build-configuration/).

### 3. Usar infracontrolti.com.br

No projeto Pages, abra **Custom domains → Set up a domain** e informe `infracontrolti.com.br`. Faça a associação no painel do Pages antes de configurar o DNS. Para o domínio principal, a zona e os nameservers precisam estar configurados na Cloudflare; siga as instruções exibidas, conforme a [documentação oficial de domínios personalizados](https://developers.cloudflare.com/pages/configuration/custom-domains/).

Caso esse domínio já aponte para outro site, a associação é a etapa que muda o destino do site principal. Faça-a quando a nova versão estiver pronta para substituir a atual.

### Atualizar depois

Edite os arquivos e envie um novo commit ao GitHub. O Pages publica a atualização automaticamente. Se uma imagem substituída ainda aparecer antiga, atualize a página sem usar o cache (`Ctrl+F5` no Windows).

## SEO e acessibilidade

- Título, descrição, canonical, metadados Open Graph e Twitter configurados no `<head>`.
- Dados estruturados `Organization` com o nome, a localização e o Instagram fornecidos.
- `robots.txt` e `sitemap.xml` apontando para `https://infracontrolti.com.br/`.
- Uma única tag `h1`, títulos de seção, rótulos de formulário e textos alternativos.
- Menu com `aria-expanded`, indicação de seção ativa, foco visível, atalho para o conteúdo e tratamento de teclado.
- Campos acessíveis, mensagens de retorno anunciadas e animações reduzidas quando solicitado pelo dispositivo.

Se publicar em um domínio definitivo diferente, atualize as URLs em `index.html`, `robots.txt` e `sitemap.xml`. Os metadados sociais de texto estão prontos; uma imagem específica de compartilhamento não foi incluída.

## Sobre a entrega

O pacote contém os arquivos de produção, sem dependências ou etapas de compilação. A conferência automatizada cobre a sintaxe JavaScript, a estrutura do HTML, as referências locais e os principais comportamentos de navegação e contato em simulação de DOM. A validação visual em navegadores reais e o teste de abertura do WhatsApp com o número da empresa devem ser feitos antes da publicação definitiva.
