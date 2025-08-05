import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Sube múltiples imágenes y devuelve sus URLs públicas
 * @param email - email del candidato
 * @param files - arreglo de archivos tipo imagen
 * @returns arreglo con las URLs públicas
 */
export const subirGaleria = async (
  email: string,
  files: File[]
): Promise<string[]> => {
  const storage = getStorage();
  const timestamp = Date.now();

  const urls: string[] = [];

  for (const [i, file] of files.entries()) {
    const nombre = `${timestamp}-${i}-${file.name}`;
    const storageRef = ref(storage, `galeria/${email}/${nombre}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    } catch (err) {
      console.error(`❌ Error subiendo imagen ${nombre}:`, err);
    }
  }

  return urls;
};