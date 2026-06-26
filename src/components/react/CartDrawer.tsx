import { useStore } from '@nanostores/react'
import { ShoppingBag, X, Plus, Minus, MessageCircle, Check } from 'lucide-react'
import { $cart, $isCartOpen, $userProfile, $cartTotalWithDiscount, updateCartQuantity, handleWhatsAppCheckout } from '../../stores/cartStore'

export default function CartDrawer() {
  const cart = useStore($cart)
  const isOpen = useStore($isCartOpen)
  const userProfile = useStore($userProfile)
  const totalWithDiscount = useStore($cartTotalWithDiscount)

  if (!isOpen) return null

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const discount = userProfile.isRegistered ? Math.round(subtotal * 0.1) : 0

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={() => $isCartOpen.set(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
      <div className="absolute inset-y-0 right-0 max-w-full flex animate-slide-in">
        <div className="w-screen max-w-md bg-white soft-shadow-xl h-full flex flex-col">

          {/* Header */}
          <div className="p-5 flex items-center justify-between border-b border-slate-100/60 bg-gradient-to-r from-slate-50/50 to-white">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-glowy-pink-deep" />
              <h3 className="serif-title font-semibold text-slate-800 text-lg">Mi Carrito</h3>
            </div>
            <button onClick={() => $isCartOpen.set(false)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="p-5 bg-gradient-to-br from-glowy-pink-soft/10 to-glowy-lavender/15 rounded-full text-glowy-pink-deep">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="serif-title font-semibold text-slate-800 text-base">Tu carrito está vacío</h4>
                <p className="text-xs text-slate-400 font-light max-w-xs leading-relaxed">
                  ¿Aún no sabes qué elegir? Te recomendamos hacer el Test de Piel para encontrar tu rutina ideal.
                </p>
                <button onClick={() => { $isCartOpen.set(false); document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-glowy-pink-deep text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 active:scale-95 soft-shadow-sm">
                  Hacer Test
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 p-3.5 bg-slate-50/60 rounded-2xl border border-slate-100/50 soft-shadow-sm hover:soft-shadow transition-all duration-250">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-slate-100/40 shrink-0">
                    <picture>
                      <source srcSet={item.product.imageAvif} type="image/avif" />
                      <source srcSet={item.product.image} type="image/webp" />
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" loading="lazy" />
                    </picture>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold text-glowy-pink-deep uppercase tracking-[0.15em]">{item.product.brand}</span>
                    <h4 className="font-semibold text-slate-800 text-sm truncate">{item.product.name}</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">${item.product.price.toLocaleString('es-CL')}</p>
                    <div className="flex items-center space-x-2.5 mt-2">
                      <button onClick={() => updateCartQuantity(item.product.id, -1)} className="p-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200/60 text-slate-500 transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold text-slate-800 w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.product.id, 1)} className="p-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200/60 text-slate-500 transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => updateCartQuantity(item.product.id, -item.quantity)} className="p-1.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shrink-0" aria-label="Eliminar producto">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100/60 bg-gradient-to-t from-slate-50/50 to-white space-y-4">
              {userProfile.isRegistered && (
                <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100/50 text-emerald-700 text-xs flex items-center justify-between soft-shadow-sm">
                  <span className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Descuento 10% OFF Aplicado</span>
                  </span>
                  <span className="font-bold">-${discount.toLocaleString('es-CL')}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm text-slate-600 font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800 text-lg">${totalWithDiscount.toLocaleString('es-CL')}</span>
              </div>
              <p className="text-[10px] text-slate-400 text-center font-light">Envíos gratis en pedidos superiores a $45.000.</p>
              <button onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold tracking-widest uppercase rounded-full soft-shadow-md hover:soft-shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2">
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Completar por WhatsApp</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
