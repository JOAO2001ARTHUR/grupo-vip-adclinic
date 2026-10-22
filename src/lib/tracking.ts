import { analytics, type Unit } from './config';
declare global { interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void; fbq?: ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean; version?: string; callMethod?: (...args: unknown[]) => void }; } }
let initialized = false;
export const trackingConfigured = analytics.mode === 'gtm' ? /^GTM-[A-Z0-9]+$/.test(analytics.gtmId) : /^\d+$/.test(analytics.metaPixelId) || /^G-[A-Z0-9]+$/.test(analytics.ga4Id);
function script(src: string) { const el = document.createElement('script'); el.src = src; el.async = true; el.dataset.vipTracker = ''; document.head.appendChild(el); }
export function consentGranted() { try { return localStorage.getItem('adclinic-consent') === 'granted'; } catch { return false; } }
export function initializeTracking() {
  if (initialized || !trackingConfigured || !consentGranted()) return;
  initialized = true; window.dataLayer ||= [];
  if (analytics.mode === 'gtm') { window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' }); script(`https://www.googletagmanager.com/gtm.js?id=${analytics.gtmId}`); return; }
  if (/^G-[A-Z0-9]+$/.test(analytics.ga4Id)) { window.gtag = function() { window.dataLayer.push(arguments); }; window.gtag('js', new Date()); window.gtag('config', analytics.ga4Id, { send_page_view: false, page_location: location.origin + location.pathname }); script(`https://www.googletagmanager.com/gtag/js?id=${analytics.ga4Id}`); }
  if (/^\d+$/.test(analytics.metaPixelId)) { const q: NonNullable<Window['fbq']> = function(...args) { if (q.callMethod) q.callMethod(...args); else q.queue!.push(args); }; q.queue = []; q.loaded = true; q.version = '2.0'; window.fbq = q; script('https://connect.facebook.net/en_US/fbevents.js'); window.fbq('init', analytics.metaPixelId); window.fbq('consent', 'grant'); }
}
export function track(event: string, unit: Unit, position: string) {
  if (!consentGranted() || !trackingConfigured) return;
  initializeTracking();
  const query = new URLSearchParams(location.search);
  const context = { unit: unit.id, campaign_id: unit.campaign, cta_position: position, variant: unit.variant, ...Object.fromEntries(['source','medium','campaign','content','term'].map(key => [`utm_${key}`, (query.get(`utm_${key}`) || '').slice(0, 150)])) };
  if (analytics.mode === 'gtm') window.dataLayer.push({ event, ...context });
  else { window.gtag?.('event', event === 'PageView' ? 'page_view' : event, context); window.fbq?.(event === 'PageView' ? 'track' : 'trackCustom', event, context); }
}
export function saveConsent(granted: boolean) { try { localStorage.setItem('adclinic-consent', granted ? 'granted' : 'denied'); } catch { /* Privacidade restrita: não inicializar rastreadores. */ } if (!granted) { window.fbq?.('consent', 'revoke'); window.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }); } }
