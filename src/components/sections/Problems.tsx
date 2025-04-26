import { UserX, Code2, MessageCircle } from 'lucide-react'

const features = [
  {
    name: 'Aprendizado Lento e Solitário',
    description:
      'Estudar programação sozinho pode ser desmotivador e demorado. Nossos agentes de IA atuam como mentores, guiando você passo a passo e respondendo dúvidas em tempo real.',
    icon: UserX,
  },
  {
    name: 'Dificuldade em Praticar com Projetos Reais',
    description:
      'Falta de orientação prática? Os agentes simulam situações reais de trabalho, revisam seu código e sugerem melhorias como um engenheiro sênior faria.',
    icon: Code2,
  },
  {
    name: 'Falta de Feedback Personalizado',
    description:
      'Tutoriais genéricos não atendem suas necessidades? Os agentes de IA adaptam o ensino ao seu ritmo e objetivos, oferecendo feedback personalizado para acelerar seu progresso.',
    icon: MessageCircle,
  },
]

export function Problems() {
  return (
    <section className="py-20 relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-bold tracking-wide uppercase text-white">Desafios Comuns</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Aprenda com os Melhores, Sempre
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Nossos agentes de IA são mentores especialistas em Mobile, Web, Ciência da Computação e Recrutamento Tech, prontos para ensinar, revisar e acelerar seu aprendizado prático em tecnologia.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="bg-gray-900 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-gray-800">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <feature.icon className="h-8 w-8 text-[#FFD600]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-4">{feature.name}</h3>
                  <p className="text-base text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 