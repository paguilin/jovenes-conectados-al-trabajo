'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { obtenerFotoPerfil, guardarFotoPerfil } from '../../firebase/perfil';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase/config';
import { enableNetwork, clearIndexedDbPersistence, doc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AvatarUpload from '@/components/AvatarUpload';
;

type PerfilCandidato = {
  bio: string;
  videoUrl: string;
  cvUrl: string;
  imagenes: string[];
  galeria?: string[];
  skills?: string[];
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const email = session?.user?.email ?? '';

  const [fotoUrl, setFotoUrl] = useState('');
  const [perfil, setPerfil] = useState<PerfilCandidato | null>(null);
  const [progreso, setProgreso] = useState(0);
  const [faltantes, setFaltantes] = useState<string[]>([]);
  const [subiendo, setSubiendo] = useState(false);
  const [archivos, setArchivos] = useState<{ url: string; tipo: string }[]>([]);
  const [galeriaGuardada, setGaleriaGuardada] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status, router]);

  useEffect(() => {
    if (!email) return;

    (async () => {
      try {
        await clearIndexedDbPersistence(db);
        await enableNetwork(db);
        console.log('✅ Firestore reconectado');

        const url = await obtenerFotoPerfil(email);
        if (url) setFotoUrl(url);

        const ref = doc(db, 'perfilCandidatos', email);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          console.warn('Perfil no encontrado para:', email);
          return;
        }

        const data = snap.data() as PerfilCandidato;
        setPerfil(data);
        setGaleriaGuardada(data.galeria || []);

        const camposClave: { campo: string; valor: any }[] = [
          { campo: 'bio', valor: data.bio },
          { campo: 'videoUrl', valor: data.videoUrl },
          { campo: 'cvUrl', valor: data.cvUrl },
          { campo: 'imagenes', valor: data.imagenes },
          { campo: 'galeria', valor: data.galeria },
          { campo: 'skills', valor: data.skills },
          { campo: 'avatarUrl', valor: fotoUrl },
        ];

        let completos = 0;
        const faltanCampos: string[] = [];

        camposClave.forEach(({ campo, valor }) => {
          const ok =
            Array.isArray(valor) ? valor.length > 0 :
            typeof valor === 'string' ? valor.trim().length > 0 :
            false;
          ok ? completos++ : faltanCampos.push(campo);
        });

        setProgreso(Math.round((completos / camposClave.length) * 100));
        setFaltantes(faltanCampos);
      } catch (error: any) {
        console.error('❌ Error al obtener datos del perfil:', error?.message || error);
        toast.error('Firestore está desconectado. Revisa tu red o recarga 🔌');
      }
    })();
  }, [email]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!email) return toast.error('Sin sesión activa');
    const file = e.target.files?.[0];
    if (!file) return toast.error('Selecciona un archivo');

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const tiposPermitidos = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'];
    if (!tiposPermitidos.includes(ext)) {
      return toast.error('Tipo de archivo no permitido');
    }

    setSubiendo(true);
    try {
      const path = `archivos/${email}/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setArchivos((prev) => [...prev, { url, tipo: ext }]);

      if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) {
        await guardarFotoPerfil(email, url);
        setFotoUrl(url);
        toast.success('Foto de perfil actualizada');
      } else {
        toast.success('Archivo cargado');
      }
    } catch (error: unknown) {
      toast.error(`Error al subir el archivo: ${(error as Error).message}`);
    } finally {
      setSubiendo(false);
    }
  };

  if (status === 'loading') {
    return (
      <main className="dashboard-main flex items-center justify-center">
        <p className="text-white text-lg animate-pulse">Cargando tu panel…</p>
      </main>
    );
  }

  return (
    <main className="dashboard-main flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md dashboard-panel space-y-8 text-white"
      >
        {/* Avatar y uploader */}
        <div className="flex flex-col items-center space-y-3 relative">
          <div className="absolute w-28 h-28 rounded-full bg-[#00f0ff22] blur-2xl -z-10"></div>
          <Image
            src={fotoUrl || session?.user?.image || '/default-avatar.png'}
            alt="Avatar"
            width={80}
            height={80}
            className="rounded-full border-4 border-[#00f0ff] shadow-md object-cover"
          />
          <h2 className="text-lg font-bold text-center">{session?.user?.name ?? 'Usuario'}</h2>
          <p className="text-sm text-[#00f0ff] text-center">{email}</p>

          <div className="w-full mt-4 space-y-2 text-center">
            <label className="text-sm font-medium text-[#00f0ff]">📸 Sube tu foto de perfil</label>
            <AvatarUpload />
          </div>
        </div>

        {/* Progreso del perfil */}
        {perfil && (
          <div className="space-y-2">
            <label className="text-sm font-medium">🎯 Avance del perfil</label>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progreso}%` }}></div>
            </div>
            <p className="text-xs text-gray-400">
              {progreso}% completado
              {faltantes.length > 0 && (
                <span className="text-red-400"> (Faltan: {faltantes.join(', ')})</span>
              )}
            </p>
          </div>
        )}

        {/* Upload de archivo general */}
        <div className="input-group mt-6">
          <label className="text-sm font-medium block mb-1">📤 Subir imagen o PDF</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleUpload}
            disabled={subiendo}
            className="file-input"
          />
          <p className="text-xs text-gray-400 mt-1">
            {subiendo
              ? '⏳ Subiendo archivo…'
              : archivos.length > 0
              ? `${archivos.length} archivo(s) cargado(s)`
              : 'No hay archivos aún'}
          </p>
        </div>

        {/* Vista de archivos */}
        {archivos.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">📁 Archivos cargados</label>
            <div className="grid grid-cols-2 gap-4">
              {archivos.map((file, i) => (
                <div key={i} className="rounded-md bg-[#1e2633] p-2 flex flex-col items-center">
                  {['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(file.tipo) ? (
                    <Image
                      src={file.url}
                      alt={`Imagen ${i + 1}`}
                      width={128}
                      height={128}
                      className="rounded-md border border-[#00f0ff] shadow-sm object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[#00f0ff] text-2xl">📄</span>
                                            <span className="text-xs text-white mt-2">Documento #{i + 1}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Acciones */}
        <button onClick={() => signOut({ callbackUrl: '/' })} className="logout-btn">
          🚪 Cerrar sesión
        </button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push(`/perfil/${email}`)}
          className="w-full py-3 rounded-md bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#00c6ff] text-black font-semibold shadow-md hover:brightness-125 transition duration-300 text-center"
        >
          🚀 Explorar perfil como visitante
        </motion.button>

        <button onClick={() => router.push('/dashboard/perfil')} className="editar-perfil-btn">
          💫 Editar Perfil
        </button>
      </motion.div>
    </main>
  );
}