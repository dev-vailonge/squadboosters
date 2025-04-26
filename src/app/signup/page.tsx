'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PasswordInput } from '@/components/PasswordInput'
import { supabase } from '@/lib/supabase'

export default function SignUp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    form: ''
  })

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      form: ''
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Por favor, confirme sua senha'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      router.push('/login?message=check-email')
    } catch (error) {
      console.error('Error:', error)
      setErrors(prev => ({
        ...prev,
        form: 'Ocorreu um erro durante o cadastro. Por favor, tente novamente.'
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
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Criar sua conta</h1>
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
              label="Senha"
              placeholder="Crie uma senha"
              value={formData.password}
              onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
              error={errors.password}
              className="bg-black text-white border-gray-700 focus:ring-yellow-400 focus:border-yellow-400"
            />
            <PasswordInput
              id="confirmPassword"
              label="Confirmar Senha"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={(value) => setFormData(prev => ({ ...prev, confirmPassword: value }))}
              error={errors.confirmPassword}
              className="bg-black text-white border-gray-700 focus:ring-yellow-400 focus:border-yellow-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD600] text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>
          <div className="text-center text-sm">
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300 hover:underline">
              Já tem uma conta? Entre aqui
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
            Problemas para se cadastrar?{' '}
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