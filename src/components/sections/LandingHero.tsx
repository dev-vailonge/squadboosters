import React from 'react';
import Link from 'next/link';

const LandingHero = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <span className="text-2xl font-bold">SquadBoosters</span>
          <div className="hidden md:flex space-x-6">
            <Link href="#recursos" className="text-gray-300 hover:text-white transition-colors">
              Recursos
            </Link>
            <Link href="#como-funciona" className="text-gray-300 hover:text-white transition-colors">
              Como funciona
            </Link>
            <Link href="#planos" className="text-gray-300 hover:text-white transition-colors">
              Planos
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            href="/login" 
            className="px-4 py-2 border border-gray-600 rounded-lg hover:border-white transition-colors"
          >
            Fazer login
          </Link>
          <Link 
            href="/signup" 
            className="px-4 py-2 bg-[#FFD600] text-black rounded-lg hover:bg-yellow-400 transition-colors font-bold"
          >
            Criar conta
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Agentes de Programação para dar um boost em seu aprendizado.
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Tenha agentes de IA especialistas em Mobile, Web, Ciência da Computação, Recrutamento Tech e muito mais.
          </p>
          <Link 
            href="/signup" 
            className="inline-block px-8 py-4 bg-[#FFD600] text-black rounded-lg text-lg font-bold hover:bg-yellow-400 transition-colors"
          >
            Começar agora
          </Link>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center p-8">
          <img 
            src="/images/dashboard-preview.png" 
            alt="Dashboard preview" 
            className="rounded-2xl shadow-2xl border border-gray-800 max-w-full h-auto bg-black"
            style={{ boxShadow: '0 16px 64px 0 rgba(0,0,0,0.55), 0 8px 40px 0 rgba(255, 214, 0, 0.18)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingHero; 