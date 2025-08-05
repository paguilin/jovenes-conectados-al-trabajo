import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';

import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';

import { db, storage } from './config';

// 🔽 SUBIR AVATAR Y GUARDAR URL EN FIRESTORE
export async function subirAvatar(email: string, file: File): Promise<string> {
  const ruta = `avatars/${email}/${Date.now()}-${file.name}`;
  const refAvatar = ref(storage, ruta);
  await uploadBytes(refAvatar, file);
  return await getDownloadURL(refAvatar);
}

// 🔽 GUARDAR SOLO URL DEL AVATAR
export async function guardarFotoPerfil(email: string, url: string): Promise<void> {
  const ref = doc(db, 'perfilCandidatos', email);
  await setDoc(ref, {
    avatarUrl: url,
    actualizadoEn: serverTimestamp()
  }, { merge: true });
}

// 🔽 OBTENER URL DEL AVATAR
export async function obtenerFotoPerfil(email: string): Promise<string> {
  const ref = doc(db, 'perfilCandidatos', email);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data();
    return typeof data?.avatarUrl === 'string' ? data.avatarUrl : '';
  }
  return '';
}

// 🔽 CREAR O ACTUALIZAR PERFIL COMPLETO
export interface DatosPerfil {
  nombre?: string;
  bio?: string;
  avatarUrl?: string;
  videoUrl?: string;
  cvUrl?: string;
  imagenes?: string[];
  galeria?: string[];
  skills?: string[];
}

export async function crearOActualizarPerfil(email: string, datos: DatosPerfil): Promise<void> {
  const ref = doc(db, 'perfilCandidatos', email);
  const snapshot = await getDoc(ref);

  const nuevoPayload = {
    ...datos,
    actualizadoEn: serverTimestamp()
  };

  if (snapshot.exists()) {
    await setDoc(ref, nuevoPayload, { merge: true });
  } else {
    await setDoc(ref, {
      creadoEn: serverTimestamp(),
      ...nuevoPayload
    });
  }
}