import PerfilVisitanteClient from '@/components/PerfilVisitanteClient';

export default function PerfilVisitante({ params }: { params: { id: string } }) {
  return <PerfilVisitanteClient id={params.id} />;
}