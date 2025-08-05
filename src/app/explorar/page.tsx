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
  skills?: string[];
  galeria?: string[];
};

const SKILLS_PREDEFINIDAS = [
  'Next.js',
  'Firebase',
  'UI/UX',
  'React',
  'TypeScript',
  'Figma',
  'Tailwind',
];

export default function ExplorarGeneral() {
  const [perfiles, setPerfiles] = useState<PerfilCandidato[]>([]);
  const [loading, setLoading] = useState(true);
  const [skillFiltro, setSkillFiltro] = useState('');

  useEffect(() => {
    const cargarPerfiles = async () => {
      try {
        const snap = await getDocs(collection(db, 'perfilCandidatos'));
        const rawData = snap.docs.map((doc) => doc.data());
        const perfilesValidos = rawData.filter(
          (p): p is PerfilCandidato => !!p && typeof p.slug === 'string'
        );
        setPerfiles(perfilesValidos);
      } catch (err) {
        console.error('Error al cargar perfiles:', err);
      } finally {
        setLoading(false);
      }
    };
    cargarPerfiles();
  }, []);

  const perfilesFiltrados = skillFiltro
    ? perfiles.filter((p) => p.skills?.includes(skillFiltro))
    : perfiles;

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg animate-pulse">🌌 Cargando talentos...</p>
      </main>
    );
  }

  if (perfiles.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">📭 Aún no hay talentos registrados.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 bg-[#0f2027] text-white">
      <div id="explorar-lista" className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-[#00f0ff]">Explorar Talentos</h1>

        {/* 🧠 Lista de skills tipo botones */}
        <div className="flex flex-wrap gap-3 justify-center">
          {SKILLS_PREDEFINIDAS.map((skill) => (
            <button
              key={skill}
              onClick={() => setSkillFiltro(skill === skillFiltro ? '' : skill)}
              className={`px-4 py-2 rounded-full border ${
                skillFiltro === skill
                  ? 'bg-[#00f0ff] text-black font-bold'
                  : 'border-[#00f0ff] text-[#00f0ff]'
              } transition`}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* 📊 Conteo total según filtro */}
        <p className="text-center text-gray-300">
          Hay{' '}
          <span className="text-[#00f0ff] font-semibold">
            {perfilesFiltrados.length}
          </span>{' '}
          talento{perfilesFiltrados.length !== 1 ? 's' : ''}{' '}
          {skillFiltro ? `con la skill "${skillFiltro}"` : 'registrado'}.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perfilesFiltrados.map((p, i) => (
            <Link
              href={`/explorar/${encodeURIComponent(p.slug)}`}
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
                  {p.bio?.slice(0, 120) ?? ''}{p.bio.length > 120 ? '...' : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}