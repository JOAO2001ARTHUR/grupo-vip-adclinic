# AdClinic — VIP Experience

Landing page em Next.js, React e TypeScript, exportada como HTML estático. Estilos próprios em CSS, sem bibliotecas de animação. Compatível com Vercel e hospedagem estática. A prévia fica privada e não indexável enquanto faltam os convites.

## Executar

```sh
npm ci
npm run dev
npm run build
npm run typecheck
node tests/tracking.cjs
```

O build gera `out/`. Na Vercel, importar este diretório `vip` como raiz do projeto Next.js.

## Ativar uma unidade

Editar `src/lib/config.ts`. Cada unidade tem identificador, nome, cidade, convite, campanha e variante. Rotas: `/`, `/vip/pinhais/`, `/vip/ponta-grossa/`. Novas chaves geram novas rotas no próximo build. A raiz é uma prévia genérica: anúncios locais devem apontar à rota da unidade.

Preencher `invite` com o convite real `https://chat.whatsapp.com/...`. Não usar `wa.me`. Um validador rejeita outros hosts, protocolos e endereços incompletos. Isso verifica a estrutura, não a validade do grupo: confirmar o convite no WhatsApp antes de veicular. Sem convite, todos os CTAs ficam desativados e há um aviso visível. Todos usam o mesmo componente e configuração. A abertura ocorre por link nativo no clique, na mesma aba, sem pop-up ou redirecionamento automático.

Após configurar: testar em Android/iPhone e navegadores internos de Instagram/Facebook. Nenhum teste de entrada real foi realizado porque o convite definitivo não foi fornecido. Para a publicação comercial, configurar domínio e metadados em `src/app/layout.tsx`, remover `robots: noindex` quando apropriado e verificar as informações da unidade.

## Analytics e consentimento

IDs vazios por padrão. Escolher `analytics.mode`: `direct` para GA4/Meta ou `gtm` para GTM. Não duplicar as mesmas tags nas duas opções. Com GTM, configurar os acionadores de eventos personalizados no contêiner; o app apenas carrega o contêiner e envia o dataLayer após consentimento. O contêiner também deve respeitar revogação e não disparar PageView adicional.

Nada é carregado antes do consentimento. Sem IDs configurados, não é exibido um banner inicial desnecessário; as preferências continuam acessíveis no rodapé. Ao recusar, o site recarrega sem carregar os rastreadores. A escolha fica no localStorage; navegação funciona mesmo se armazenamento estiver indisponível.

Eventos: `PageView` (GA4 usa `page_view`), `VIPGroupClick` e, conforme a posição, `VIPHeroClick`, `VIPStickyClick` ou `VIPFinalClick`. Contexto: unidade, campanha, posição, variante e cinco UTMs. O evento geral e o específico são intencionais: calcular CTR com `VIPGroupClick / PageView`, nunca somando os dois eventos de clique. Não há registro de entrada confirmada, nem inferência de entrada com base em clique. Evitar dados pessoais em UTMs. Validar coleta real no ambiente de anúncios após configurar os IDs.

## Testes A/B

`variants` contém A, B e C; A é o padrão. São editáveis headline, imagem, CTA, ordem dos benefícios e posição da seção de confiança (`trustFirst`). A variante é definida por unidade e enviada nos eventos. Para comparar simultaneamente, criar duas chaves de unidade/campanha com o mesmo convite e variantes distintas e dividir tráfego na plataforma de anúncios. Não há redistribuição automática ou declaração de vencedor.

## Auditoria da marca e ativos

Consulta em 22/10/2026: página inicial, procedimentos e páginas VIP oficiais de Pinhais e Ponta Grossa. As páginas VIP antigas mostravam promoções e contagem regressiva; nada disso foi copiado para esta experiência.

- Referência: https://adclinic.com.br/
- Procedimentos: https://adclinic.com.br/procedimentos/
- VIP: https://adclinic.com.br/acesso-ao-grupo-vip-pinhais/
- VIP: https://adclinic.com.br/acesso-ao-grupo-vip-ponta-grossa/
- Paleta verificada no CSS oficial `two_front_page_minified_post-4902.min.css`: `#32475C`, `#456879`, `#EEE3D0`, `#BAD6DA`. Off-white e bordas são cores de apoio desta composição, não especificações oficiais de marca.
- Logo preservada: https://adclinic.com.br/wp-content/uploads/2020/10/logo-adclinic3.png
- Hero: https://adclinic.com.br/wp-content/uploads/2026/05/banner-campanha-maio-desktop.jpeg.webp — arquivo original; enquadramento via CSS mostra a fotografia e exclui o texto e CTA da campanha anterior.
- Atendimento: https://adclinic.com.br/wp-content/uploads/2025/10/procedimento-01-home.png.webp
- Mandala original: https://adclinic.com.br/wp-content/uploads/2025/04/adclinic-endolaser_mandala.svg
- Raleway local em WOFF2; serif editorial Georgia, fonte do sistema. Logo não redesenhada.

Os ativos foram obtidos do site oficial para o projeto solicitado. A disponibilidade pública não comprova direitos para redistribuição independente; validar liberação da marca/fotografias para a campanha final. Não foram criados depoimentos, descontos ou promessas de resultado. Não havia fotografia verificável de ambiente/unidade específica nos ativos selecionados; a seção de confiança usa a fotografia oficial de atendimento, sem atribuí-la a uma unidade.

## Validação realizada

- Build de produção e TypeScript estrito.
- Testes isolados da validação de convites, bloqueio antes de consentimento, revogação, inicialização única, UTMs e envio para os adaptadores GTM/GA4/Meta, sem chamadas externas.
- Layout em viewports de conteúdo de 360, 390, 768, 1024 e 1440 px, sem rolagem horizontal. Em 360/390, borda inferior do CTA a aproximadamente 507/514 px na rota Pinhais.
- FAQ abre e mostra resposta; preferências de privacidade abrem; sticky aparece após o CTA principal sair da área visível e é ocultado enquanto as preferências estão abertas.
- Teclado: elementos semânticos, foco visível, link de salto, FAQ nativo. Movimento reduzido e safe areas contemplados.

Não foram medidos Lighthouse, LCP/CLS/INP em dispositivos reais. Metas do briefing são metas, não resultados certificados. O teste de navegação real ao WhatsApp e dos IDs publicitários depende das configurações definitivas. Imagens WebP, fonte local, dimensões reservadas, lazy loading abaixo da dobra e HTML pré-renderizado reduzem o custo de carregamento.
