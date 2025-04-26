const steps = [
  {
    title: 'Encontre seu especialista',
  },
  {
    title: 'Pergunte o que quiser',
  },
  {
    title: 'Tenha planos práticos',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 relative bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Como funciona?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Em apenas 3 passos simples você terá um plano de estudo prático para aprender com os melhores.
          </p>
        </div>
        <div className="relative flex flex-col items-center">
          {/* Horizontal yellow line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-[#FFD600] z-0" style={{transform: 'translateY(-50%)'}} />
          <div className="w-full flex flex-row justify-between items-center z-10">
            {steps.map((step, idx) => (
              <div key={step.title} className="flex flex-col items-center w-1/3">
                {/* Number */}
                <div className="text-4xl font-extrabold text-white mb-4">{idx + 1}</div>
                {/* Dot */}
                <div className="w-6 h-6 rounded-full bg-[#FFD600] border-4 border-black z-10 mb-4" style={{marginTop: '-12px'}} />
                {/* Step title */}
                <div className="mt-2 text-center">
                  <h3 className="text-2xl font-extrabold text-white leading-tight">{step.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 