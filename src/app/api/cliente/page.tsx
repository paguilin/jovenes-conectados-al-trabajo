"use client";

import { useSession, signOut } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ClientePage() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard de Cliente</h1>
        <p>Hola, {session?.user?.name}</p>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </div>
    </ProtectedRoute>
  );
}
