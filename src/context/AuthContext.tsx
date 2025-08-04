"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/config";

// Define la estructura del contexto
interface AuthContextType {
  usuario: User | null;
  cargando: boolean;
}

// Crea el contexto con valores iniciales
const AuthContext = createContext<AuthContextType>({
  usuario: null,
  cargando: true,
});

// Proveedor del contexto que envuelve toda la app
export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.error("Firebase Auth no está inicializado.");
      setCargando(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para acceder fácilmente al contexto
export function useAuth() {
  return useContext(AuthContext);
}