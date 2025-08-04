import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);

export const iniciarSesion = async (email, password) => {
  try {
    const usuario = await signInWithEmailAndPassword(auth, email, password);
    return usuario;
  } catch (error) {
    throw error;
  }
};

export const cerrarSesion = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }

}
 