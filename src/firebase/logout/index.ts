import { signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app'; // 👈 Import para tipar errores
import { auth } from '../config';

export const cerrarSesion = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('Sesión cerrada correctamente');
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error('Error al cerrar sesión:', error.message);
    } else {
      console.error('Error inesperado al cerrar sesión:', error);
    }
    throw new Error('No se pudo cerrar sesión');
  }
};