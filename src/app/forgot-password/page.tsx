'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setSubmitted(true)
      toast.success('Email de recuperação enviado! Verifique sua caixa de entrada.')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Erro ao enviar o email de recuperação. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-md mx-auto pt-16 p-6">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">Verifique seu Email</h1>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-gray-900 mb-4">
              Enviamos instruções de recuperação para <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-400">
              Siga as instruções no email para redefinir sua senha.
            </p>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Não recebeu o email?{' '}
              <button
                onClick={() => setSubmitted(false)}
                className="text-yellow-500 hover:text-yellow-400 hover:underline font-medium"
              >
                Tentar novamente
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto pt-16 p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Recuperar Senha</h1>
        
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-gray-400 text-center">
              Digite seu email e enviaremos instruções para redefinir sua senha.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Endereço de Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Seu endereço de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-gray-900 text-white placeholder:text-gray-500 border-gray-700 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD600] text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Instruções'}
            </button>
          </form>

          <div className="space-y-3 text-center text-sm">
            <Link href="/login" className="block text-yellow-400 hover:text-yellow-300 hover:underline">
              Voltar para login
            </Link>
            <Link href="/magic-link" className="block text-yellow-400 hover:text-yellow-300 hover:underline">
              Entrar com link mágico
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 