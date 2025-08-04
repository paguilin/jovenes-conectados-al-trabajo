import { useState, useEffect } from 'react';
import { subirImagenPerfil } from '../firebase/storageService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@firebase/config';
import { FirebaseError } from 'firebase/app';
import Image from 'next/image'; // ✅ Importación del componente

interface Props {
  userId: string;
}

export default function ImageUploader({ userId }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const obtenerArchivoGuardado = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'usuarios', userId));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.imagenPerfil) {
            setPhotoUrl(data.imagenPerfil);
            setFileType(data.imagenPerfil.endsWith('.pdf') ? 'pdf' : 'image');
          }
        }
      } catch (err) {
        console.error('Error al obtener archivo guardado:', err);
      }
    };

    obtenerArchivoGuardado();
  }, [userId]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);
    setError(null);
    setPhotoUrl(null);
    setFileType(null);

    try {
      const url = await subirImagenPerfil(selectedFile, userId);
      setPhotoUrl(url);
      setFileType(selectedFile.type === 'application/pdf' ? 'pdf' : 'image');
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError('Error al subir archivo');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uploader-container">
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*,.pdf"
      />
      {loading && <p>Subiendo archivo...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {photoUrl && fileType === 'image' && (
        <div>
          <p>Vista previa (imagen):</p>
          <Image
            src={photoUrl}
            alt="Vista previa"
            width={150}
            height={150}
            className="uploaded-img"
          />
        </div>
      )}
      {photoUrl && fileType === 'pdf' && (
        <div>
          <p>Archivo PDF subido:</p>
          <a href={photoUrl} target="_blank" rel="noopener noreferrer">
            Ver documento
          </a>
        </div>
      )}
    </div>
  );
}