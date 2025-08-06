import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { FirebaseOptions } from 'firebase/app';

// 🔧 Configuración de Firebase con tus datos reales
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBX3P_H9A-iYbriR4Ma7-y3WaLNhSKj3_0',
  authDomain: 'jovenes-conectados-al-trabajo.firebaseapp.com',
  projectId: 'jovenes-conectados-al-trabajo',
  storageBucket: 'jovenes-conectados-al-trabajo.appspot.com',
  messagingSenderId: '449609958507',
  appId: '1:449609958507:web:7d87a016a233559fb41d2e',
};

// 🧠 Evita inicializar Firebase más de una vez
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// 🧪 Usuario mock para pruebas
const mockAdmin = {
  id: 'admin',
  name: 'Admin',
  username: 'admin',
  email: 'admin@example.com',
  password: '1234',
};

// 🔍 Obtener usuarios desde Firestore
async function fetchUsersFromFirestore() {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map(doc => doc.data());
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Correo o usuario', type: 'text' },
        password:   { label: 'Contraseña',        type: 'password' },
      },
      async authorize(credentials) {
        const { identifier, password } = credentials ?? {};
        console.log('🔐 Autorize ejecutado con:', identifier);

        const firestoreUsers = await fetchUsersFromFirestore();
        const allUsers = [...firestoreUsers, mockAdmin];

        const user = allUsers.find(
          (u) =>
            (u.email === identifier || u.username === identifier) &&
            u.password === password
        );

        if (user) {
          console.log('✅ Usuario autenticado:', user.email);
          return {
            id: user.id ?? '',
            name: user.name ?? '',
            email: user.email ?? '',
          };
        }

        console.warn('❌ Credenciales inválidas para:', identifier);
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error:  '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id    = user.id ?? '';
        token.name  = user.name ?? '';
        token.email = user.email ?? '';
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).id = token.id ?? '';
      return session;
    },
  },
  secret: 'tu-mama-en-cuatro',
});

export { handler as GET, handler as POST };