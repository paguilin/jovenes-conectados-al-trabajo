'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase/config';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  ConfirmationResult,
  signInWithPhoneNumber,
  onAuthStateChanged,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app'; // 👈 Tipado de errores

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}

export default function RegistroPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+52');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showLoginOption, setShowLoginOption] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const isVerified =
          user.emailVerified ||
          user.phoneNumber ||
          user.providerData.some(p => p.providerId === 'google.com');

        if (isVerified) {
          router.push('/dashboard');
        } else {
          setErrorMessage('Debes verificar tu correo para continuar.');
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);

      setSuccessMessage(`📩 Verificación enviada a ${userCredential.user.email}. Revisa bandeja de entrada y spam.`);
      setErrorMessage(null);
      setShowLoginOption(false);
    } catch (error: unknown) {
      setSuccessMessage(null);

      if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
        setErrorMessage('⚠️ Este correo ya está registrado.');
        setShowLoginOption(true);
      } else {
        setErrorMessage('🚫 Ocurrió un error al registrar. Intenta más tarde.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Acceso con Google:', result.user);
    } catch (error) {
      console.error('Error con Google:', error);
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: string) => { // ✅ Tipado corregido
          console.log('reCAPTCHA resuelto:', response);
        },
      });
    }
  };

  const handlePhoneLogin = async () => {
    setupRecaptcha();
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      window.confirmationResult = confirmation;
      setIsCodeSent(true);
      console.log('Código SMS enviado');
    } catch (error) {
      console.error('Error con teléfono:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const result = await window.confirmationResult.confirm(code);
      console.log('Teléfono verificado:', result.user);
    } catch (error) {
      console.error('Código incorrecto:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">Registro</h1>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleRegister}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded w-full"
        >
          Registrarse con correo
        </button>

        {successMessage && (
          <div className="text-green-700 bg-green-100 border-l-4 border-green-500 p-4 rounded">
            <p>{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="text-red-700 bg-red-100 border-l-4 border-red-500 p-4 rounded space-y-2">
            <p>{errorMessage}</p>
            {showLoginOption && (
              <button
                onClick={() => router.push('/login')}
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded w-full"
              >
                Ir a iniciar sesión
              </button>
            )}
          </div>
        )}

        <hr />

        <button
          onClick={handleGoogleSignIn}
          className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded w-full"
        >
          Acceder con Google
        </button>

        <hr />

        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="+52 1234567890"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handlePhoneLogin}
          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded w-full"
        >
          Enviar código SMS
        </button>

        {isCodeSent && (
          <div className="space-y-2">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Código SMS"
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleVerifyCode}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded w-full"
            >
              Verificar código
            </button>
          </div>
        )}
      </div>

      <div id="recaptcha-container"></div>
    </div>
  );
}