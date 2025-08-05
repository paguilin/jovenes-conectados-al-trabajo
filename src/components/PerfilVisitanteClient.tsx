'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, enableNetwork } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { motion } from 'framer-motion';

type DatosPerfil = {
  nombre?: string;
  bio?: string;
  avatarUrl?: string;
  videoUrl?: string;
  skills?: string[];
};

export default function PerfilVisitanteClient({ id }: { id: string }) {
  const [datos, setDatos] = useState<DatosPerfil | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    enableNetwork(db)
      .then(async () => {
        const ref = doc(db, 'perfilCandidatos', id);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          setError('Perfil no encontrado');
          return;
        }
        setDatos(snap.data() as DatosPerfil);
      })
      .catch((e) => {
        console.error('Error al reconectar Firestore:', e);
        setError('No se pudo conectar a Firestore');
      });
  }, [id]);

  if (error) {
    return <p className="text-white text-center mt-10">{error}</p>;
  }

  if (!datos) {
    return <p className="text-white text-center mt-10">Cargando perfil...</p>;
  }

  const { nombre, bio, avatarUrl, videoUrl, skills } = datos;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-[#1c1f26] bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_15px_#00f0ff66] text-white space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-[#00f0ff]">{nombre}</h1>

        {avatarUrl && (
          <div className="flex justify-center">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="h-32 w-32 object-cover rounded-full border-4 border-[#00f0ff] shadow-md"
            />
          </div>
        )}

        <p className="text-center text-lg text-gray-300">{bio}</p>

        {videoUrl && (
          <div className="w-full aspect-video mt-4">
            <iframe
              src={videoUrl}
              className="w-full h-full rounded-lg border border-[#00f0ff]"
              allowFullScreen
            />
          </div>
        )}

        {skills && skills.length > 0 && (
          <div className="mt-4">
            <h2 className="text-[#00f0ff] text-xl font-semibold mb-2">🔧 Habilidades</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#00f0ff] text-black font-semibold rounded-full shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <a
            href="/dashboard"
            className="bg-[#00f0ff] text-black font-bold px-5 py-3 rounded-lg shadow-md hover:bg-[#00e5ff] transition-all duration-300"
          >
            ← Volver al Dashboard
          </a>
        </div>
      </motion.div>
    </main>
  );
}