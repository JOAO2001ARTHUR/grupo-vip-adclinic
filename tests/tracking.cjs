const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const assert = require('node:assert/strict');
const compile = f => ts.transpileModule(readFileSync(f, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const config = { exports: {}, URL }; vm.runInNewContext(compile('src/lib/config.ts'), config);
const { validInvite, units } = config.exports;
for (const bad of ['', 'https://wa.me/5511999999999', 'javascript:alert(1)', 'https://chat.whatsapp.com.evil.test/abcdefghijk', 'http://chat.whatsapp.com/abcdefghijk', 'https://user:pass@chat.whatsapp.com/abcdefghijk', 'https://chat.whatsapp.com/']) assert.equal(validInvite(bad), false);
assert.equal(validInvite('https://chat.whatsapp.com/TESTONLY1234567890'), true); // Fixture only, never a live destination.
assert.ok(Object.values(units).every(u => !u.invite));
function setup(mode) {
  const state = new Map(); const scripts = [];
  const context = { exports: {}, require: () => ({ analytics: { mode, gtmId: 'GTM-TESTONLY', ga4Id: 'G-TESTONLY', metaPixelId: '123456' } }), window: {}, document: { createElement: () => ({ dataset: {} }), head: { appendChild: el => scripts.push(el) } }, localStorage: { getItem: k => state.get(k), setItem: (k,v) => state.set(k,v) }, location: { origin:'https://example.test',pathname:'/vip/pinhais/',search:'?utm_source=instagram&utm_campaign=vip' }, URLSearchParams };
  vm.runInNewContext(compile('src/lib/tracking.ts'), context); return { api: context.exports, state, scripts, context };
}
for (const mode of ['direct','gtm']) {
  const { api,state,scripts,context }=setup(mode);
  api.initializeTracking(); api.track('PageView',units.pinhais,'page'); assert.equal(scripts.length,0);
  api.saveConsent(true); api.initializeTracking(); const count=scripts.length; api.initializeTracking(); assert.equal(scripts.length,count);
  api.track('VIPGroupClick',units.pinhais,'hero');
  if(mode==='gtm') { const click=context.window.dataLayer.find(e=>e.event==='VIPGroupClick'); assert.equal(click.utm_source,'instagram'); assert.equal(click.unit,'pinhais'); assert.equal(context.window.dataLayer.filter(e=>e.event==='VIPGroupClick').length,1); }
  else { let calls=0; context.window.fbq.callMethod=()=>calls++; api.track('VIPHeroClick',units.pinhais,'hero'); assert.equal(calls,1); }
  api.saveConsent(false); const before=context.window.dataLayer.length; api.track('VIPGroupClick',units.pinhais,'final'); assert.equal(context.window.dataLayer.length,before); assert.equal(state.get('adclinic-consent'),'denied');
}
console.log('PASS: convite, destinos inválidos, consentimento, inicialização única, UTMs, eventos GTM/GA4/Meta e revogação. Nenhuma requisição externa executada.');

