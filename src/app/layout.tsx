import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://adclinic-vip-experience.readycrown11.chatgpt.site'),
  title: 'Grupo VIP AdClinic | Um convite para se cuidar',
  description: 'Ofertas relâmpago, condições especiais e novidades da AdClinic. Entre gratuitamente no Grupo VIP pelo WhatsApp.',
  openGraph: { title: 'AdClinic — Private Beauty Club', description: 'Seu cuidado merece oportunidades especiais. Conheça o Grupo VIP gratuito.', locale: 'pt_BR', type: 'website', images: [{ url: '/images/hero-source.webp', width: 1600, height: 900 }] },
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="pt-BR"><body>{children}</body></html>; }
