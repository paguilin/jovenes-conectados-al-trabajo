import { useSession, signOut } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ClientePage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const user = session?.user;

  if (!user) {
    return (
      <ProtectedRoute>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>🙈 No hay sesión activa</h1>
          <p>Por favor inicia sesión para continuar.</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Dashboard de Cliente</h1>
        <p>Hola, <strong>{user.name}</strong></p>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </div>
    </ProtectedRoute>
  );
}