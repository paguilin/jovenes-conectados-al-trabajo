'use client';

import React, { useEffect, useState } from 'react';
import { auth, storage, db } from '@/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function PerfilCandidato() {
  const [bio, setBio] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date | null>(null);

  useEffect(() => {
    (async () => {
      const usuario = auth.currentUser;
      if (!usuario) return;
      const perfilRef = doc(db, 'perfilCandidatos', usuario.uid);
      const perfilSnap = await getDoc(perfilRef);
      if (perfilSnap.exists()) {
        const data = perfilSnap.data();
        setBio(data.bio || '');
        setVideoUrl(data.videoUrl || '');
        setUltimaActualizacion(data.actualizadoEn?.toDate?.() || null);
      }
    })();
  }, []);

  const handleUploadCV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type !== 'application/pdf') {
      toast.error('El CV debe ser un archivo PDF');
      return;
    }
    setCv(file || null);
  };

  const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevosArchivos = e.target.files ? Array.from(e.target.files) : [];
    setImagenes((prev) => [...prev, ...nuevosArchivos]);
  };

  const handleSubmit = async () => {
    try {
      const usuario = auth.currentUser;
      if (!usuario) throw new Error('Usuario no autenticado');
      const uid = usuario.uid;

      const emailSlug = usuario.email?.split('@')[0] ?? uid;

      const payload: {
        bio: string;
        videoUrl: string;
        actualizadoEn: Date;
        slug: string;
        cvUrl?: string;
        imagenes?: string[];
      } = {
        bio,
        videoUrl,
        actualizadoEn: new Date(),
        slug: emailSlug,
      };

      if (cv) {
        const cvRef = ref(storage, `perfil/${uid}/cv/${Date.now()}-${cv.name}`);
        await uploadBytes(cvRef, cv);
        payload.cvUrl = await getDownloadURL(cvRef);
      }

      if (imagenes.length) {
        const urls: string[] = [];
        for (const img of imagenes) {
          const imgRef = ref(storage, `perfil/${uid}/imagenes/${Date.now()}-${img.name}`);
          await uploadBytes(imgRef, img);
          urls.push(await getDownloadURL(imgRef));
        }
        payload.imagenes = urls;
      }

      await setDoc(doc(db, 'perfilCandidatos', uid), payload, { merge: true });
      setUltimaActualizacion(new Date());
      toast.success('✅ Perfil guardado exitosamente');
    } catch (err) {
      console.error(err);
      toast.error('❌ Error al guardar el perfil');
    }
  };

  const embedVideo = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  return (
    <main className="dashboard-main min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-[#1c1f26] bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_15px_#00f0ff66] text-white space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-[#00f0ff]">Editar Perfil</h1>

        {ultimaActualizacion && (
          <p className="text-center text-sm text-gray-400">
            Última edición:{' '}
            <span className="text-gray-200 font-medium">
              {ultimaActualizacion.toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </p>
        )}

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-[#263340] border-l-4 border-[#00f0ff] shadow-md p-4 rounded-xl"
          >
            <label className="block text-lg font-bold text-[#00f0ff] mb-2">💬 Tu Biografía</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              className="w-full bg-[#1c1f26] text-white text-[1.05rem] p-4 rounded-md border border-[#00bcd4] focus:outline-none focus:ring-2 focus:ring-[#00f0ff] resize-none shadow-sm"
              placeholder="¿Quién eres, qué te apasiona, cómo impactas?"
            />
          </motion.div>

          <div className="input-group">
            <label>📄 Subir CV (PDF)</label>
            <input type="file" accept=".pdf" onChange={handleUploadCV} />
          </div>

          <div className="input-group">
            <label>🖼️ Imágenes de proyectos</label>
            <input type="file" accept="image/*" multiple onChange={handleUploadImages} />
          </div>

          {imagenes.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              {imagenes.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${i}`}
                  className="rounded border border-[#00f0ff] object-cover h-32 w-full"
                />
              ))}
            </div>
          )}

          <div className="input-group">
            <label>🎥 Enlace a video</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/..."
            />
          </div>

          {embedVideo && (
            <div className="mt-4 video-preview">
              <label className="block text-sm text-[#00f0ff] mb-1">🎬 Vista previa del video</label>
              <div className="aspect-video w-full overflow-hidden">
                <iframe
                  src={videoUrl.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-md bg-gradient-to-r from-[#00bcd4] via-[#00f0ff] to-[#00bcd4] text-black font-semibold shadow-md hover:brightness-125 transition duration-300"
        >
          ✅ Guardar Perfil
        </button>

        <a href="/dashboard" className="editar-perfil-btn">
          ⬅️ Volver al dashboard
        </a>
      </motion.div>
    </main>
  );
}