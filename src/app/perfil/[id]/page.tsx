import PerfilVisitanteClient from '@/components/PerfilVisitanteClient';

export const dynamic = 'force-static'; // 🧊 Fuerza exportación estática

export async function generateStaticParams() {
  // 📝 
  return [
    { id: 'juan' },
    { id: 'maria' },
    { id: 'carlos' }
  ];
}

export default function PerfilVisitante({ params }: { params: { id: string } }) {
  return <PerfilVisitanteClient id={params.id} />;
}