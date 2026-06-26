import React, { useRef } from 'react'
import { useStore } from '@nanostores/react'
import { ChevronLeft, ChevronRight, Heart, Plus } from 'lucide-react'
import { PRODUCTS } from '../../data/products'
import { $favorites, $searchQuery, toggleFavorite, addToCart } from '../../stores/cartStore'
import { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent } from '../ui/reveal-on-hover'
import { Badge } from '../ui/badge'

export default function CatalogCards() {
  const favorites = useStore($favorites)
  const searchQuery = useStore($searchQuery)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  // Filter products based on search query
  const filteredProducts = PRODUCTS.filter((prod) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      prod.name.toLowerCase().includes(query) ||
      prod.brand.toLowerCase().includes(query) ||
      prod.description.toLowerCase().includes(query) ||
      prod.tag.toLowerCase().includes(query)
    )
  })

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 300
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleMouseUpOrLeave = () => {
    isDragging.current = false
  }

  return (
    <div className="w-full">
      {/* Header with Navigation Arrows */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div className="mb-6 md:mb-0">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-glowy-pink-deep">Colección de Culto</span>
          <h2 className="serif-title text-4xl text-slate-800 font-light mt-1">Favoritos de Corea</h2>
          <p className="text-slate-500 text-xs mt-1.5 font-light">Explora nuestra colección completa de marcas prestigiosas coreanas.</p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleScroll('left')}
            className="p-3 rounded-full border border-slate-200/60 bg-white hover:bg-slate-50 text-slate-600 soft-shadow-sm hover:soft-shadow active:scale-90 transition-all duration-250 flex items-center justify-center hover:border-glowy-pink-soft/30"
            aria-label="Deslizar izquierda"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-3 rounded-full border border-slate-200/60 bg-white hover:bg-slate-50 text-slate-600 soft-shadow-sm hover:soft-shadow active:scale-90 transition-all duration-250 flex items-center justify-center hover:border-glowy-pink-soft/30"
            aria-label="Deslizar derecha"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Edge fades */}
        <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden sm:block" />
        <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden sm:block" />

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 py-4 px-2 no-scrollbar catalog-scroll"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {filteredProducts.length === 0 ? (
            <div className="w-full text-center py-12 text-slate-400 font-light">
              No se encontraron productos para tu búsqueda.
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="min-w-[240px] w-[240px] aspect-[3/4] rounded-xl bg-white border border-slate-100/40 soft-shadow relative overflow-hidden group transition-all duration-500 hover:soft-shadow-xl hover:scale-[1.02]"
              >
                <CardHoverReveal className="size-full">
                  {/* Tag Badge */}
                  <Badge
                    className="absolute top-4 left-4 z-10 font-bold bg-white/95 text-slate-700 hover:bg-white text-[9px] uppercase tracking-wider rounded-full px-3 py-1 soft-shadow-sm border border-slate-100/60"
                    variant="outline"
                  >
                    {prod.tag}
                  </Badge>

                  {/* Favorite */}
                  <button
                    onClick={() => toggleFavorite(prod.id, PRODUCTS)}
                    className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-red-500 transition-all duration-250 soft-shadow-sm"
                    aria-label="Agregar a favoritos"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(prod.id) ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </button>

                  {/* Product Image */}
                  <CardHoverRevealMain className="w-full h-full bg-slate-50/10 flex items-center justify-center p-0">
                    <picture>
                      <source srcSet={prod.imageAvif} type="image/avif" />
                      <source srcSet={prod.image} type="image/webp" />
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400'
                        }}
                      />
                    </picture>
                  </CardHoverRevealMain>

                  {/* Hover Reveal Content */}
                  <CardHoverRevealContent className="rounded-[2rem] glassmorphism border-white/50">
                    <span className="text-[9px] text-glowy-pink-deep font-bold uppercase tracking-[0.15em]">
                      {prod.brand}
                    </span>
                    <h3 className="serif-title font-extrabold text-slate-800 text-base mt-0.5 leading-tight">
                      {prod.name}
                    </h3>
                    <p className="text-[10px] text-slate-600 font-light mt-1.5 h-12 overflow-hidden leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-200/40 pt-4 mt-3">
                      <span className="font-extrabold text-slate-900 text-sm">
                        ${prod.price.toLocaleString('es-CL')}
                      </span>
                      <button
                        onClick={() => addToCart(prod)}
                        className="px-5 py-2 rounded-full bg-slate-900 hover:bg-glowy-pink-deep text-white text-[10px] uppercase font-bold tracking-widest transition-all duration-300 soft-shadow-sm hover:soft-shadow"
                      >
                        Añadir
                      </button>
                    </div>
                  </CardHoverRevealContent>
                </CardHoverReveal>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
