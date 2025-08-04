import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './config'; // ajusta si usas otro nombre
export async function guardarFotoPerfil(email: string, url: string) {
  const ref = doc(db, 'perfilCandidatos', email);
  await updateDoc(ref, { avatarUrl: url });
}

export async function obtenerFotoPerfil(email: string): Promise<string> {
  const ref = doc(db, 'perfilCandidatos', email);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data();
    return data?.avatarUrl || '';
  }
  return '';
}