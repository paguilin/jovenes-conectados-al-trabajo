'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, enableNetwork } from 'firebase/firestore'
import { db } from '@config'
import Image from 'next/image'
import Link from 'next/link'

type PerfilCandidato = {
  bio: string
  videoUrl: string
  slug: string
  cvUrl?: string
  imagenes?: string[]
  galeria?: string[]
}

type Props = {
  params: { slug: string }
}

export default function VistaPerfilSlugClient({ params }: Props) {
  const [perfil, setPerfil] = useState<PerfilCandidato | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        await enableNetwork(db)
        const ref = doc(db, 'perfilCandidatos', decodeURIComponent(params.slug))
        const snap = await getDoc(ref)

        if (!snap.exists()) {
          setError(`❌ No se encontró ningún perfil con el ID "${params.slug}"`)
          return
        }

        setPerfil(snap.data() as PerfilCandidato)
      } catch (err) {
        console.error('Error al cargar el perfil:', err)
        setError('❌ Error al conectar con Firestore.')
      }
    }

    fetchPerfil()
  }, [params.slug])

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 text-center">
        <p className="text-red-400 text-xl font-semibold">{error}</p>
        <Link href="/explorar" className="underline text-blue-400 hover:text-blue-300 transition">
          ← Volver a explorar talentos
        </Link>
      </main>
    )
  }

  if (!perfil) {
    return <p className="text-white text-center mt-10">⏳ Cargando perfil...</p>
  }

  return (
    <main className="min-h-screen px-6 py-10 text-white bg-[#0f2027]">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[#00f0ff] text-center">
          Perfil de {perfil.slug}
        </h1>
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

        {Array.isArray(perfil.imagenes) && perfil.imagenes.length > 0 && (
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
  )
}