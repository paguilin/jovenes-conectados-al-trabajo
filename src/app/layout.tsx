import './globals.css'
import SessionWrapper from '../components/SessionWrapper' // ajusta la ruta si usas otro directorio

export const metadata = {
  title: 'Jóvenes Conectados al Trabajo',
  description: 'Impulsando talento joven hacia nuevas oportunidades laborales.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  )
}