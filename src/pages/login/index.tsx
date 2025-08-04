import { NextPage } from "next";
import { useEffect } from "react";

// ✅ Usamos alias definidos en tsconfig.json
import { iniciarSesion } from "@auth";
import { testFirestore, TestDoc } from "@firestore";

const LoginPage: NextPage = () => {
  useEffect(() => {
    async function load() {
      try {
        const docs: TestDoc[] = await testFirestore();
        console.log("📦 Docs de prueba:", docs);
      } catch (err) {
        console.error("🔥 Error al leer Firestore:", err);
      }
    }
    load();
  }, []);

  const onLogin = async () => {
    try {
      const user = await iniciarSesion("correo@ejemplo.com", "tuPass123");
      console.log("🔑 Usuario autenticado:", user.email);
    } catch (err) {
      console.error("🔥 Error al iniciar sesión:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🔐 Login Page</h1>
      <button onClick={onLogin}>Iniciar Sesión</button>
      <p>Revisa la consola para ver Auth y Firestore.</p>
    </div>
  );
};

export default LoginPage;