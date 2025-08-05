import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./config"; // Ajusta si tu ruta es distinta

/**
 * Sube una imagen de perfil al Storage, guarda su URL en Firestore y la devuelve.
 * @param file - Archivo seleccionado por el usuario
 * @param userId - ID único del usuario
 * @returns URL pública de la imagen subida
 */
export async function subirImagenPerfil(file: File, userId: string): Promise<string> {
  // ✅ Validar tipo de archivo
  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo debe ser una imagen válida");
  }

  // ✅ Validar tamaño (máx. 5MB)
  const maxSizeInMB = 5;
  if (file.size > maxSizeInMB * 1024 * 1024) {
    throw new Error("La imagen no debe superar los 5MB");
  }

  try {
    // ✅ Generar nombre único
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const fileName = `perfil_${timestamp}.${extension}`;

    const storageRef = ref(storage, `perfiles/${userId}/${fileName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    // 🔥 Guardar URL en Firestore
    const perfilRef = doc(db, "usuarios", userId);
    await setDoc(perfilRef, { imagenPerfil: url }, { merge: true });

    return url;
  } catch (error) {
    console.error("Error al subir/guardar imagen:", error);
    throw new Error("Ocurrió un problema al subir la imagen");
  }
}