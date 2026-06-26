import React, { useState } from 'react'
import { useStore } from '@nanostores/react'
import { Heart, Plus, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import { PRODUCTS, type Product } from '../../data/products'
import { $favorites, toggleFavorite, addToCart } from '../../stores/cartStore'
import { Badge } from '../ui/badge'

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'cleanse', name: 'Limpieza' },
  { id: 'treat', name: 'Tratamiento' },
  { id: 'moisturize', name: 'Hidratación' },
  { id: 'special', name: 'Especial' },
]

export default function CatalogGrid() {
  const favorites = useStore($favorites)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')

  // Filter products
  const filteredProducts = PRODUCTS.filter(prod => {
    // 1. Category Filter
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false

    // 2. Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim()
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.brand.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q) ||
        prod.tag.toLowerCase().includes(q)
      )
    }
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
    return 0 // default
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      {/* Catalog Intro Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-glowy-pink-deep">Catálogo Oficial</span>
        <h1 className="serif-title text-4xl sm:text-5xl font-light text-slate-800">
          La Colección <span className="italic font-normal bg-gradient-to-r from-glowy-pink-deep to-[#c44d8e] bg-clip-text text-transparent">GlowySkin</span>
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
          Descubre fórmulas exclusivas de las marcas más prestigiosas de Seúl, importadas para nutrir y revelar el brillo natural de tu piel.
        </p>
      </div>

      {/* Filters, Search & Sorting Controls */}
      <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm mb-10 flex flex-col gap-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-5">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Input and Sort selector */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por marca, producto o ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-glowy-pink-soft/40 focus:border-glowy-pink-soft/30 text-xs bg-slate-50/50"
            />
          </div>

          {/* Sorting Option dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />
            <span className="text-xs text-slate-500 font-medium hidden sm:block">Ordenar por:</span>
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full sm:w-48 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-full pl-5 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-glowy-pink-soft/40 transition-all cursor-pointer"
              >
                <option value="default">Por defecto</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name-asc">Nombre: A - Z</option>
              </select>
              <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-xs">
          <p className="text-slate-400 text-sm font-light">No encontramos productos que coincidan con tu selección.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map(prod => (
            <div
              key={prod.id}
              className="bg-white rounded-[2rem] border border-slate-100/50 shadow-sm relative overflow-hidden group transition-all duration-500 hover:shadow-md hover:scale-[1.01] flex flex-col justify-between"
            >
              {/* Tag Badge */}
              <Badge
                className="absolute top-4 left-4 z-10 font-bold bg-white/95 text-slate-700 hover:bg-white text-[9px] uppercase tracking-wider rounded-full px-3 py-1 shadow-xs border border-slate-100/60"
                variant="outline"
              >
                {prod.tag}
              </Badge>

              {/* Favorite Heart button */}
              <button
                onClick={() => toggleFavorite(prod.id, PRODUCTS)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-red-500 transition-all duration-250 shadow-xs"
                aria-label="Agregar a favoritos"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(prod.id) ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
              </button>

              {/* Product Visual Image Container */}
              <div className="w-full aspect-[4/3] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100/40">
                <picture>
                  <source srcSet={prod.imageAvif} type="image/avif" />
                  <source srcSet={prod.image} type="image/webp" />
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </picture>
              </div>

              {/* Card Text Description details */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] text-glowy-pink-deep font-bold uppercase tracking-[0.15em] block">
                    {prod.brand}
                  </span>
                  <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-glowy-pink-deep transition-colors line-clamp-2">
                    {prod.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed line-clamp-3">
                    {prod.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100/60 pt-3">
                  <span className="font-extrabold text-slate-900 text-sm">
                    ${prod.price.toLocaleString('es-CL')}
                  </span>
                  <button
                    onClick={() => addToCart(prod)}
                    className="px-4 py-2 rounded-full bg-slate-900 hover:bg-glowy-pink-deep text-white text-[9px] uppercase font-bold tracking-widest transition-all duration-300 shadow-xs hover:shadow flex items-center space-x-1"
                  >
                    <span>Comprar</span>
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
