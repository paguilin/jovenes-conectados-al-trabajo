'use client';

import { signIn } from 'next-auth/react';
import { useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// 👉 Extraemos el contenido en un subcomponente para poder usar Suspense
function LoginForm() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      identifier,
      password,
      callbackUrl: '/dashboard',
    });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* Logo centrado */}
      <div className="flex flex-col items-center mb-4">
        <Image
          src="/logo-empleo.jpeg"
          alt="Jóvenes conectados al trabajo"
          width={80}
          height={80}
          className="rounded-full"
          style={{ display: 'block', margin: '0 auto' }}
        />
        <p className="text-[#00f0ff] font-semibold text-center text-sm md:text-base mt-2">
          Jóvenes conectados al trabajo
        </p>
      </div>

      <h2>Bienvenido de nuevo</h2>

      {error === 'CredentialsSignin' && (
        <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>
          Credenciales incorrectas. Inténtalo de nuevo.
        </p>
      )}

      <input
        type="text"
        placeholder="Correo o nombre de usuario"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Ingresar</button>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link href="/recuperar" className="text-[#00bcd4] hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <hr className="my-4 border-t border-gray-300 opacity-30" />

      <div className="mt-8 text-center text-sm">
        ¿No tienes cuenta?{' '}
        <Link href="/registro" className="text-blue-500 font-semibold hover:underline">
          Regístrate aquí
        </Link>
      </div>
    </form>
  );
}

// 👉 Componente principal con Suspense
export default function LoginPage() {
  return (
    <div className="login-container">
      <Suspense fallback={<p>Cargando formulario...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}