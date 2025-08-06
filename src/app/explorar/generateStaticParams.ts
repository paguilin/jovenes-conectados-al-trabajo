import { collection, getDocs } from 'firebase/firestore'
import { db } from '@config'

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, 'perfilCandidatos'))
  return snapshot.docs.map(doc => ({ slug: doc.id }))
}