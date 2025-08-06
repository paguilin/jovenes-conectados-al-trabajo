'use client';

import { useEffect } from 'react';
import { enableNetwork } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function ActivarFirestore() {
  useEffect(() => {
    enableNetwork(db)
      .then(() => console.log('🔥 Firestore reconectado'))
      .catch((e) => console.error('Error al reconectar:', e));
  }, []);

  return null; 
}