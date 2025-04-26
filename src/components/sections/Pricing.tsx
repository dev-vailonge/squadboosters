'use client'

import { Check } from 'lucide-react'
import { useStripeCheckout } from '@/hooks/useStripeCheckout'
import { toast } from 'sonner'
import { useState } from 'react'

const tiers = [
  {
    name: 'Assistente',
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTUP_PRICE_ID,
    priceMonthly: 29,
    description: 'Perfeito para começar a aprender com IA',
    features: [
      'Pague por assistente',
      'IA Básica',
      'Geração de planos de estudo',
      'Geração de exercícios',
    ],
  },
  {
    name: 'Agentes',
    priceId: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID,
    priceMonthly: 99,
    description: 'Utilize todo potencial de nossos agentes treinados',
    features: [
      'Tudo do plano Assistente',
      'IA Avançada',
      'Pague por agente',
      'Treine seu próprio agente',
      'Adicione seu DNA',
      'Adicione memórias',
    ],
  },
]

export function Pricing() {
  const { handleCheckout } = useStripeCheckout()
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null)

  const handlePriceClick = async (priceId: string | undefined) => {
    if (!priceId) {
      toast.error('ID do plano inválido. Por favor, tente novamente.')
      return
    }

    try {
      setLoadingPlanId(priceId)
      await handleCheckout(priceId)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.')
    } finally {
      setLoadingPlanId(null)
    }
  }

  return (
    <section className="py-20 relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Planos para Todos
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Comece grátis por 7 dias. Sem necessidade de cartão de crédito.
          </p>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col hover:scale-105 transition-transform duration-300 border border-gray-800 relative`}
            >
              {tier.name === 'Startup' && (
                <div className="absolute top-0 right-0 -mt-4 bg-[#FFD600] text-black text-xs font-bold px-3 py-1 rounded-full">
                  Mais Popular
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <p className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl font-extrabold tracking-tight" style={{color: '#FFD600'}}>
                    R${tier.priceMonthly}
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-400">/mês</span>
                </p>
                <p className="mt-6 text-gray-400">{tier.description}</p>

                <ul role="list" className="mt-6 space-y-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-[#FFD600]" aria-hidden="true" />
                      <span className="ml-3 text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePriceClick(tier.priceId)}
                disabled={loadingPlanId === tier.priceId}
                className="mt-8 block w-full rounded-md py-3 px-6 text-center font-bold transition-colors duration-200
                  bg-[#FFD600] text-black hover:bg-yellow-400
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingPlanId === tier.priceId ? 'Processando...' : 'Comece agora'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 