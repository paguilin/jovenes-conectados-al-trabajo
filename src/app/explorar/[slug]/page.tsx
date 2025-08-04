'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import Image from 'next/image';

type PerfilCandidato = {
  bio: string;
  videoUrl: string;
  slug: string;
  cvUrl?: string;
  imagenes?: string[];
};

export default function VistaPerfilSlug() {
  const { slug } = useParams() as { slug: string };
  const [perfil, setPerfil] = useState<PerfilCandidato | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      if (!slug) return;
      try {
        const q = query(collection(db, 'perfilCandidatos'), where('slug', '==', slug));
        const docs = await getDocs(q);
        if (!docs.empty) {
          setPerfil(docs.docs[0].data() as PerfilCandidato);
        }
      } catch (err) {
        console.error('Error al buscar perfil por slug:', err);
      } finally {
        setLoading(false);
      }
    };
    cargarPerfil();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg animate-pulse">🔍 Cargando perfil...</p>
      </main>
    );
  }

  if (!perfil) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-xl font-semibold">
          ❌ No se encontró ningún perfil con el slug <span className="text-white">"{slug}"</span>
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 text-white bg-[#0f2027]">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[#00f0ff] text-center">Perfil de {perfil.slug}</h1>

        <p className="text-lg">{perfil.bio}</p>

        {perfil.videoUrl && (
          <div>
            <h2 className="text-xl font-semibold text-[#00f0ff] mb-2">🎬 Video</h2>
            <div className="aspect-video overflow-hidden rounded-md shadow-lg">
              <iframe
                src={perfil.videoUrl.replace('watch?v=', 'embed/')}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {perfil.cvUrl && (
          <div>
            <h2 className="text-xl font-semibold text-[#00f0ff] mb-2">📄 CV</h2>
            <a
              href={perfil.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-300 transition"
            >
              Ver CV PDF
            </a>
          </div>
        )}

        {perfil.imagenes?.length && (
          <div>
            <h2 className="text-xl font-semibold text-[#00f0ff] mb-2">🖼️ Imágenes</h2>
            <div className="grid grid-cols-2 gap-4">
              {perfil.imagenes.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Proyecto ${i + 1}`}
                  width={300}
                  height={200}
                  className="rounded-md object-cover shadow-lg border border-[#00f0ff]"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}