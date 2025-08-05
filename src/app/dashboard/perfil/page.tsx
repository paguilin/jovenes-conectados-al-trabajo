'use client';

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { crearOActualizarPerfil, subirAvatar } from '@/firebase/perfil';
import { subirCV } from '@/firebase/subirCV';
import { subirGaleria } from '@/firebase/subirGaleria';

export default function PerfilCandidato() {
  const [nombre, setNombre] = useState('');
  const [bio, setBio] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [galeriaGuardada, setGaleriaGuardada] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [nuevoSkill, setNuevoSkill] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const usuario = auth.currentUser;
        if (!usuario) return;

        if (!navigator.onLine) {
          toast.error('Estás sin conexión. Intenta cuando vuelvas a estar en línea.');
          return;
        }

        const perfilRef = doc(db, 'perfilCandidatos', usuario.uid);
        const perfilSnap = await getDoc(perfilRef);

        if (perfilSnap.exists()) {
          const data = perfilSnap.data();
          setNombre(data.nombre || '');
          setBio(data.bio || '');
          setVideoUrl(data.videoUrl || '');
          setAvatarUrl(data.avatarUrl || '');
          setSkills(data.skills || []);
          setUltimaActualizacion(data.actualizadoEn?.toDate?.() || null);
          setGaleriaGuardada(data.galeria || []);
        }
      } catch (err: any) {
        console.error('Error al cargar datos del perfil:', err.message);
        toast.error(`Error: ${err.message}`);
      }
    };

    cargarDatos();
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarFile(file);
  };

  const handleEliminarImagenGuardada = async (index: number) => {
  try {
    const usuario = auth.currentUser;
    if (!usuario) return;
    const email = usuario.email ?? usuario.uid;

    const nuevaGaleria = galeriaGuardada.filter((_, i) => i !== index);

    const perfilRef = doc(db, 'perfilCandidatos', usuario.uid);
    await crearOActualizarPerfil(email, { galeria: nuevaGaleria }, );

    setGaleriaGuardada(nuevaGaleria);
    toast.success('🗑️ Imagen eliminada de la galería');
  } catch (error: any) {
    console.error('Error al eliminar imagen:', error.message);
    toast.error(`❌ ${error.message}`);
  }
};



  const handleRemoveSkill = (i: number) => {
    setSkills((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async () => {
    try {
      const usuario = auth.currentUser;
      if (!usuario) throw new Error('Usuario no autenticado');

      const email = usuario.email ?? usuario.uid;

      let nuevaAvatarUrl: string | undefined;
      if (avatarFile) {
        nuevaAvatarUrl = await subirAvatar(email, avatarFile);
        toast.success('🖼️ Avatar subido correctamente');
        setAvatarUrl(nuevaAvatarUrl);
      }

      let urlCV = '';
      if (cv) {
        urlCV = await subirCV(email, cv);
        toast.success('📄 CV subido correctamente');
      }

      let galeria: string[] = [];
      if (imagenes.length > 0) {
        galeria = await subirGaleria(email, imagenes);
        toast.success('🖼️ Imágenes subidas correctamente');
      }

      const perfilActualizado = {
        nombre,
        bio,
        avatarUrl: nuevaAvatarUrl || avatarUrl,
        videoUrl,
        skills,
        cvUrl: urlCV || '',
        galeria,
        actualizadoEn: new Date(),
      };

      await crearOActualizarPerfil(email, perfilActualizado);
      setUltimaActualizacion(new Date());
      toast.success('🎉 Perfil actualizado');
    } catch (err: any) {
      console.error('Error al guardar el perfil:', err.message);
      toast.error(`❌ ${err.message}`);
    }
  };

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
          {/* Nombre */}
          <div className="input-group">
            <label className="block text-lg font-bold text-[#00f0ff] mb-2">🧑‍💼 Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-[#1c1f26] text-white p-3 rounded-md border border-[#00bcd4] focus:outline-none focus:ring-2 focus:ring-[#00f0ff]"
              placeholder="Tu nombre completo"
            />
          </div>

          {/* Biografía */}
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

          {/* Avatar */}
          <div className="input-group">
            <label>🖼️ Subir Avatar</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Avatar actual"
                className="mt-3 h-24 w-24 object-cover rounded-full border border-[#00f0ff]"
              />
            )}
          </div>

          {/* Habilidades */}
          <div className="input-group">
            <label className="block text-lg font-bold text-[#00f0ff] mb-2">🛠️ Tus habilidades</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#00f0ff] text-black rounded-full text-sm font-semibold flex items-center"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(i)}
                    className="ml-2 text-black hover:text-red-600"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={nuevoSkill}
              onChange={(e) => setNuevoSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && nuevoSkill.trim()) {
                  e.preventDefault();
                                    setSkills((prev) => [...prev, nuevoSkill.trim()]);
                  setNuevoSkill('');
                }
              }}
              placeholder="Ej: Firebase, Next.js, Git"
              className="w-full bg-[#1c1f26] text-white p-3 rounded-md border border-[#00bcd4] focus:outline-none focus:ring-2 focus:ring-[#00f0ff]"
            />
          </div>

          {/* CV */}
          <div className="input-group">
            <label>📄 Subir CV (PDF)</label>
            <input type="file" accept=".pdf" onChange={handleUploadCV} />
          </div>

          {/* Imágenes nuevas */}
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
                  alt={`Imagen ${i + 1}`}
                  className="w-full h-32 object-cover rounded-md border border-[#00f0ff]"
                />
              ))}
            </div>
          )}

          {/* Imágenes ya guardadas */}
          {galeriaGuardada.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-6">
              {galeriaGuardada.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Imagen guardada ${i + 1}`}
                  className="w-full h-32 object-cover rounded-md border border-[#00f0ff]"
                />
              ))}
            </div>
          )}

          {/* Botón de guardar */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#00f0ff] text-black font-bold py-3 px-6 rounded-xl shadow-md hover:bg-[#00d8e0] transition-all duration-300 text-lg"
          >
            💾 Guardar perfil
          </button>
        </div>
      </motion.div>
    </main>
  );
}