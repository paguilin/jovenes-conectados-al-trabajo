import { enableNetwork } from 'firebase/firestore';
import { db } from './config';

// 🔄 Activar red para Firestore (evita modo offline)
enableNetwork(db)
  .then(() => {
    console.log('✅ Firestore reconectado');
  })
  .catch((err) => {
    console.error('❌ Error al reconectar Firestore:', err);
  });