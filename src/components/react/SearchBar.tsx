import React from 'react'
import { useStore } from '@nanostores/react'
import { Search, X } from 'lucide-react'
import { $isSearchOpen, $searchQuery } from '../../stores/cartStore'

export default function SearchBar() {
  const isSearchOpen = useStore($isSearchOpen)
  const searchQuery = useStore($searchQuery)

  if (!isSearchOpen) return null

  return (
    <div className="w-full glassmorphism border-b border-white/20 py-5 px-4 sm:px-6 soft-shadow-md transition-all duration-300 animate-fade-up">
      <div className="max-w-4xl mx-auto flex items-center justify-between space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por marca, ingrediente o tipo de piel..."
            value={searchQuery}
            onChange={(e) => $searchQuery.set(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-glowy-pink-soft/50 focus:border-glowy-pink-soft/30 text-sm bg-white/80 placeholder:text-slate-400 soft-shadow-sm transition-all"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => $searchQuery.set('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          onClick={() => {
            $isSearchOpen.set(false)
            $searchQuery.set('')
          }}
          className="text-slate-500 hover:text-glowy-pink-deep text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
