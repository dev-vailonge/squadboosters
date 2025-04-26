'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PasswordInput } from '@/components/PasswordInput'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: ''
  })

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      form: ''
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        if (error.message === 'Email not confirmed') {
          setErrors(prev => ({
            ...prev,
            form: 'Por favor, confirme seu email antes de fazer login.'
          }))
        } else {
          setErrors(prev => ({
            ...prev,
            form: 'Email ou senha inválidos'
          }))
        }
        return
      }

      router.push('/dashboard')
    } catch (error) {
      console.error('Error:', error)
      setErrors(prev => ({
        ...prev,
        form: 'Ocorreu um erro inesperado. Por favor, tente novamente.'
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {/* Logo and name */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center font-bold text-black text-2xl">S</div>
        <span className="text-2xl font-bold text-white tracking-tight">SquadBoosters</span>
      </div>
      <div className="w-full max-w-md bg-[#181818] border border-gray-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Bem-vindo de volta</h1>
        <div className="space-y-6">
          {errors.form && (
            <div className="p-3 text-sm text-yellow-800 bg-yellow-100 rounded-lg border border-yellow-300">
              {errors.form}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Endereço de Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Seu endereço de email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-black text-white placeholder:text-gray-500 ${
                  errors.email 
                    ? 'border-yellow-500 focus:ring-yellow-500' 
                    : 'border-gray-700 focus:ring-yellow-400 focus:border-yellow-400'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-yellow-500">{errors.email}</p>
              )}
            </div>
            <PasswordInput
              id="password"
              label="Sua Senha"
              placeholder="Sua senha"
              value={formData.password}
              onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
              error={errors.password}
              className="bg-black text-white border-gray-700 focus:ring-yellow-400 focus:border-yellow-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD600] text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <div className="space-y-3 text-center text-sm">
            <Link href="/magic-link" className="block text-yellow-400 hover:text-yellow-300 hover:underline">
              Enviar email com link mágico
            </Link>
            <Link href="/forgot-password" className="block text-yellow-400 hover:text-yellow-300 hover:underline">
              Esqueceu sua senha?
            </Link>
            <Link href="/signup" className="block text-yellow-400 hover:text-yellow-300 hover:underline">
              Não tem uma conta? Cadastre-se
            </Link>
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">
            Ao continuar, eu concordo com os{' '}
            <Link href="/terms" className="text-yellow-400 hover:text-yellow-300 hover:underline">
              Termos de Serviço
            </Link>{' '}
            e{' '}
            <Link href="/privacy" className="text-yellow-400 hover:text-yellow-300 hover:underline">
              Política de Privacidade
            </Link>
          </p>
          <p className="text-center text-sm text-gray-400">
            Problemas para fazer login?{' '}
            <Link href="/help" className="text-yellow-400 hover:text-yellow-300 hover:underline">
              Clique Aqui
            </Link>{' '}
            e tente novamente.
          </p>
        </div>
      </div>
    </div>
  )
} 