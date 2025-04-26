'use client'

import React, { useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { Lock, Brain } from 'lucide-react'

function AgentsGrid() {
  const agents = [
    {
      name: 'Senior Android Mobile',
      description: 'Android engineer with focus on Kotlin language',
      model: 'Privado',
      private: true,
    },
    {
      name: 'Cientista da computacao',
      description: 'Especialista em estrutura de dados e algoritmos',
      model: 'Privado',
      private: true,
    },
    {
      name: 'Senior Web',
      description: 'Especialista web com JavaScript, NextJs e React',
      model: 'Privado',
      private: true,
    },
    {
      name: 'Tech Recruiter',
      description: 'Especialista de contratacao tech, linkedin e cv.',
      model: 'Privado',
      private: true,
    },
  ]
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white">Agentes</h1>
          <p className="text-gray-400 text-sm mt-1">Agentes especializados para alavancar seus estudos, escolha seu agente para começar a conversar</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="bg-[#181818] border border-gray-800 rounded-xl p-6 flex flex-col justify-between min-h-[180px] shadow-sm hover:border-[#FFD600] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Brain className="w-7 h-7 text-gray-400" />
                <span className="text-lg font-bold text-white">{agent.name}</span>
              </div>
            
            </div>
            <div className="text-gray-400 text-sm mb-6">{agent.description}</div>
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Lock className="w-4 h-4" /> {agent.model}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChatPlaceholder({ agentName }: { agentName: string }) {
  const [message, setMessage] = React.useState('')
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-black">
      <div className="mb-2 text-gray-400 text-base">Você está conversando com: <span className="text-white font-semibold">{agentName}</span></div>
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">O que você gostaria de criar?</h1>
      <input
        type="text"
        placeholder="Digite seu prompt aqui..."
        className="w-full max-w-xl px-6 py-5 rounded-2xl border border-gray-800 bg-[#181818] text-white text-lg focus:outline-none focus:ring-2 focus:ring-[#FFD600] placeholder:text-gray-400 mb-6 shadow-md"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className="w-48 py-3 rounded-full bg-[#FFD600] text-black font-bold text-lg shadow-md hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!message.trim()}
        type="button"
      >
        Continuar
      </button>
    </div>
  )
}

function ChatWithMessages({ chatTitle, messages }: { chatTitle: string, messages: { id: string, sender: string, text: string }[] }) {
  const [message, setMessage] = React.useState('')
  return (
    <div className="flex flex-col h-full min-h-[70vh] bg-black">
      <div className="flex-1 overflow-y-auto px-0 sm:px-20 py-8">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">{chatTitle}</h1>
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`max-w-xl px-6 py-4 rounded-2xl ${msg.sender === 'user' ? 'bg-[#FFD600] text-black self-end' : 'bg-[#181818] text-white self-start'} shadow-md`}>
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      <form className="w-full max-w-2xl mx-auto flex gap-2 px-4 pb-8" onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="flex-1 px-6 py-4 rounded-xl border-none bg-[#181818] text-white text-base focus:outline-none focus:ring-2 focus:ring-[#FFD600] placeholder:text-gray-400 shadow-md"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          className="px-8 py-4 rounded-xl bg-[#FFD600] text-black font-bold text-lg shadow-md hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim()}
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default function DashboardLayout() {
  const [selected, setSelected] = useState('Agentes')
  const [selectedChat, setSelectedChat] = useState<{ chatId: string, chatTitle: string } | null>(null)
  const mockMessages = [
    { id: '1', sender: 'user', text: 'Olá, tudo bem?' },
    { id: '2', sender: 'agent', text: 'Olá! Como posso ajudar você hoje?' },
    { id: '3', sender: 'user', text: 'Quero aprender mais sobre Kotlin.' },
    { id: '4', sender: 'agent', text: 'Ótimo! Posso te mostrar alguns recursos e exemplos.' },
  ]

  // Handler for main menu selection
  const handleSelect = (key: string) => {
    setSelected(key)
    setSelectedChat(null) // Clear chat selection when switching main menu
  }

  // Handler for chat selection
  const handleSelectChat = (chat: { chatId: string, chatTitle: string }) => {
    setSelectedChat(chat)
  }

  let content
  if (selectedChat && selectedChat.chatId === 'new') {
    content = <ChatPlaceholder agentName="Sr Android" />
  } else if (selectedChat) {
    content = <ChatWithMessages chatTitle={selectedChat.chatTitle} messages={mockMessages} />
  } else if (selected === 'Agentes') {
    content = <AgentsGrid />
  } else if (selected === 'Sr Android') {
    content = <ChatPlaceholder agentName="Sr Android" />
  } else if (selected === 'Tech Recruiter') {
    content = <ChatPlaceholder agentName="Tech Recruiter" />
  }

  return (
    <div className="min-h-screen flex bg-black">
      <DashboardSidebar selected={selected} onSelect={handleSelect} onSelectChat={handleSelectChat} selectedChat={selectedChat} />
      <main className="flex-1 p-10 bg-black min-h-screen">{content}</main>
    </div>
  )
}