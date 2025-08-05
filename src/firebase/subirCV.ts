import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Sube el CV a Firebase Storage y devuelve la URL pública
 * @param email - email del candidato (usado como identificador)
 * @param file - archivo PDF (File object)
 * @returns URL pública del archivo subido
 */
export const subirCV = async (email: string, file: File): Promise<string> => {
  const storage = getStorage();
  const timestamp = Date.now();
  const storageRef = ref(storage, `cvs/${email}/${timestamp}.pdf`);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('Error al subir el CV:', error);
    throw new Error('No se pudo subir el CV');
  }
};