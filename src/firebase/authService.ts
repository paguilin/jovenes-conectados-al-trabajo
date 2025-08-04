import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "./config";

/**
 * Inicia sesión con un correo y contraseña en Firebase.
 * @param email - Correo del usuario
 * @param password - Contraseña del usuario
 * @returns Usuario autenticado
 */
export async function iniciarSesion(
  email: string,
  password: string
): Promise<User> {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
    throw new Error("Error desconocido al iniciar sesión");
  }
}