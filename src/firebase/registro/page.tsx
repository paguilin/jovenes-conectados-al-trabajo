"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Usamos alias desde tsconfig.json
import registrarUsuario from "@registro";
import { FirebaseError } from "firebase/app"; // 👈 Importado para validar errores Firebase

export default function RegistroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("cliente");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registrarUsuario(email, password, rol);
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message || "Error al registrar");
      } else {
        setError("Error inesperado al registrar");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegistro}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4">Registro</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label className="block mb-2">
          Correo:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </label>

        <label className="block mb-2">
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </label>

        <label className="block mb-4">
          Rol:
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="cliente">Cliente</option>
            <option value="propietario">Propietario</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}