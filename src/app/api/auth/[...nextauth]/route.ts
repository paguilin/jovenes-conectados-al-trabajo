import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Simulación básica (puedes reemplazar por tu lógica real o conexión a DB)
const mockUsers = [
  { id: '1', name: 'Admin', username: 'admin', email: 'admin@example.com', password: '1234' },
  { id: '2', name: 'Test', username: 'testuser', email: 'test@example.com', password: '5678' },
]

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Correo o usuario', type: 'text' },
        password:   { label: 'Contraseña',        type: 'password' },
      },
      async authorize(credentials) {
        const { identifier, password } = credentials ?? {}
        const user = mockUsers.find(
          (u) =>
            (u.email === identifier || u.username === identifier) &&
            u.password === password
        )
        if (user) {
          return { id: user.id, name: user.name, email: user.email }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
   if (user) {
  token.id    = user.id ?? ''
  token.name  = user.name ?? ''
  token.email = user.email ?? ''
}
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        // preserva posibles campos legacy y luego sobreescribe
        ...session.user,
        id:    typeof token.id    === 'string' ? token.id    : '',
        name:  typeof token.name  === 'string' ? token.name  : '',
        email: typeof token.email === 'string' ? token.email : '',
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }