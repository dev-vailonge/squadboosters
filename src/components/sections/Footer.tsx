import Link from 'next/link'

const navigation = {
  legal: [
    { name: 'Privacidade', href: '#' },
    { name: 'Termos', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-[#FFD600]/20 bg-black" aria-labelledby="footer-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFD600]/10 pointer-events-none"></div>
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 relative z-10">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-white text-2xl font-bold">
              SquadBoosters
            </Link>
            <p className="text-gray-400 text-base">
              Escale negócios com automação inteligente de IA.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-bold text-white tracking-wider uppercase">Legal</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-[#FFD600] transition-colors">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-[#FFD600]/20 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} SquadBoosters. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
} 