import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

export default async function registrarUsuario(email: string, password: string, rol: string) {
  const credenciales = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "usuarios", credenciales.user.uid), {
    email,
    rol,
    uid: credenciales.user.uid,
  });
}
