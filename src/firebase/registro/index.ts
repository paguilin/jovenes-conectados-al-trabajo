import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config"; // Ajusta esta ruta si es necesario

export default async function registrarUsuario(
  email: string,
  password: string,
  rol: string
) {
  try {
    const credenciales = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "usuarios", credenciales.user.uid), {
      email,
      rol,
      uid: credenciales.user.uid,
    });

    console.log("Usuario registrado exitosamente:", credenciales.user.uid);
    return credenciales.user; // útil si quieres manejar el usuario luego
  } catch (error: any) {
    console.error("Error al registrar usuario:", error.message);
    throw error;
  }
}