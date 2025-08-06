import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const mockUsers = [
  { id: '1', name: 'Admin', username: 'admin', email: 'admin@example.com', password: '1234' },
  { id: '2', name: 'Test', username: 'testuser', email: 'test@example.com', password: '5678' },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Correo o usuario', type: 'text' },
        password:   { label: 'Contraseña',        type: 'password' },
      },
      async authorize(credentials) {
        console.log('🔐 Autorize ejecutado con:', credentials?.identifier);
        const { identifier, password } = credentials ?? {};

        const user = mockUsers.find(
          (u) =>
            (u.email === identifier || u.username === identifier) &&
            u.password === password
        );

        if (user) {
          console.log('✅ Usuario autenticado:', user.email);
          return { id: user.id, name: user.name, email: user.email };
        }

        console.warn('❌ Credenciales inválidas para:', identifier);
        return null; // 👈 esto activa CredentialsSignin en el frontend
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login', // 👈 para que no redirija a /api/auth/error
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
      session.user = {
        ...session.user,
        id:    typeof token.id    === 'string' ? token.id    : '',
        name:  typeof token.name  === 'string' ? token.name  : '',
        email: typeof token.email === 'string' ? token.email : '',
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };