'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@config';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';

type PerfilCandidato = {
  slug: string;
  bio: string;
  imagenes?: string[];
};

export default function ExplorarGeneral() {
  const [perfiles, setPerfiles] = useState<PerfilCandidato[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfiles = async () => {
      try {
        const snap = await getDocs(collection(db, 'perfilCandidatos'));
        const data: PerfilCandidato[] = snap.docs
          .map((doc) => doc.data())
          .filter((p) => p.slug) as PerfilCandidato[];
        setPerfiles(data);
      } catch (err) {
        console.error('Error al cargar perfiles:', err);
      } finally {
        setLoading(false);
      }
    };
    cargarPerfiles();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg animate-pulse">🌌 Cargando talentos...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 bg-[#0f2027] text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-[#00f0ff]">Explorar Talentos</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perfiles.map((p, i) => (
            <Link
              href={`/explorar/${p.slug}`}
              key={i}
              className="bg-[#1c1f26] p-4 rounded-xl shadow-lg hover:ring-2 ring-[#00f0ff] transition"
            >
              <div className="space-y-3">
                {p.imagenes?.[0] ? (
                  <Image
                    src={p.imagenes[0]}
                    alt={`Imagen de ${p.slug}`}
                    width={300}
                    height={200}
                    className="rounded-md object-cover border border-[#00f0ff]"
                  />
                ) : (
                  <div className="bg-[#2c5364] h-[200px] flex items-center justify-center rounded-md text-3xl">
                    🌌
                  </div>
                )}
                <h2 className="text-xl font-semibold text-[#00f0ff]">{p.slug}</h2>
                <p className="text-sm text-gray-300">
                  {p.bio.length > 120 ? p.bio.slice(0, 120) + '...' : p.bio}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}