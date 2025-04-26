'use client'

import React from 'react'
import { LogOut, Users, Settings, ChevronDown, Smartphone, UserSearch, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navItems = [
  { label: 'Agentes', icon: Users },
  { label: 'Sr Android', icon: Smartphone },
  { label: 'Tech Recruiter', icon: UserSearch },

]

const bottomItems = [
  { label: 'Configurações', icon: Settings, href: '#' },
 /**  { label: 'Documentação', icon: FileText, href: '#', external: true }, */
]

export function DashboardSidebar({ selected, onSelect, onSelectChat, selectedChat }: { selected: string, onSelect: (key: string) => void, onSelectChat: (chat: { chatId: string, chatTitle: string }) => void, selectedChat: { chatId: string, chatTitle: string } | null }) {
  // Mock chat data for Sr Android
  const srAndroidChats = [
    { id: 'chat-1', title: 'Chat 1' },
    { id: 'chat-2', title: 'Chat 2' },
    { id: 'chat-3', title: 'Chat 3' },
  ]
  const [srAndroidExpanded, setSrAndroidExpanded] = useState(selected === 'Sr Android')

  // Expand if Sr Android is selected
  useEffect(() => {
    if (selected === 'Sr Android') setSrAndroidExpanded(true)
  }, [selected])

  const handleSrAndroidClick = () => {
    setSrAndroidExpanded((prev) => !prev)
    onSelect('Sr Android')
  }

  return (
    <aside className="w-72 flex flex-col justify-between bg-[#181818] border-r border-gray-800 py-6 px-4 min-h-screen">
      <div>
        {/* Logo and name */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-[#FFD600] flex items-center justify-center font-bold text-black text-xl">S</div>
          <span className="text-xl font-bold text-white tracking-tight">SquadBoosters</span>
        </div>
        {/* Navigation */}
        <nav className="space-y-1 mb-8">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.label === 'Sr Android' ? (
                <>
                  <button
                    onClick={handleSrAndroidClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors text-left ${
                      selected === item.label
                        ? 'bg-[#FFD600] text-black'
                        : 'text-white hover:bg-[#FFD600] hover:text-black'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${selected === item.label ? 'text-black' : 'text-gray-400'}`} />
                    <span className="flex-1">{item.label}</span>
                    {srAndroidExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {/* If Sr Android and has chats, show chat list if expanded */}
                  {srAndroidChats.length > 0 && srAndroidExpanded && (
                    <div className="ml-8 mt-1 space-y-1">
                      {srAndroidChats.slice(0, 5).map((chat) => (
                        <button
                          key={chat.id}
                          onClick={() => onSelectChat({ chatId: chat.id, chatTitle: chat.title })}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            selectedChat && selectedChat.chatId === chat.id ? 'bg-[#FFD600] text-black' : 'text-gray-300 hover:bg-[#FFD600] hover:text-black'
                          }`}
                        >
                          {chat.title}
                        </button>
                      ))}
                      <button
                        onClick={() => onSelectChat({ chatId: 'new', chatTitle: 'Novo chat' })}
                        className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-[#FFD600] hover:bg-[#FFD600] hover:text-black transition-colors"
                      >
                        + Novo chat
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => onSelect(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors text-left ${
                    selected === item.label
                      ? 'bg-[#FFD600] text-black'
                      : 'text-white hover:bg-[#FFD600] hover:text-black'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${selected === item.label ? 'text-black' : 'text-gray-400'}`} />
                  <span className="flex-1">{item.label}</span>
                  
                </button>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="space-y-1 mb-4">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-400 hover:text-black hover:bg-[#FFD600] transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1">{item.label}</span>
          </Link>
        ))}
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-400 hover:text-black hover:bg-[#FFD600] transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="flex-1">Sair</span>
        </Link>
      </div>
    </aside>
  )
} 