'use client';
import { useEffect, useRef, useState } from 'react';
import { type Unit, validInvite, variants } from '../lib/config';
import { consentGranted, initializeTracking, saveConsent, track, trackingConfigured } from '../lib/tracking';
import { ShinyButton } from './ui/shiny-button';
import { AnimatedHeadline } from './ui/animated-headline';

const benefits = [
  { icon: 'spark', title: 'Ofertas relâmpago', description: 'Condições promocionais divulgadas no grupo.' },
  { icon: 'gift', title: 'Acesso gratuito', description: 'Entre sem pagar nada para participar.' },
  { icon: 'chat', title: 'Direto no WhatsApp', description: 'Novidades no aplicativo que você já utiliza.' },
];

const faq = [
  ['Quanto custa participar?', 'Nada. A entrada no Grupo VIP é gratuita.'],
  ['Preciso ser cliente da AdClinic?', 'Não. Você pode participar para conhecer as ofertas, mesmo que ainda não tenha realizado um procedimento.'],
  ['Como recebo as ofertas?', 'As condições promocionais são divulgadas no grupo pelo WhatsApp.'],
  ['Sou obrigado a comprar alguma coisa?', 'Não. A participação não cria obrigação de compra.'],
  ['Posso sair do grupo?', 'Sim. Você pode sair pelo próprio WhatsApp quando desejar.'],
  ['Quem pode ver meu número?', 'Dependendo das configurações do grupo, outros participantes podem visualizar seu nome e número de telefone, conforme o funcionamento do WhatsApp.'],
];

function Icon({ name }: { name: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === 'spark' ? (
        <path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z" />
      ) : name === 'gift' ? (
        <>
          <rect x="3" y="8" width="18" height="4" rx="1"/>
          <path d="M5 12v9h14v-9M12 8v13M12 8H8a3 3 0 1 1 3-3l1 3Zm0 0h4a3 3 0 1 0-3-3l-1 3Z"/>
        </>
      ) : (
        <>
          <path d="M21 11.5a9 9 0 0 1-13.4 7.8L3 21l1.6-4.6A9 9 0 1 1 21 11.5Z"/>
          <path d="M8 8c0 4 4 8 7 7l1-2-3-1-1 1-2-2 1-1-1-3-2 1Z"/>
        </>
      )}
    </svg>
  );
}

function CTA({ unit, position, children, light = false }: { unit: Unit; position: string; children: React.ReactNode; light?: boolean }) {
  const enabled = validInvite(unit.invite);
  function onClick() {
    track('VIPGroupClick', unit, position);
    const specific: Record<string, string> = { hero: 'VIPHeroClick', sticky: 'VIPStickyClick', final: 'VIPFinalClick' };
    if (specific[position]) track(specific[position], unit, position);
    if (enabled) {
      window.location.href = unit.invite;
    }
  }

  return (
    <ShinyButton
      className={`cta-shiny-wrapper ${light ? 'light-shiny' : ''}`}
      onClick={onClick}
      disabled={!enabled}
      aria-describedby={!enabled ? "invite-notice" : undefined}
      data-position={position}
    >
      <Icon name="chat" />
      <span>{children}</span>
      <span className="arrow" aria-hidden="true">↗</span>
    </ShinyButton>
  );
}

