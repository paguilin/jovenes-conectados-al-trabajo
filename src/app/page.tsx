'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-[#1c1f26] bg-opacity-90 backdrop-blur-md rounded-2xl shadow-[0_0_15px_#00f0ff66] p-8 text-center space-y-6"
      >
        <h1 className="text-3xl font-bold text-[#00f0ff]">🌐 Bienvenido/a</h1>
        <p className="text-lg text-gray-300">
          Esta es la plataforma de jóvenes conectados al trabajo. Inicia sesión para acceder a tu perfil y explorar oportunidades que transforman tu futuro.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              href="/login"
              className="block mx-auto bg-[#00f0ff] text-black font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-[#00e5ff] transition duration-300 text-lg text-center"
            >
              🔐 Iniciar sesión
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              href="/conocenos"
              className="block mx-auto bg-transparent border border-[#00f0ff] text-[#00f0ff] font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-[#00f0ff22] transition duration-300 text-lg text-center"
            >
              💡 Conócenos
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}