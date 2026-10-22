export type Variant = 'A' | 'B' | 'C';
export type Unit = { id: string; name: string; city: string; invite: string; campaign: string; variant: Variant };
export const units: Record<string, Unit> = {
  principal: { id: 'principal', name: 'AdClinic', city: '', invite: '', campaign: 'vip-institucional', variant: 'A' },
  pinhais: { id: 'pinhais', name: 'AdClinic Pinhais', city: 'Pinhais · PR', invite: '', campaign: 'vip-pinhais', variant: 'A' },
  'ponta-grossa': { id: 'ponta-grossa', name: 'AdClinic Ponta Grossa', city: 'Ponta Grossa · PR', invite: '', campaign: 'vip-ponta-grossa', variant: 'A' },
};
export const variants = {
  A: { headline: 'Se cuidar é ainda melhor quando você tem acesso a', emphasis: 'ofertas exclusivas.', image: '/images/hero-source.webp', cta: 'Quero entrar no Grupo VIP', benefitOrder: [0, 1, 2], trustFirst: false },
  B: { headline: 'Ofertas especiais de estética,', emphasis: 'direto no seu WhatsApp.', image: '/images/hero-source.webp', cta: 'Quero entrar no Grupo VIP', benefitOrder: [0, 1, 2], trustFirst: false },
  C: { headline: 'Você está convidada para o', emphasis: 'Grupo VIP da AdClinic.', image: '/images/hero-source.webp', cta: 'Quero entrar no Grupo VIP', benefitOrder: [0, 1, 2], trustFirst: false },
};
// Escolha GTM OU integrações diretas. Não instalar a mesma plataforma nas duas opções.
export const analytics = { mode: 'direct' as 'direct' | 'gtm', metaPixelId: '', ga4Id: '', gtmId: '' };
export function validInvite(value: string) { try { const u = new URL(value); return u.protocol === 'https:' && u.hostname === 'chat.whatsapp.com' && /^\/[A-Za-z0-9]{10,}\/?$/.test(u.pathname) && !u.username && !u.password && !u.port && !u.search && !u.hash; } catch { return false; } }
