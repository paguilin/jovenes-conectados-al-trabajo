'use client'

import { useState } from 'react'

export default function RecuperarPage() {
  const [email, setEmail] = useState('')

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Solicitando recuperación para:', email)
    // Aquí podrías conectar con Firebase Auth o tu backend para enviar el correo de recuperación 🔐📧
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRecover}>
        <h2>Recupera tu contraseña</h2>
        <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Enviar enlace</button>

        <a href="/login" style={{ marginTop: '1rem', display: 'block', color: '#00bcd4', textAlign: 'center' }}>
          Volver al inicio de sesión
        </a>
      </form>
    </div>
  )
}