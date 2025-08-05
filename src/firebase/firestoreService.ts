import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db as firestore } from "./config";

// ✅ Tipado para colección "test"
export interface TestDoc {
  id: string;
  nombre: string;
  activo: boolean;
  creado: Date;
}

/**
 * Obtiene todos los documentos de la colección "test"
 * @returns Array de TestDoc
 */
export async function testFirestore(): Promise<TestDoc[]> {
  const snapshot = await getDocs(collection(firestore, "test"));

  const rawData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Partial<Omit<TestDoc, "id">>),
  }));

  const perfilesValidos = rawData.filter(
    (p): p is TestDoc =>
      typeof p.nombre === "string" &&
      typeof p.activo === "boolean" &&
      p.creado instanceof Date
  );

  return perfilesValidos;
}

/**
 * Guarda la URL de la foto de perfil en el documento del usuario
 * Usa el correo como ID del documento
 * @param email - Correo del usuario
 * @param fotoUrl - URL pública de la imagen
 */
export async function guardarFotoPerfil(
  email: string,
  fotoUrl: string
): Promise<void> {
  const userRef = doc(firestore, "usuarios", email);
  await setDoc(userRef, { fotoPerfil: fotoUrl }, { merge: true });
}

/**
 * Obtiene la URL de la foto de perfil desde Firestore
 * Usa el correo como ID del documento
 * @param email - Correo del usuario
 * @returns URL o null si no existe
 */
export async function obtenerFotoPerfil(
  email: string
): Promise<string | null> {
  if (!email || typeof email !== "string") {
    throw new Error("Email inválido para obtener foto de perfil.");
  }

  const userRef = doc(firestore, "usuarios", email);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    return typeof data.fotoPerfil === "string" ? data.fotoPerfil : null;
  } else {
    console.warn(`No se encontró el documento para el email: ${email}`);
    return null;
  }
}