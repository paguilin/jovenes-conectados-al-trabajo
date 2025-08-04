import { auth } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function registrarUsuario(email, password, rol) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    throw error;
  }
}