export default function Landing({ unit }: { unit: Unit }) {
  const variant = variants[unit.variant];
  const heroCTA = useRef<HTMLDivElement>(null);
  const pageTracked = useRef(false);
  const [sticky, setSticky] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const privacyTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setSticky(!entry.isIntersecting && entry.boundingClientRect.bottom < 0), { threshold: 0 });
    if (heroCTA.current) observer.observe(heroCTA.current);
    let consent: string | null = null;
    try { consent = localStorage.getItem('adclinic-consent'); } catch { /* no storage */ }
    setPrivacy(trackingConfigured && consent === null);
    if (consentGranted() && !pageTracked.current) {
      initializeTracking();
      track('PageView', unit, 'page');
      pageTracked.current = true;
    }
    return () => observer.disconnect();
  }, [unit]);

  function consent(granted: boolean) {
    saveConsent(granted);
    setPrivacy(false);
    if (granted && !pageTracked.current) {
      initializeTracking();
      track('PageView', unit, 'page');
      pageTracked.current = true;
    }
    privacyTrigger.current?.focus();
    if (!granted) location.reload();
  }

  const trust = (
    <section className="trust section" aria-labelledby="trust-title">
      <div className="care-photo">
        <img src="/images/care.webp" alt="Tecnologia estética em atendimento, em fotografia oficial AdClinic" width="470" height="470" loading="lazy"/>
        <span>TECNOLOGIA & CUIDADO</span>
      </div>
      <div className="trust-copy">
        <p className="eyebrow">A ESSÊNCIA ADCLINIC</p>
        <h2 id="trust-title">O cuidado AdClinic.<br/>Agora com oportunidades <em>especiais para você.</em></h2>
        <p>A AdClinic reúne tecnologia estética, profissionais qualificados e atendimento personalizado para quem valoriza autocuidado, beleza e bem-estar.</p>
        <p>O Grupo VIP é mais uma forma de aproximar você das oportunidades comerciais da clínica.</p>
        <div className="signature">
          <img src="/images/logo.png" alt="AdClinic" width="130" height="47"/>
          <span>Seu cuidado.<br/>Nossa essência.</span>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <a className="skip" href="#conteudo">Ir para o conteúdo</a>
      <header className="header">
        <img src="/images/logo.png" alt="AdClinic" width="130" height="47"/>
        <span className="header-divider"/>
        <span className="header-label">CONVITE EXCLUSIVO</span>
        <span className="header-right">PRIVATE BEAUTY CLUB <span>✧</span></span>
      </header>
      <main id="conteudo">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow badge"><span/> GRUPO VIP · ACESSO GRATUITO</p>
            {unit.city && <p className="unit-label">{unit.name} · {unit.city}</p>}
            <AnimatedHeadline
              prefix={variant.headline}
              words={[
                variant.emphasis,
                "ofertas exclusivas.",
                "condições especiais.",
                "acesso antecipado."
              ]}
            />
            <p className="hero-description">Entre gratuitamente para o Grupo VIP da AdClinic e receba ofertas relâmpago, condições especiais e oportunidades em procedimentos estéticos diretamente no WhatsApp.</p>
            <div ref={heroCTA} className="hero-action">
              <CTA unit={unit} position="hero">{variant.cta}</CTA>
              <p className="microcopy">100% gratuito <span>·</span> Acesso pelo WhatsApp</p>
            </div>
            <div className="hero-benefits">
              {variant.benefitOrder.map(i => (
                <div key={i}>
                  <Icon name={benefits[i].icon}/>
                  <h3>{benefits[i].title}</h3>
                  <p>{benefits[i].description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <img className="hero-photo" src={variant.image} alt="Mulher em um momento de autocuidado, em fotografia oficial da AdClinic" width="1600" height="900" fetchPriority="high"/>
            <span className="image-label">UM CONVITE PARA PRIORIZAR VOCÊ</span>
            <div className="invitation">
              <span className="invitation-icon">✧</span>
              <div>
                <span>ADCLINIC VIP</span>
                <p>Seu cuidado merece<br/><em>um acesso especial.</em></p>
              </div>
              <span className="invitation-arrow">↗</span>
            </div>
          </div>
        </section>
        {!validInvite(unit.invite) && (
          <aside className="setup-notice" id="invite-notice">
            <span>PRÉVIA</span> O convite desta unidade ainda não foi configurado. Os botões serão liberados com o link oficial do grupo.
          </aside>
        )}
        <div className="brand-strip" aria-hidden="true">
          <span>BELEZA</span><b>✧</b><span>CUIDADO</span><b>✧</b><span>BEM-ESTAR</span><b>✧</b><span>POSSIBILIDADES</span>
        </div>
        <section className="opportunities section" aria-labelledby="opportunities-title">
          <div className="section-intro">
            <p className="eyebrow">01 / UM LUGAR ESPECIAL PARA VOCÊ</p>
            <h2 id="opportunities-title">As melhores oportunidades<br/> merecem um <em>lugar especial.</em></h2>
            <p>O Grupo VIP da AdClinic foi criado para reunir pessoas que amam se cuidar e querem acompanhar condições especiais em procedimentos estéticos.</p>
          </div>
          <div className="opportunity-grid">
            {[
              ['Ofertas relâmpago','Campanhas e oportunidades divulgadas por períodos específicos.'],
              ['Condições especiais','Valores e condições promocionais em procedimentos selecionados.'],
              ['Novidades da AdClinic','Informações sobre campanhas e oportunidades disponíveis na unidade participante.']
            ].map(([title, description], i) => (
              <article key={title}>
                <div className="card-top"><span>0{i+1}</span><Icon name={benefits[i].icon}/></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="center-cta">
            <CTA unit={unit} position="benefits">Quero receber as ofertas no WhatsApp</CTA>
          </div>
        </section>
        {variant.trustFirst && trust}
        <section className="steps-section" aria-labelledby="steps-title">
          <img className="mandala" src="/images/mandala.svg" alt="" width="1318" height="1318" loading="lazy"/>
          <div className="section steps">
            <div>
              <p className="eyebrow">02 / SIMPLES, COMO DEVE SER</p>
              <h2 id="steps-title">Seu próximo cuidado<br/>começa com <em>um clique.</em></h2>
              <p className="steps-support">Você escolhe quando e se deseja aproveitar uma oferta. Participar do grupo não obriga você a contratar nenhum procedimento.</p>
              <CTA unit={unit} position="steps" light>Entrar gratuitamente no Grupo VIP</CTA>
            </div>
            <ol>
              {[
                ['Clique no botão','Acesse gratuitamente o convite do Grupo VIP.'],
                ['Entre pelo WhatsApp','Confira as informações e confirme sua participação.'],
                ['Acompanhe as oportunidades','Receba as ofertas e descubra quais fazem sentido para você.']
              ].map(([title, description], i) => (
                <li key={title}>
                  <span className="step-number">0{i+1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        {!variant.trustFirst && trust}
        <section className="faq section" aria-labelledby="faq-title">
          <div>
            <p className="eyebrow">TRANSPARÊNCIA EM CADA DETALHE</p>
            <h2 id="faq-title">Antes de entrar,<br/><em>tire suas dúvidas.</em></h2>
            <p>Tudo o que você precisa saber<br/>para se sentir à vontade.</p>
          </div>
          <div className="questions">
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="final-section" aria-labelledby="final-title">
          <p className="eyebrow">SEU CONVITE ESTÁ AQUI</p>
          <h2 id="final-title">As próximas ofertas da AdClinic<br/> podem chegar direto ao <em>seu WhatsApp.</em></h2>
          <p>Entre gratuitamente para o Grupo VIP e acompanhe<br className="desktop-break"/> as condições especiais divulgadas pela clínica.</p>
          <CTA unit={unit} position="final">Sim, quero entrar no Grupo VIP</CTA>
          <p className="microcopy">Sem taxa de entrada. Sem formulário. Direto para o WhatsApp.</p>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <img src="/images/logo.png" alt="AdClinic" width="130" height="47"/>
          <span>YOUR BEAUTY. YOUR PRIVILEGES.</span>
          <span>{unit.city || 'PRIVATE BEAUTY CLUB'}</span>
        </div>
        <p>Ofertas sujeitas à disponibilidade da unidade participante, avaliação profissional e condições aplicáveis. A confirmação de entrada no grupo acontece no WhatsApp.</p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AdClinic. Todos os direitos reservados.</span>
          <div>
            <a href="https://adclinic.com.br/politica-de-privacidade/">Política de privacidade</a>
            <button ref={privacyTrigger} type="button" onClick={() => setPrivacy(true)}>Preferências de privacidade</button>
          </div>
        </div>
      </footer>
      {sticky && !privacy && (
        <div className="sticky">
          <CTA unit={unit} position="sticky">Entrar no Grupo VIP</CTA>
        </div>
      )}
      {privacy && (
        <section className="privacy" aria-label="Preferências de privacidade">
          <div>
            <strong>Sua privacidade, sua escolha.</strong>
            <p>{trackingConfigured ? 'Com sua permissão, usamos tecnologias de análise e publicidade para medir visitas e cliques no convite. Você pode recusar e continuar normalmente.' : 'Nenhum rastreador de publicidade ou análise está configurado nesta prévia. Sua escolha fica salva apenas neste navegador.'}</p>
          </div>
          <div className="privacy-actions">
            <button onClick={() => consent(false)}>Recusar opcionais</button>
            <button onClick={() => consent(true)}>Aceitar opcionais</button>
            <button aria-label="Fechar preferências de privacidade" onClick={() => { setPrivacy(false); privacyTrigger.current?.focus(); }}>Fechar</button>
          </div>
        </section>
      )}
    </>
  );
}
