import { useEffect } from "react";
import { db } from "../config"; // Ajusta la ruta si tu archivo tiene otro nombre
import { collection, getDocs } from "firebase/firestore";

const FirebaseTest = () => {
  useEffect(() => {
    const testFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "test")); // Usa tu colección
        console.log("📦 Documentos obtenidos:");
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });
      } catch (error) {
        console.error("🔥 Error al conectar con Firestore:", error);
      }
    };

    testFirestore();
  }, []);

  return <div>Test Firebase en consola 🚀</div>;
};

export default FirebaseTest;