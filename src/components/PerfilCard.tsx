'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image'; // ✅ Importación del componente

interface PerfilData {
  bio: string;
  videoUrl?: string;
  cvUrl?: string;
  imagenes?: string[];
  actualizadoEn?: { seconds: number; nanoseconds: number };
}

export default function PerfilCard() {
  const [perfil, setPerfil] = useState<PerfilData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const usuario = auth.currentUser;
      if (!usuario) return;
      const uid = usuario.uid;
      const perfilRef = doc(db, 'perfilCandidatos', uid);
      const perfilSnap = await getDoc(perfilRef);
      if (perfilSnap.exists()) {
        setPerfil(perfilSnap.data() as PerfilData);
      }
    };

    fetchData();
  }, []);

  if (!perfil) {
    return <p className="text-white text-center mt-10">⏳ Cargando perfil...</p>;
  }

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md text-white max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Tu Perfil</h2>

      <p className="mb-2">
        <span className="font-semibold">Biografía:</span> {perfil.bio || 'No hay biografía registrada'}
      </p>

      {perfil.videoUrl && (
        <p className="mb-2">
          <span className="font-semibold">Video presentación:</span>{' '}
          <a href={perfil.videoUrl} target="_blank" className="underline text-blue-400" rel="noopener noreferrer">
            Ver video
          </a>
        </p>
      )}

      {perfil.cvUrl && (
        <p className="mb-2">
          <span className="font-semibold">CV:</span>{' '}
          <a href={perfil.cvUrl} target="_blank" className="underline text-green-400" rel="noopener noreferrer">
            Ver CV
          </a>
        </p>
      )}

      {perfil.imagenes && perfil.imagenes.length > 0 && (
        <div className="mt-4">
          <span className="font-semibold">Imágenes:</span>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {perfil.imagenes.map((imgUrl: string, idx: number) => (
              <Image
                key={idx}
                src={imgUrl}
                alt={`img-${idx}`}
                width={200}
                height={200}
                className="rounded border border-[#444] object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {perfil.actualizadoEn && (
        <p className="mt-4 text-sm text-gray-400">
          Última edición:{' '}
          {new Date(perfil.actualizadoEn.seconds * 1000).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      )}
    </div>
  );
}