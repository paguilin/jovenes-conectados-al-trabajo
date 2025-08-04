import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// 🔐 Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBX3P_H9A-iYbriR4Ma7-y3WaLNhSKj3_0',
  authDomain: 'jovenes-conectados-al-trabajo.firebaseapp.com',
  projectId: 'jovenes-conectados-al-trabajo',
  storageBucket: 'jovenes-conectados-al-trabajo.appspot.com',
  messagingSenderId: '449609958507',
  appId: '1:449609958507:web:7d87a016233559fb41d2e',
}

// 🚀 Inicializar Firebase App
const app = initializeApp(firebaseConfig)

// 📤 Exportar servicios de Firebase como constantes
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)