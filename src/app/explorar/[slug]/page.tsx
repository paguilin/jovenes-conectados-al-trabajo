import { collection, getDocs } from 'firebase/firestore'
import { db } from '@config'
import dynamic from 'next/dynamic'

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, 'perfilCandidatos'))
  return snapshot.docs.map(doc => ({ slug: doc.id }))
}

const VistaPerfilSlugClient = dynamic(() => import('./VistaPerfilSlugClient'), { ssr: false })

type Props = {
  params: { slug: string }
}

export default function Page({ params }: Props) {
  return <VistaPerfilSlugClient params={params} />
}