import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Image from 'next/image';

interface PerfilData {
  bio: string;
  videoUrl?: string;
  cvUrl?: string;
  imagenes?: string[];
  avatarUrl?: string;
  actualizadoEn?: { seconds: number; nanoseconds: number };
  slug: string;
  email: string;
  nombre?: string;
}

export default async function PerfilPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const q = query(collection(db, 'perfilCandidatos'), where('slug', '==', slug));
  const docs = await getDocs(q);

  if (docs.empty) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        <p className="text-xl">❌ Perfil no encontrado</p>
      </main>
    );
  }

  const perfil = docs.docs[0].data() as PerfilData;

  const totalCampos = 3;
  const completados = [perfil.bio, perfil.videoUrl, perfil.cvUrl].filter(Boolean).length;
  const progreso = Math.round((completados / totalCampos) * 100);

  if (!perfil.bio || !perfil.cvUrl) {
    return (
      <main className="min-h-screen bg-gradient-to-tr from-[#1e1e1e] via-[#202630] to-[#0f0c29] text-white flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold">⚠️ Este perfil aún no está listo para mostrar</p>
          <p className="text-sm text-gray-400">Se necesita biografía y CV para mostrarlo públicamente.</p>
        </div>
      </main>
    );
  }

  const embedVideo = perfil.videoUrl?.includes('youtube.com') || perfil.videoUrl?.includes('youtu.be');

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">🧑‍💼 Perfil profesional de {perfil.nombre || perfil.email}</h1>

        {perfil.avatarUrl && (
          <div className="flex justify-center">
            <Image
              src={perfil.avatarUrl}
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full border border-[#00f0ff] shadow-lg object-cover"
            />
          </div>
        )}

        <div>
          <p className="font-semibold text-[#00f0ff] mb-1">📝 Biografía</p>
          <p>{perfil.bio}</p>
        </div>

        {embedVideo && (
          <div>
            <p className="font-semibold text-[#00f0ff] mb-1">🎥 Video presentación</p>
            <div className="aspect-video w-full overflow-hidden">
              <iframe
                src={perfil.videoUrl?.replace('watch?v=', 'embed/')}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {perfil.cvUrl && (
          <div>
            <p className="font-semibold text-[#00f0ff] mb-1">📄 CV</p>
            <a
              href={perfil.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 underline"
            >
              Descargar CV
            </a>
          </div>
        )}

        <div>
          <p className="font-semibold text-[#00f0ff] mb-2">📶 Perfil completado: {progreso}%</p>
          <div className="w-full bg-gray-700 rounded h-2">
            <div className="bg-green-400 h-2 rounded" style={{ width: `${progreso}%` }}></div>
          </div>
        </div>

        {perfil.imagenes && perfil.imagenes.length > 0 && (
          <div>
            <p className="font-semibold text-[#00f0ff] mb-2">🖼️ Imágenes de proyectos</p>
            <div className="grid grid-cols-2 gap-4">
              {perfil.imagenes.map((imgUrl, idx) => (
                <Image
                  key={idx}
                  src={imgUrl}
                  alt={`Imagen ${idx}`}
                  width={300}
                  height={200}
                  className="rounded border border-[#00f0ff] object-cover"
                />
              ))}
            </div>
          </div>
        )}

        {perfil.actualizadoEn && (
          <p className="text-sm text-gray-400 mt-4">
            Última edición:{' '}
            {new Date(perfil.actualizadoEn.seconds * 1000).toLocaleDateString('es-MX', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
    </main>
  );
}