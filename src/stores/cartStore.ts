// ═══════════════════════════════════════════════════════════════
// GLOWYSKIN — Shared Cart Store (nanostores)
// Shared between React islands: CartDrawer, CatalogCards, SkinQuiz, Header
// ═══════════════════════════════════════════════════════════════

import { atom, computed } from 'nanostores'
import type { Product, CartItem } from '../data/products'

// ── Cart State ──
export const $cart = atom<CartItem[]>([])
export const $toastMessage = atom<string | null>(null)
export const $favorites = atom<string[]>([])

// ── Drawer States ──
export const $isCartOpen = atom(false)
export const $isProfileOpen = atom(false)
export const $isSearchOpen = atom(false)
export const $searchQuery = atom('')

// ── User Profile ──
export interface UserProfile {
  name: string
  email: string
  avatarUrl: string
  isRegistered: boolean
}

export const $userProfile = atom<UserProfile>({
  name: '',
  email: '',
  avatarUrl: '',
  isRegistered: false,
})

// ── Legal Modal ──
export const $legalModalType = atom<'privacy' | 'terms' | 'dmca' | null>(null)

// ── Computed Values ──
export const $cartCount = computed($cart, (cart) =>
  cart.reduce((sum, item) => sum + item.quantity, 0)
)

export const $cartTotal = computed($cart, (cart) =>
  cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
)

export const $cartTotalWithDiscount = computed(
  [$cart, $userProfile],
  (cart, profile) => {
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    return profile.isRegistered ? Math.round(total * 0.9) : total
  }
)

// ── Toast Utility ──
let toastTimeout: ReturnType<typeof setTimeout> | null = null
export function showToast(message: string) {
  if (toastTimeout) clearTimeout(toastTimeout)
  $toastMessage.set(message)
  toastTimeout = setTimeout(() => $toastMessage.set(null), 3500)
}

// ── Cart Operations ──
export function addToCart(product: Product, quantity = 1) {
  const current = $cart.get()
  const existing = current.find(item => item.product.id === product.id)
  if (existing) {
    $cart.set(
      current.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    )
  } else {
    $cart.set([...current, { product, quantity }])
  }
  showToast(`${product.name} agregado al carrito`)
}

export function updateCartQuantity(productId: string, delta: number) {
  const current = $cart.get()
  $cart.set(
    current
      .map(item => {
        if (item.product.id === productId) {
          const nextQty = item.quantity + delta
          return nextQty > 0 ? { ...item, quantity: nextQty } : null
        }
        return item
      })
      .filter(Boolean) as CartItem[]
  )
}

export function toggleFavorite(productId: string, products: Product[]) {
  const current = $favorites.get()
  const index = current.indexOf(productId)
  const productName = products.find(p => p.id === productId)?.name
  if (index > -1) {
    showToast(`Removido de favoritos: ${productName}`)
    $favorites.set(current.filter(id => id !== productId))
  } else {
    showToast(`Guardado en favoritos: ${productName}`)
    $favorites.set([...current, productId])
  }
}

// ── User Operations ──
export function registerUser(name: string, email: string, avatarUrl: string) {
  $userProfile.set({ name, email, avatarUrl, isRegistered: true })
  showToast('¡Registro completo! Código de 10% OFF GLOWY10 activado.')
}

export function logoutUser() {
  $userProfile.set({ name: '', email: '', avatarUrl: '', isRegistered: false })
  showToast('Sesión cerrada correctamente')
  $isProfileOpen.set(false)
}

// ── WhatsApp Checkout ──
export function handleWhatsAppCheckout() {
  const cart = $cart.get()
  const profile = $userProfile.get()
  if (cart.length === 0) return

  let msg = '🌸 *NUEVO PEDIDO EN GLOWYSKIN* 🌸\n\n'
  msg += '¡Hola! Me gustaría comprar los siguientes productos de skincare coreano:\n\n'

  cart.forEach((item, i) => {
    const lineTotal = item.product.price * item.quantity
    msg += `${i + 1}. *${item.product.name}* (Cant: ${item.quantity}) - $${lineTotal.toLocaleString('es-CL')}\n`
  })

  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)

  if (profile.isRegistered) {
    const discount = total * 0.1
    msg += `\n*Subtotal:* $${total.toLocaleString('es-CL')}`
    msg += `\n*Descuento (10% OFF - GLOWY10):* -$${Math.round(discount).toLocaleString('es-CL')}`
    msg += `\n*TOTAL CON DESCUENTO:* *$${Math.round(total - discount).toLocaleString('es-CL')}*`
  } else {
    msg += `\n*TOTAL:* *$${total.toLocaleString('es-CL')}*`
  }

  msg += '\n\nQuedo a la espera de sus datos de transferencia para completar el pago. ¡Gracias!'

  const url = `https://wa.me/56981888642?text=${encodeURIComponent(msg)}`

  showToast('Redirigiendo a WhatsApp para completar el pedido...')
  setTimeout(() => {
    window.open(url, '_blank')
    $cart.set([])
    $isCartOpen.set(false)
  }, 1200)
}
