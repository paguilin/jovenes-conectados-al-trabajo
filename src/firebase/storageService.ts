import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

/**
 * Sube una imagen de perfil al Storage y devuelve la URL pública.
 * @param file - Archivo seleccionado por el usuario
 * @param userId - ID único del usuario para organizar su carpeta
 * @returns URL pública de la imagen subida
 */
export async function subirImagenPerfil(file: File, userId: string): Promise<string> {
  // ✅ Validar tipo de archivo (solo imágenes)
  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo debe ser una imagen");
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
    return url;
  } catch (error) {
    console.error("Error al subir imagen:", error);
    throw new Error("Hubo un problema al subir la imagen");
  }
}