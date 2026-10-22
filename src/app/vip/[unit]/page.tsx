import Landing from '../../../components/Landing';
import { units } from '../../../lib/config';
import { notFound } from 'next/navigation';
export function generateStaticParams() { return Object.keys(units).filter(id => id !== 'principal').map(unit => ({ unit })); }
export const dynamicParams = false;
export default async function UnitPage({ params }: { params: Promise<{ unit: string }> }) { const { unit } = await params; if (!units[unit]) notFound(); return <Landing unit={units[unit]} />; }
