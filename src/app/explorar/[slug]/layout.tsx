import Link from 'next/link'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#0f0f0f] text-[#e0f7ff]">
      {/* 🧭 Sidebar */}
      <aside className="w-64 bg-[#111827] p-6 border-r border-[#00f0ff] flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#00f0ff] mb-6">🎯 Talento Conectado</h1>
          <nav className="space-y-4">
            <Link
              href="/explorar"
              className="block text-[#1e90ff] hover:text-[#00f0ff] transition font-medium"
            >
              ← Volver a explorar
            </Link>
            <Link
              href="/dashboard"
              className="block text-[#1e90ff] hover:text-[#00f0ff] transition font-medium"
            >
              📊 Ir al dashboard
            </Link>
            <Link
              href="/perfil"
              className="block text-[#1e90ff] hover:text-[#00f0ff] transition font-medium"
            >
              👤 Editar mi perfil
            </Link>
          </nav>
        </div>

        <footer className="text-sm text-[#555] mt-10">
          <p>© 2025 Jóvenes Conectados</p>
        </footer>
      </aside>

      {/* 📄 Main content */}
      <main className="flex-1 px-10 py-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}