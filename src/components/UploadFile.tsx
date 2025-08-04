import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, storage } from '../firebase/config';
import { FirebaseError } from 'firebase/app'; // 👈 Importación para tipar bien el error

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [tipo, setTipo] = useState('Currículum');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !auth.currentUser) {
      alert('Selecciona un archivo y asegúrate de estar logueadx.');
      return;
    }

    if (!navigator.onLine) {
      alert('⚠️ Tu dispositivo parece estar sin conexión.');
      return;
    }

    const email = auth.currentUser.email!;
    const rutaStorage = `archivos/${email}/${file.name}`;
    const fileRef = ref(storage, rutaStorage);

    try {
      setLoading(true);

      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);

      const docRef = collection(db, `PerfilUsuarios/${email}/documentos`);
      await addDoc(docRef, {
        nombre: file.name,
        tipo,
        url,
        fechaSubida: serverTimestamp(),
      });

      alert('✅ Archivo subido y registrado con éxito');
      setFile(null);
    } catch (error: unknown) {
      console.error('❌ Error durante el proceso:', error);

      if (error instanceof FirebaseError) {
        alert(`⚠️ Ocurrió un problema: ${error.message}`);
      } else {
        alert('⚠️ Ocurrió un problema inesperado. Intenta más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <h3>📁 Subir documento</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        style={{ marginTop: '0.5rem' }}
      >
        <option value="Currículum">Currículum</option>
        <option value="Carta">Carta de presentación</option>
        <option value="Certificado">Certificado</option>
      </select>

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        style={{ marginTop: '0.5rem' }}
      >
        {loading ? 'Subiendo...' : 'Subir y guardar'}
      </button>
    </div>
  );
}