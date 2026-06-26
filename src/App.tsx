import React, { useState, useEffect, useRef } from 'react'
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  ChevronRight,
  ChevronLeft,
  X,
  Plus,
  Minus,
  Check,
  Star,
  ShieldCheck,
  Sparkles,
  Droplet,
  Flame,
  Leaf,
  Moon,
  Sun,
  Truck,
  Home,
  Eye,
  Settings,
  LogOut,
  Instagram,
  Facebook,
  MessageCircle
} from 'lucide-react'
import { ShaderBackground } from '@/components/ui/hero-shader'
import { UserProfileSidebar, NavItem } from '@/components/ui/menu'
import {
  CardHoverReveal,
  CardHoverRevealMain,
  CardHoverRevealContent
} from '@/components/ui/reveal-on-hover'
import { Badge } from '@/components/ui/badge'

// ═══════════════════════════════════════════════════════════════
// Interfaces
// ═══════════════════════════════════════════════════════════════
interface Product {
  id: string
  name: string
  brand: string
  description: string
  price: number
  tag: string
  image: string
  category: 'cleanse' | 'treat' | 'moisturize' | 'special'
}

interface CartItem {
  product: Product
  quantity: number
}

// ═══════════════════════════════════════════════════════════════
// Product Mock Database
// ═══════════════════════════════════════════════════════════════
const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Poremizing Quick Clay Stick Mask',
    brand: 'SKIN1004',
    description: 'Mascarilla de arcilla purificante en stick con centella de Madagascar que absorbe el exceso de sebo y afina los poros en profundidad.',
    price: 15990,
    tag: 'Best Seller',
    image: '/Catalogo/Pomerizing.png',
    category: 'cleanse'
  },
  {
    id: 'p2',
    name: 'SEOUL 1988 Serum: Retinal Liposome 2% + Black Ginseng',
    brand: 'KSECRET',
    description: 'Suero antiedad de alta concentración con 2% de retinal liposomado y extracto de ginseng negro para suavizar arrugas y potenciar la renovación celular.',
    price: 15490,
    tag: 'Favorito',
    image: '/Catalogo/8.jpeg',
    category: 'treat'
  },
  {
    id: 'p3',
    name: 'Retinol Vitamin C Vitamin E Ampoule Serum',
    brand: 'APLB',
    description: 'Ampolla multi-antioxidante con retinol, vitamina C y vitamina E para iluminar el tono, reducir manchas y rejuvenecer la piel con una fórmula suave.',
    price: 14990,
    tag: 'Iluminador',
    image: '/Catalogo/Retinol.png',
    category: 'treat'
  },
  {
    id: 'p4',
    name: 'Combo Sérum The Vita-A Retinal Shot Tightening Booster',
    brand: 'celimax',
    description: 'Booster tensor con retinal de alta pureza y pantenol que estimula la síntesis de colágeno para una piel más firme y luminosa desde la primera aplicación.',
    price: 15990,
    tag: 'Firmeza',
    image: '/Catalogo/1.jpeg',
    category: 'treat'
  },
  {
    id: 'p5',
    name: 'Probio-Cica Intensive Ampoule',
    brand: 'SKIN1004',
    description: 'Ampolla concentrada de centella de Madagascar enriquecida con probióticos fermentados para calmar pieles reactivas y reforzar la barrera cutánea.',
    price: 12990,
    tag: 'Calmante',
    image: '/Catalogo/4.jpeg',
    category: 'treat'
  },
  {
    id: 'p6',
    name: 'Tone Brightening Capsule Ampoule',
    brand: 'SKIN1004',
    description: 'Ampolla iluminadora con cápsulas de centella que liberan activos al aplicarse, unificando el tono y aportando un acabado vidrioso y radiante.',
    price: 18490,
    tag: 'Radiancia',
    image: '/Catalogo/5.jpeg',
    category: 'treat'
  },
  {
    id: 'p7',
    name: 'Probio-Cica Bakuchiol Eye Cream',
    brand: 'SKIN1004',
    description: 'Crema contorno de ojos con bakuchiol y centella fermentada para atenuar ojeras, minimizar líneas finas y restaurar la firmeza del área periocular.',
    price: 15490,
    tag: 'Nutritivo',
    image: '/Catalogo/7.jpeg',
    category: 'moisturize'
  },
  {
    id: 'p8',
    name: 'Hyalu-Cica Water-Fit Sun Serum SPF50+',
    brand: 'SKIN1004',
    description: 'Sérum solar ultraligero con ácido hialurónico y centella asiática. Fórmula no comedogénica que protege e hidrata dejando un acabado fresco y natural.',
    price: 14490,
    tag: 'Esencial',
    image: '/Catalogo/12.jpeg',
    category: 'special'
  },
  {
    id: 'p9',
    name: 'Relief Sun: Rice + Probiotics SPF50+',
    brand: 'Beauty of Joseon',
    description: 'Protector solar con 30% de agua de arroz y probióticos de granos para una protección suave, calmante y luminosa, sin residuo blanco.',
    price: 17990,
    tag: 'Protección',
    image: '/Catalogo/WhatsApp Image 2026-06-18 at 23.03.50.jpeg',
    category: 'special'
  },
  {
    id: 'p10',
    name: 'Relief Sun Aqua-fresh SPF50+',
    brand: 'Beauty of Joseon',
    description: 'Protector solar acuoso y ligero de textura gel, ideal para pieles mixtas o grasas. Hidrata, no obstruye poros y deja la piel fresca todo el día.',
    price: 17990,
    tag: 'Hidratación',
    image: '/Catalogo/WhatsApp Image 2026-06-18 at 23.03.51.jpeg',
    category: 'special'
  },
  {
    id: 'p11',
    name: 'TXA 6 Niacinamide 10 Retinal Serum',
    brand: 'Purito SEOUL',
    description: 'Sérum bifásico con ácido tranexámico, niacinamida al 10% y retinal que trabaja en sinergia para reducir manchas, cerrar poros y aclarar el tono uniformemente.',
    price: 15990,
    tag: 'Anti-manchas',
    image: '/Catalogo/WhatsApp Image 2026-06-18 at 23.03.512.jpeg',
    category: 'treat'
  },
  {
    id: 'p12',
    name: 'PDRN Pink Peptide Serum',
    brand: 'medicube',
    description: 'Suero regenerador con PDRN derivado de salmón y péptidos de señalización para una elasticidad extrema, relleno de arrugas y luminosidad duradera.',
    price: 19990,
    tag: 'Regenerador',
    image: '/Catalogo/WhatsApp Image 2026-06-18 at 23.04.094123123.jpeg',
    category: 'treat'
  }
]

// ═══════════════════════════════════════════════════════════════
// Brand Logos Component (Custom SVGs mimicking official logos)
// ═══════════════════════════════════════════════════════════════
function BrandLogo({ name }: { name: string }) {
  switch (name) {
    case 'SKIN1004':
      return (
        <div className="flex flex-col items-center justify-center opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 mx-6 select-none cursor-default">
          <span className="font-extrabold tracking-[0.22em] text-slate-800 text-sm font-sans">SKIN1004</span>
          <span className="text-[6px] tracking-[0.42em] text-amber-600 font-bold uppercase -mt-0.5">Madagascar</span>
        </div>
      )
    case 'Beauty of Joseon':
      return (
        <div className="flex items-center space-x-2 opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 mx-6 select-none cursor-default">
          <span className="font-serif italic font-bold text-slate-800 text-sm tracking-wide">Beauty of Joseon</span>
          <div className="w-4.5 h-4.5 bg-red-800 text-white rounded-sm flex items-center justify-center text-[8px] font-bold font-serif shadow-sm">美</div>
        </div>
      )
    case 'ROUND LAB':
      return (
        <div className="flex items-center space-x-2 opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 mx-6 select-none cursor-default">
          <svg className="w-5 h-5 text-sky-500/80 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M7 14c1.5-1.5 3-2 5-2s3.5.5 5 2" />
          </svg>
          <span className="font-extrabold tracking-widest text-slate-800 text-xs">ROUND LAB</span>
        </div>
      )
    case 'mixsoon':
      return (
        <div className="flex items-center space-x-1.5 opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 mx-6 select-none cursor-default">
          <svg className="w-5 h-5 text-amber-800/80 fill-current" viewBox="0 0 24 24">
            <path d="M12 6a4 4 0 0 1 4 4c0 3-4 8-4 8s-4-5-4-8a4 4 0 0 1 4-4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm16 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
          </svg>
          <span className="font-semibold text-slate-800 text-sm font-sans lowercase">mixsoon</span>
        </div>
      )
    case 'Purito SEOUL':
      return (
        <div className="flex items-center space-x-1 opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 mx-6 select-none cursor-default">
          <span className="font-extrabold tracking-wider text-emerald-800 text-xs">PURITO</span>
          <span className="text-[7px] font-extrabold text-slate-500 tracking-[0.1em] border border-slate-300 px-1 py-0.5 rounded-sm uppercase">Seoul</span>
        </div>
      )
    case 'medicube':
      return (
        <div className="flex items-center space-x-1.5 opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 mx-6 select-none cursor-default">
          <div className="w-3.5 h-3.5 bg-red-500 rounded-sm flex items-center justify-center text-white text-[9px] font-extrabold shadow-sm">+</div>
          <span className="font-extrabold text-slate-800 text-xs font-sans tracking-wide">medicube</span>
        </div>
      )
    case 'ETUDE':
      return (
        <div className="flex items-center space-x-1 opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 mx-6 select-none cursor-default">
          <span className="font-black italic text-glowy-pink-deep text-sm tracking-wide">ETUDE</span>
          <span className="text-glowy-pink-soft text-xs">♥</span>
        </div>
      )
    case 'celimax':
      return (
        <div className="flex items-center space-x-0.5 opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 mx-6 select-none cursor-default">
          <span className="font-black text-slate-800 text-sm tracking-tighter">celi</span>
          <span className="font-light text-slate-600 text-sm tracking-tighter">max</span>
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
        </div>
      )
    case 'Dr. Althea':
      return (
        <div className="flex items-center opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 mx-6 select-none cursor-default">
          <span className="font-serif uppercase tracking-[0.25em] text-slate-900 text-xs font-semibold">Dr. Althea</span>
        </div>
      )
    case 'APLB':
      return (
        <div className="flex items-center justify-center opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 mx-6 select-none cursor-default">
          <span className="font-extrabold tracking-[0.3em] text-slate-900 text-sm border-b-2 border-slate-950 pb-0.5">APLB</span>
        </div>
      )
    case 'KSECRET':
      return (
        <div className="flex items-center space-x-1 opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 mx-6 select-none cursor-default">
          <svg className="w-4 h-4 text-glowy-pink-deep fill-current" viewBox="0 0 24 24">
            <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
          <span className="font-bold tracking-widest text-slate-800 text-xs">K-SECRET</span>
        </div>
      )
    default:
      return <span className="font-semibold text-slate-400 mx-6">{name}</span>;
  }
}

// ═══════════════════════════════════════════════════════════════
// Main App
// ═══════════════════════════════════════════════════════════════
export default function App() {
  // Navigation & Drawer States
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  
  // E-commerce state
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  
  // Newsletter subscription
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Interactive Quiz States
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({
    skinType: '',
    concern: '',
    texture: ''
  })
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])

  // Legal Modal States
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'dmca' | null>(null)

  // Persistent User Registration State
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    avatarUrl: '',
    isRegistered: false
  })

  // References
  const profileRef = useRef<HTMLDivElement>(null)
  const cartRef = useRef<HTMLDivElement>(null)
  const catalogScrollRef = useRef<HTMLDivElement>(null)

  // Drag-scroll state for catalog
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)



  // Show Toast Utility
  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
    showToast(`${product.name} agregado al carrito`)
  }

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const nextQty = item.quantity + delta
          return nextQty > 0 ? { ...item, quantity: nextQty } : null
        }
        return item
      }).filter(Boolean) as CartItem[]
    })
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const index = prev.indexOf(productId)
      const productName = PRODUCTS.find(p => p.id === productId)?.name
      if (index > -1) {
        showToast(`Removido de favoritos: ${productName}`)
        return prev.filter(id => id !== productId)
      } else {
        showToast(`Guardado en favoritos: ${productName}`)
        return [...prev, productId]
      }
    })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      setSubscribed(true)
      showToast('¡Gracias por suscribirte! Revisa tu correo por tu 10% de descuento.')
      setEmail('')
    }
  }

  // Handle registration in profile sidebar
  const handleRegister = (name: string, email: string, avatarUrl: string) => {
    setUserProfile({
      name,
      email,
      avatarUrl,
      isRegistered: true
    })
    showToast('¡Registro completo! Código de 10% OFF GLOWY10 activado.')
  }

  const handleLogout = () => {
    setUserProfile({
      name: '',
      email: '',
      avatarUrl: '',
      isRegistered: false
    })
    showToast('Sesión cerrada correctamente')
    setIsProfileOpen(false)
  }

  // Add recommended routine to cart
  const addRoutineToCart = () => {
    recommendedProducts.forEach(prod => addToCart(prod, 1))
    showToast('¡Tu rutina completa fue agregada al carrito!')
  }

  // Profile sidebar navigation items
  const navItems: NavItem[] = [
    { label: 'Mis Pedidos', href: '#catalogo', icon: <Truck className="h-full w-full" /> },
    { label: 'Reseñas', href: '#', icon: <Star className="h-full w-full" /> },
    { label: 'Direcciones', href: '#', icon: <Home className="h-full w-full" /> },
    { label: 'Vistos Recientemente', href: '#catalogo', icon: <Eye className="h-full w-full" /> },
    { label: 'Favoritos', href: '#catalogo', icon: <Heart className="h-full w-full" /> },
    { label: 'Configuración', href: '#', icon: <Settings className="h-full w-full" />, isSeparator: true },
  ]

  const logoutItem = {
    label: 'Cerrar Sesión',
    icon: <LogOut className="h-full w-full" />,
    onClick: handleLogout,
  }

  // WhatsApp Redirect Checkout Integration (+56 9 8188 8642)
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return

    let messageText = '🌸 *NUEVO PEDIDO EN GLOWYSKIN* 🌸\n\n'
    messageText += '¡Hola! Me gustaría comprar los siguientes productos de skincare coreano:\n\n'

    cart.forEach((item, index) => {
      const lineTotal = item.product.price * item.quantity
      messageText += `${index + 1}. *${item.product.name}* (Cant: ${item.quantity}) - $${lineTotal.toLocaleString('es-CL')}\n`
    })

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    
    // Apply 10% discount if registered
    if (userProfile.isRegistered) {
      const discount = total * 0.1
      messageText += `\n*Subtotal:* $${total.toLocaleString('es-CL')}`
      messageText += `\n*Descuento (10% OFF - GLOWY10):* -$${Math.round(discount).toLocaleString('es-CL')}`
      messageText += `\n*TOTAL CON DESCUENTO:* *$${Math.round(total - discount).toLocaleString('es-CL')}*`
    } else {
      messageText += `\n*TOTAL:* *$${total.toLocaleString('es-CL')}*`
    }

    messageText += '\n\nQuedo a la espera de sus datos de transferencia para completar el pago. ¡Gracias!'

    const encodedText = encodeURIComponent(messageText)
    const whatsappUrl = `https://wa.me/56981888642?text=${encodedText}`
    
    showToast('Redirigiendo a WhatsApp para completar el pedido...')
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
      setCart([])
      setIsCartOpen(false)
    }, 1200)
  }

  // Smooth scroll for horizontal catalog slider
  const handleCatalogScroll = (direction: 'left' | 'right') => {
    if (catalogScrollRef.current) {
      const { scrollLeft, clientWidth } = catalogScrollRef.current
      const offset = direction === 'left' ? -clientWidth * 0.45 : clientWidth * 0.45
      catalogScrollRef.current.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth'
      })
    }
  }

  // Close Drawers on Outside Click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node) && isProfileOpen) {
        setIsProfileOpen(false)
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isCartOpen) {
        setIsCartOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileOpen, isCartOpen])

  // Navbar avatar rendering
  const renderNavbarAvatar = () => {
    if (!userProfile.isRegistered) {
      return <User className="w-5 h-5 text-slate-600" />
    }
    
    if (userProfile.avatarUrl.startsWith('http')) {
      return (
        <img 
          src={userProfile.avatarUrl} 
          alt="Avatar" 
          className="w-7 h-7 rounded-full object-cover border-2 border-glowy-pink-soft/40 soft-shadow-sm"
        />
      )
    }
    
    return (
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-glowy-pink-soft/30 to-glowy-lavender/40 flex items-center justify-center border-2 border-glowy-pink-soft/30 text-xs font-bold">
        {userProfile.avatarUrl}
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans bg-[#faf7f8]">
      
      {/* ═══ TOAST NOTIFICATION ═══ */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 animate-fade-up glassmorphism px-5 py-3.5 rounded-2xl flex items-center space-x-3 text-sm font-medium text-slate-700 soft-shadow-md max-w-sm">
          <span className="w-2 h-2 rounded-full bg-glowy-pink-deep animate-soft-pulse flex-shrink-0" />
          <span className="leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* ═══ FLOATING ACTION BUTTONS (Instagram & WhatsApp) ═══ */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/glowyskin._cl/?hl=es"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white soft-shadow-lg hover:soft-shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center animate-float"
          title="Síguenos en Instagram"
          aria-label="Síguenos en Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/56981888642?text=Hola%20GLOWYSKIN!%20Me%20gustar%C3%ADa%20hacer%20una%20consulta%20sobre%20los%20productos."
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full bg-[#25D366] text-white soft-shadow-lg hover:soft-shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative group"
          title="Escríbenos por WhatsApp"
          aria-label="Escríbenos por WhatsApp"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-25 animate-ping pointer-events-none" />
          <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        </a>
      </div>

      {/* ═══════════════════════════════════════════════════════
          HEADER / NAVBAR — Glassmorphism Premium
          ═══════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 w-full transition-all duration-300 glassmorphism border-b border-white/30" id="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <img
              src="/logo_transparente.png"
              alt="GLOWYSKIN Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none'
              }}
            />
            <span className="serif-title text-xl sm:text-2xl font-semibold tracking-wide text-slate-800 group-hover:text-glowy-pink-deep transition-colors duration-300">
              GLOWYSKIN
            </span>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 text-xs uppercase tracking-widest font-semibold text-slate-500" aria-label="Navegación principal">
            {[
              { label: 'Catálogo', href: '#catalogo' },
              { label: 'Skin Quiz', href: '#quiz', hasIcon: true },
              { label: 'Nuestra Filosofía', href: '#filosofia' },
              { label: 'Newsletter', href: '#newsletter' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-full hover:bg-glowy-pink-soft/10 hover:text-glowy-pink-deep transition-all duration-250 flex items-center space-x-1.5"
              >
                <span>{link.label}</span>
                {link.hasIcon && <Sparkles className="w-3 h-3 text-glowy-pink-deep" />}
              </a>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 rounded-full hover:bg-glowy-pink-soft/10 text-slate-600 hover:text-glowy-pink-deep transition-all duration-250"
              aria-label="Buscar productos"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Profile */}
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2.5 rounded-full hover:bg-glowy-pink-soft/10 text-slate-600 hover:text-glowy-pink-deep transition-all duration-250 relative flex items-center space-x-1.5"
              aria-label="Perfil de usuario"
            >
              {renderNavbarAvatar()}
              {userProfile.isRegistered && (
                <span className="hidden sm:inline text-[11px] font-semibold text-slate-700 max-w-[60px] truncate">
                  {userProfile.name}
                </span>
              )}
              <span className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white ${userProfile.isRegistered ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            </button>

            {/* Shopping Cart */}
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2.5 rounded-full bg-gradient-to-br from-glowy-pink-soft/15 to-glowy-lavender/20 hover:from-glowy-pink-soft/25 hover:to-glowy-lavender/30 text-slate-700 transition-all duration-300 relative flex items-center justify-center soft-shadow-sm hover:soft-shadow"
              aria-label="Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-glowy-pink-deep text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* ═══ SEARCH BAR ═══ */}
      {isSearchOpen && (
        <div className="w-full glassmorphism border-b border-white/20 py-5 px-4 sm:px-6 soft-shadow-md transition-all duration-300 animate-fade-up">
          <div className="max-w-4xl mx-auto flex items-center justify-between space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por marca, ingrediente o tipo de piel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-glowy-pink-soft/50 focus:border-glowy-pink-soft/30 text-sm bg-white/80 placeholder:text-slate-400 soft-shadow-sm transition-all"
                autoFocus
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button 
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery('')
              }}
              className="text-slate-500 hover:text-glowy-pink-deep text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION — Premium Soft UI
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full" id="hero">
        <ShaderBackground>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between relative z-10 min-h-[calc(100vh-80px)] py-12 lg:py-0">

            {/* Hero Text Content */}
            <div className="w-full lg:w-[42%] lg:pr-6 text-center lg:text-left space-y-6 relative z-10">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-glowy-pink-soft/10 text-[10px] font-bold text-glowy-pink-deep uppercase tracking-[0.2em] border border-glowy-pink-soft/15 animate-fade-up">
                <Sparkles className="w-3 h-3 mr-1.5" />
                K-Beauty Premium · Chile
              </span>

              {/* Main headline */}
              <h1 className="serif-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] font-light text-slate-800 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                Piel radiante,<br />
                <span className="italic font-normal bg-gradient-to-r from-glowy-pink-deep to-[#c44d8e] bg-clip-text text-transparent">Belleza pura</span>,<br />
                Estilo Coreano.
              </h1>

              {/* Sub-headline */}
              <p className="text-sm font-light text-slate-600 max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
                Descubre fórmulas revolucionarias nacidas del balance entre naturaleza e innovación. Productos limpios diseñados para nutrir tu piel y revelar tu luminosidad natural.
              </p>

              {/* Hero CTAs */}
              <div className="flex items-center gap-4 pt-2 flex-wrap animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <a
                  href="#catalogo"
                  className="px-8 py-3.5 rounded-full bg-slate-900 text-white font-semibold text-xs tracking-widest uppercase hover:bg-slate-800 active:scale-95 transition-all duration-300 soft-shadow-md hover:soft-shadow-lg"
                >
                  Explorar Catálogo
                </a>
                <a
                  href="#quiz"
                  className="px-8 py-3.5 rounded-full bg-white/80 backdrop-blur-sm text-slate-800 border border-slate-200/60 font-semibold text-xs tracking-widest uppercase hover:bg-white hover:border-glowy-pink-soft/40 active:scale-95 transition-all duration-300 soft-shadow-sm hover:soft-shadow flex items-center space-x-2"
                >
                  <span>Hacer Test de Piel</span>
                  <ChevronRight className="w-4 h-4 text-glowy-pink-deep" />
                </a>
              </div>
            </div>

            {/* HERO IMAGE — Transparent Model Direct Render with Background Text & Floating Card */}
            <div className="w-full lg:w-[58%] flex items-end justify-center relative select-none mt-8 lg:mt-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {/* Ambient glows */}
              <div className="absolute w-96 h-96 bg-glowy-pink-soft/30 rounded-full filter blur-[100px] -z-20 animate-soft-pulse" />
              <div className="absolute w-80 h-80 bg-glowy-blue-light/25 rounded-full filter blur-[90px] -z-20 animate-soft-pulse" style={{ animationDelay: '2s', top: '45%', left: '10%' }} />
              
              <div className="relative w-full max-w-[620px] lg:max-w-[780px] flex justify-center items-end">
                <img 
                  src="/Skincaresinfondo.svg" 
                  alt="K-Beauty Glow Routine" 
                  className="w-full h-auto object-contain max-h-[660px] lg:max-h-[820px] transition-transform duration-500 hover:scale-[1.02]" 
                  style={{
                    WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at center, black 50%, rgba(0,0,0,0.3) 80%, transparent 100%)',
                    maskImage: 'radial-gradient(ellipse 90% 90% at center, black 50%, rgba(0,0,0,0.3) 80%, transparent 100%)'
                  }}
                />

                {/* Floating glassmorphic product card (like in HeroKorea.jpg) */}
                <div className="absolute bottom-8 right-2 sm:right-8 lg:-right-10 z-20 bg-white/90 backdrop-blur-md border border-white/70 p-4 sm:p-5 rounded-[2.25rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] flex items-center space-x-5 max-w-[320px] sm:max-w-[360px] transition-all duration-300 hover:scale-105 text-left">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                    <img src="/Catalogo/8.jpeg" alt="KSECRET SEOUL 1988 Serum" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[9px] font-bold text-glowy-pink-deep bg-glowy-pink-soft/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Bestseller</span>
                      <span className="text-[9px] font-medium text-slate-400">Suero</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base truncate mt-1">SEOUL 1988 Retinal</h4>
                    <p className="text-xs sm:text-sm text-slate-900 font-extrabold mt-0.5">
                      ${(15490).toLocaleString('es-CL')}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(PRODUCTS.find(p => p.id === 'p2')!); }}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900 hover:bg-glowy-pink-deep text-white flex items-center justify-center transition-all duration-200 active:scale-90 flex-shrink-0"
                    aria-label="Añadir al carrito"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </ShaderBackground>
      </section>


      {/* ═══════════════════════════════════════════════════════
          MARCAS QUE OFRECEMOS
          ═══════════════════════════════════════════════════════ */}
      <section className="relative py-12 z-20 overflow-hidden bg-gradient-to-b from-[#faf7f8] via-[#F0A6C5]/5 to-[#faf7f8] border-y border-white/40">
        <div className="max-w-7xl mx-auto px-4 text-center mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E963A7]">
            Marcas que ofrecemos
          </span>
        </div>
        <div className="ticker-container py-2">
          <div className="animate-ticker flex items-center">
            {/* First set */}
            {[
              'KSECRET', 'ROUND LAB', 'ETUDE', 'Dr. Althea', 'medicube', 
              'mixsoon', 'Beauty of Joseon', 'Purito SEOUL', 'celimax', 'APLB', 'SKIN1004'
            ].map((brand, idx) => (
              <div key={`brand-1-${idx}`} className="flex-shrink-0">
                <BrandLogo name={brand} />
              </div>
            ))}
            {/* Duplicate set for infinite loop */}
            {[
              'KSECRET', 'ROUND LAB', 'ETUDE', 'Dr. Althea', 'medicube', 
              'mixsoon', 'Beauty of Joseon', 'Purito SEOUL', 'celimax', 'APLB', 'SKIN1004'
            ].map((brand, idx) => (
              <div key={`brand-2-${idx}`} className="flex-shrink-0">
                <BrandLogo name={brand} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          VIDEO BACKGROUND SECTION
          ═══════════════════════════════════════════════════════ */}
      <span id="filosofia" className="block relative -top-24" />
      <section className="relative py-28 overflow-hidden min-h-[480px] flex items-center justify-center bg-[#faf7f8]">
        
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video 
            className="w-full h-full object-cover opacity-100"
            src="/Fondo.mp4"
            autoPlay
            loop
            muted
            playsInline
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none'
            }}
          />
          {/* Luminous soft overlay */}
          <div className="absolute inset-0 bg-white/10 pointer-events-none" />
        </div>

        {/* Soft fading overlays to blend video with page background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#faf7f8] via-[#faf7f8]/50 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#faf7f8] via-[#faf7f8]/50 to-transparent pointer-events-none z-10" />
        
        {/* Fallback */}
        <img 
          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200" 
          alt="Skincare Aesthetic"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        {/* Content Card — Solid White with Maximum Contrast */}
        <div className="relative z-20 max-w-3xl mx-auto px-6 sm:px-8 text-center animate-fade-up">
          <div className="bg-white border border-slate-200 p-8 sm:p-14 rounded-[2.5rem] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.6)] text-slate-900">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-glowy-pink-soft/10 text-[10px] font-bold uppercase tracking-[0.15em] text-glowy-pink-deep border border-glowy-pink-soft/20 mb-5">
              Minimalismo Terapéutico
            </span>
            <h2 className="serif-title text-3xl sm:text-4xl text-slate-900 font-extrabold leading-tight mb-5">
              Siente la frescura de una rutina diseñada para tu bienestar.
            </h2>
            <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed max-w-xl mx-auto mb-7">
              Inspirado en la serenidad de los rituales de belleza coreanos. Nuestras fórmulas no solo tratan los síntomas de tu piel, sino que fortalecen su barrera natural desde el interior.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
              {[
                { icon: <ShieldCheck className="w-4 h-4 text-glowy-pink-deep" />, text: 'Dermatológicamente Probado' },
                { icon: <Sparkles className="w-4 h-4 text-glowy-pink-deep" />, text: '100% Cruelty Free' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full border border-slate-100/60 soft-shadow-sm">
                  {badge.icon}
                  <span className="text-xs font-semibold text-slate-700">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Section Divider (Soft light-to-light gradient) ═══ */}
      <div className="h-32 -mt-16 -mb-16 relative z-10 pointer-events-none bg-gradient-to-b from-[#faf7f8] via-[#EACDDB]/15 to-[#faf7f8]" />

      {/* ═══════════════════════════════════════════════════════
          SKIN QUIZ — Soft UI Cards
          ═══════════════════════════════════════════════════════ */}
      <span id="quiz" className="block relative -top-24" />
      <section className="py-20 bg-gradient-to-b from-[#faf7f8] via-white to-[#faf7f8] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white/80 backdrop-blur-lg p-8 sm:p-12 rounded-[2.5rem] border border-white/50 soft-shadow-lg relative overflow-hidden">
            
            {/* Ambient decorations */}
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-glowy-pink-soft/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-glowy-blue-light/20 rounded-full blur-3xl pointer-events-none" />
            
            {/* Quiz Intro */}
            {quizStep === 0 && (
              <div className="text-center space-y-6 relative z-10">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-glowy-pink-soft/10 to-glowy-lavender/15 text-[10px] font-bold text-glowy-pink-deep uppercase tracking-[0.15em] border border-glowy-pink-soft/10">
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  Personalización Inteligente
                </span>
                <h2 className="serif-title text-3xl sm:text-4xl text-slate-800 font-light">
                  ¿No sabes por dónde empezar?
                </h2>
                <p className="text-slate-500 text-sm max-w-lg mx-auto font-light leading-relaxed">
                  Responde 3 preguntas rápidas y nuestro algoritmo creará una rutina ideal de 3 pasos basada en las necesidades exactas de tu piel.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setQuizStep(1)}
                    className="px-8 py-3.5 bg-slate-900 hover:bg-glowy-pink-deep text-white text-xs font-bold tracking-widest uppercase rounded-full soft-shadow-md hover:soft-shadow-lg active:scale-95 transition-all duration-300"
                  >
                    Hacer Test de Piel
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Step 1: Skin Type */}
            {quizStep === 1 && (
              <div className="space-y-6 relative z-10 animate-fade-up">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Paso 1 de 3: Tipo de Piel</span>
                  <span>33%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100/80 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-glowy-pink-soft to-glowy-pink-deep w-1/3 transition-all duration-500 rounded-full" />
                </div>
                <h3 className="serif-title text-2xl text-slate-800 text-center py-2">
                  ¿Cómo sientes tu piel durante el día?
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { val: 'seca', label: 'Tirante y Seca', desc: 'Siento descamación, falta de hidratación y brillo.', icon: <Droplet className="w-5 h-5 text-glowy-blue-pearl" /> },
                    { val: 'grasa', label: 'Grasa / Con Brillo', desc: 'Produzco exceso de grasa en todo el rostro y poros dilatados.', icon: <Flame className="w-5 h-5 text-glowy-pink-deep" /> },
                    { val: 'mixta', label: 'Mixta (Zona T)', desc: 'Frente y nariz grasas, pero mejillas secas o normales.', icon: <Leaf className="w-5 h-5 text-emerald-400" /> },
                    { val: 'sensible', label: 'Sensible / Irritada', desc: 'Tiendo a ponerme roja con facilidad o reaccionar a productos.', icon: <Sparkles className="w-5 h-5 text-amber-400" /> }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        setQuizAnswers(prev => ({ ...prev, skinType: opt.val }))
                        setQuizStep(2)
                      }}
                      className="p-5 rounded-[2rem] border border-slate-100/60 bg-white/70 hover:bg-white text-left hover:border-glowy-pink-soft/30 soft-shadow-sm hover:soft-shadow-md transition-all duration-250 group flex items-start space-x-4"
                    >
                      <div className="p-2.5 rounded-2xl bg-slate-50/80 group-hover:bg-glowy-pink-soft/10 transition-colors duration-250">
                        {opt.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{opt.label}</h4>
                        <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-start pt-4">
                  <button 
                    onClick={() => setQuizStep(0)}
                    className="text-xs text-slate-400 hover:text-slate-700 font-bold uppercase tracking-wider flex items-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Atrás
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Step 2: Skin Concern */}
            {quizStep === 2 && (
              <div className="space-y-6 relative z-10 animate-fade-up">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Paso 2 de 3: Preocupación Principal</span>
                  <span>66%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100/80 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-glowy-pink-soft to-glowy-pink-deep w-2/3 transition-all duration-500 rounded-full" />
                </div>
                <h3 className="serif-title text-2xl text-slate-800 text-center py-2">
                  ¿Cuál es tu mayor preocupación hoy?
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { val: 'deshidratación', label: 'Deshidratación y Opacidad', desc: 'Piel apagada, sin brillo natural y líneas finas.', icon: <Droplet className="w-5 h-5 text-cyan-400" /> },
                    { val: 'poros', label: 'Acné y Poros Obstruidos', desc: 'Puntos negros, brotes y poros muy visibles.', icon: <Flame className="w-5 h-5 text-red-400" /> },
                    { val: 'manchas', label: 'Manchas y Tono Irregular', desc: 'Hiperpigmentación, marcas de acné o manchas solares.', icon: <Sun className="w-5 h-5 text-amber-500" /> },
                    { val: 'envejecimiento', label: 'Líneas de Expresión y Firmeza', desc: 'Falta de elasticidad y arrugas prematuras.', icon: <Moon className="w-5 h-5 text-indigo-400" /> }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        setQuizAnswers(prev => ({ ...prev, concern: opt.val }))
                        setQuizStep(3)
                      }}
                      className="p-5 rounded-[2rem] border border-slate-100/60 bg-white/70 hover:bg-white text-left hover:border-glowy-pink-soft/30 soft-shadow-sm hover:soft-shadow-md transition-all duration-250 group flex items-start space-x-4"
                    >
                      <div className="p-2.5 rounded-2xl bg-slate-50/80 group-hover:bg-glowy-pink-soft/10 transition-colors duration-250">
                        {opt.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{opt.label}</h4>
                        <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-start pt-4">
                  <button 
                    onClick={() => setQuizStep(1)}
                    className="text-xs text-slate-400 hover:text-slate-700 font-bold uppercase tracking-wider flex items-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Atrás
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Step 3: Texture Preference */}
            {quizStep === 3 && (
              <div className="space-y-6 relative z-10 animate-fade-up">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Paso 3 de 3: Textura de Preferencia</span>
                  <span>99%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100/80 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-glowy-pink-soft to-glowy-pink-deep w-[99%] transition-all duration-500 rounded-full" />
                </div>
                <h3 className="serif-title text-2xl text-slate-800 text-center py-2">
                  ¿Qué textura prefieres en tus cremas?
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { val: 'gel', label: 'Gel Ligero', desc: 'Absorción rápida sin peso graso.', icon: <Droplet className="w-5 h-5 text-teal-400" /> },
                    { val: 'suero', label: 'Suero Fluido', desc: 'Textura acuosa y concentrada.', icon: <Sparkles className="w-5 h-5 text-purple-400" /> },
                    { val: 'rica', label: 'Crema Rica', desc: 'Sensación suntuosa, nutritiva y cremosa.', icon: <Leaf className="w-5 h-5 text-glowy-pink-deep" /> }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        const nextAnswers = { ...quizAnswers, texture: opt.val }
                        setQuizAnswers(nextAnswers)
                        setTimeout(() => {
                          let cleanser = PRODUCTS.find(p => p.id === 'p1')!
                          if (quizAnswers.skinType === 'grasa' || quizAnswers.skinType === 'mixta') {
                            cleanser = PRODUCTS.find(p => p.id === 'p4')!
                          }

                          let treatment = PRODUCTS.find(p => p.id === 'p6')!
                          if (quizAnswers.concern === 'envejecimiento') {
                            treatment = PRODUCTS.find(p => p.id === 'p2')!
                          } else if (quizAnswers.concern === 'manchas') {
                            treatment = PRODUCTS.find(p => p.id === 'p11')!
                          } else if (quizAnswers.concern === 'deshidratación') {
                            treatment = PRODUCTS.find(p => p.id === 'p5')!
                          }

                          let cream = PRODUCTS.find(p => p.id === 'p7')!
                          if (opt.val === 'gel') {
                            cream = PRODUCTS.find(p => p.id === 'p8')!
                          }

                          setRecommendedProducts([cleanser, treatment, cream])
                          setQuizStep(4)
                        }, 50)
                      }}
                      className="p-5 rounded-[2rem] border border-slate-100/60 bg-white/70 hover:bg-white text-center hover:border-glowy-pink-soft/30 soft-shadow-sm hover:soft-shadow-md transition-all duration-250 group flex flex-col items-center"
                    >
                      <div className="p-3 rounded-full bg-slate-50/80 group-hover:bg-glowy-pink-soft/10 mb-3 transition-colors duration-250">
                        {opt.icon}
                      </div>
                      <h4 className="font-semibold text-slate-800 text-sm">{opt.label}</h4>
                      <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-start pt-4">
                  <button 
                    onClick={() => setQuizStep(2)}
                    className="text-xs text-slate-400 hover:text-slate-700 font-bold uppercase tracking-wider flex items-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Atrás
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Results */}
            {quizStep === 4 && (
              <div className="space-y-6 relative z-10 animate-fade-up">
                <div className="text-center">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase tracking-[0.15em] border border-emerald-100/60">
                    <Check className="w-3 h-3 mr-1" /> Rutina Generada
                  </span>
                  <h3 className="serif-title text-3xl text-slate-800 mt-3">
                    Tu Rutina de Belleza Ideal
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-1.5">
                    Diseñada para piel <span className="font-bold text-slate-700">{quizAnswers.skinType}</span> con enfoque en <span className="font-bold text-slate-700">{quizAnswers.concern}</span>.
                  </p>
                </div>

                {/* Routine 3-Step */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {recommendedProducts.map((prod, idx) => (
                    <div key={prod.id} className="bg-white/95 rounded-[2.5rem] p-5 border border-slate-100/50 soft-shadow-md flex flex-col items-center relative group soft-lift">
                      
                      <span className="absolute -top-3 left-4 bg-slate-900 text-white text-[9px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider soft-shadow-sm">
                        Paso {idx + 1}
                      </span>
                      
                      <div className="w-32 h-32 rounded-2xl overflow-hidden mt-3 bg-slate-50/50">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=300'
                          }}
                        />
                      </div>
                      
                      <span className="text-[9px] font-semibold text-glowy-pink-deep uppercase tracking-[0.15em] mt-3">
                        {prod.category === 'cleanse' ? 'Limpieza' : prod.category === 'treat' ? 'Tratamiento' : 'Hidratación'}
                      </span>
                      
                      <h4 className="font-bold text-slate-800 text-sm text-center mt-1 truncate w-full">{prod.name}</h4>
                      
                      <p className="text-[11px] text-slate-500 text-center font-light mt-1 h-12 overflow-hidden leading-relaxed">
                        {prod.description}
                      </p>
                      
                      <div className="flex items-center justify-between w-full border-t border-slate-100/50 pt-3 mt-3">
                        <span className="font-extrabold text-slate-800 text-sm">${prod.price.toLocaleString('es-CL')}</span>
                        <button 
                          onClick={() => addToCart(prod)}
                          className="p-1.5 rounded-full bg-slate-50/80 hover:bg-glowy-pink-soft/15 text-slate-600 hover:text-glowy-pink-deep transition-all duration-250"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-slate-100/50">
                  <button
                    onClick={() => {
                      setQuizStep(0)
                      setQuizAnswers({ skinType: '', concern: '', texture: '' })
                    }}
                    className="text-xs text-slate-400 hover:text-slate-700 font-bold uppercase tracking-wider order-2 sm:order-1 transition-colors"
                  >
                    Repetir Test
                  </button>
                  <button
                    onClick={addRoutineToCart}
                    className="px-10 py-4 bg-glowy-pink-deep hover:bg-glowy-pink-deep/90 text-white text-xs font-bold tracking-widest uppercase rounded-full soft-shadow-md hover:soft-shadow-lg active:scale-95 transition-all duration-300 flex items-center space-x-2 order-1 sm:order-2"
                  >
                    <span>Comprar Rutina Completa</span>
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ═══ Section Divider (Soft light-to-light gradient) ═══ */}
      <div className="h-32 -mt-16 -mb-16 relative z-10 pointer-events-none bg-gradient-to-b from-[#faf7f8] via-[#F0A6C5]/20 to-white" />

      {/* ═══════════════════════════════════════════════════════
          CATALOG — Horizontal Slider with Soft UI Cards
          ═══════════════════════════════════════════════════════ */}
      <span id="catalogo" className="block relative -top-24" />
      <section className="bg-white py-16 relative overflow-hidden">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-glowy-pink-deep">Colección de Culto</span>
            <h2 className="serif-title text-4xl text-slate-800 font-light mt-1">Favoritos de Corea</h2>
            <p className="text-slate-500 text-xs mt-1.5 font-light">Explora nuestra colección completa de marcas prestigiosas coreanas.</p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleCatalogScroll('left')}
              className="p-3 rounded-full border border-slate-200/60 bg-white hover:bg-slate-50 text-slate-600 soft-shadow-sm hover:soft-shadow active:scale-90 transition-all duration-250 flex items-center justify-center hover:border-glowy-pink-soft/30"
              aria-label="Deslizar izquierda"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleCatalogScroll('right')}
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
            ref={catalogScrollRef}
            className="flex overflow-x-auto space-x-3 py-4 px-2 no-scrollbar catalog-scroll"
            style={{ WebkitOverflowScrolling: "touch" }}
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => { isDragging.current = true; dragStartX.current = e.pageX - catalogScrollRef.current!.offsetLeft; dragScrollLeft.current = catalogScrollRef.current!.scrollLeft; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => { if (!isDragging.current) return; e.preventDefault(); const x = e.pageX - catalogScrollRef.current!.offsetLeft; const walk = (x - dragStartX.current) * 1.5; catalogScrollRef.current!.scrollLeft = dragScrollLeft.current - walk; }}
          >
            {PRODUCTS.map((prod) => (
              <div 
                key={prod.id} 
                className="min-w-[240px] w-[240px] aspect-[3/4] rounded-xl bg-white border border-slate-100/40 soft-shadow relative overflow-hidden group transition-all duration-500 hover:soft-shadow-xl hover:scale-[1.02]"
              >
                <CardHoverReveal className="size-full">
                  
                  {/* Tag Badge */}
                  <Badge className="absolute top-4 left-4 z-10 font-bold bg-white/95 text-slate-700 hover:bg-white text-[9px] uppercase tracking-wider rounded-full px-3 py-1 soft-shadow-sm border border-slate-100/60" variant="outline">
                    {prod.tag}
                  </Badge>
                  
                  {/* Favorite */}
                  <button
                    onClick={() => toggleFavorite(prod.id)}
                    className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-red-500 transition-all duration-250 soft-shadow-sm"
                    aria-label="Agregar a favoritos"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(prod.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  
                  {/* Product Image */}
                  <CardHoverRevealMain className="w-full h-full bg-slate-50/10 flex items-center justify-center p-0">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400'
                      }}
                    />
                  </CardHoverRevealMain>
                  
                  {/* Hover Reveal Content */}
                  <CardHoverRevealContent className="rounded-[2rem] glassmorphism border-white/50">
                    <span className="text-[9px] text-glowy-pink-deep font-bold uppercase tracking-[0.15em]">{prod.brand}</span>
                    <h3 className="serif-title font-extrabold text-slate-800 text-base mt-0.5 leading-tight">{prod.name}</h3>
                    <p className="text-[10px] text-slate-600 font-light mt-1.5 h-12 overflow-hidden leading-relaxed">
                      {prod.description}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-slate-200/40 pt-4 mt-3">
                      <span className="font-extrabold text-slate-900 text-sm">${prod.price.toLocaleString('es-CL')}</span>
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
            ))}
          </div>

        </div>
      </section>

      {/* ═══ Section Divider (Soft light-to-light gradient) ═══ */}
      <div className="h-32 -mt-16 -mb-16 relative z-10 pointer-events-none bg-gradient-to-b from-white via-[#EACDDB]/20 to-[#faf7f8]" />

      {/* ═══════════════════════════════════════════════════════
          BRAND PHILOSOPHY — Soft UI Benefit Cards
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-[#faf7f8] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-glowy-pink-deep">Sabiduría Coreana</span>
          <h2 className="serif-title text-3xl sm:text-4xl text-slate-800 font-light mt-2 mb-12">Por Qué Cuidar Tu Piel Con K-Skincare</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Ingredientes Naturales', 
                desc: 'Fórmulas enriquecidas con centella asiática, té verde fermentado, ginseng y mucina para una nutrición sin químicos agresivos.', 
                icon: <Leaf className="w-5 h-5 text-emerald-500" />, 
                img: '/natural_ingredients.png' 
              },
              { 
                title: 'Hidratación Profunda', 
                desc: 'El corazón del cuidado coreano es crear capas de agua en la epidermis, logrando ese ansiado acabado jugoso y luminoso.', 
                icon: <Droplet className="w-5 h-5 text-cyan-500" />, 
                img: '/deep_hydration.png' 
              },
              { 
                title: 'Barrera de Piel Fuerte', 
                desc: 'Prevenimos la pérdida de agua transepidérmica regenerando la barrera de lípidos en lugar de pelar la piel con ácidos.', 
                icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />, 
                img: '/skin_barrier.png' 
              }
            ].map((benefit, i) => (
              <div 
                key={i} 
                className="group philosophy-card bg-white rounded-[2.5rem] border border-slate-100/60 flex flex-col overflow-hidden text-left"
              >
                {/* Image Container */}
                <div className="w-full aspect-[16/11] overflow-hidden bg-slate-50 relative">
                  <img 
                    src={benefit.img} 
                    alt={benefit.title} 
                    className="w-full h-full object-cover philosophy-card-image"
                  />
                  {/* Floating Icon badge */}
                  <div className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl soft-shadow-sm border border-slate-100/50 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-7 sm:p-8 flex flex-col">
                  <h3 className="serif-title font-bold text-slate-800 text-lg mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-light leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Section Divider (Soft light-to-light gradient) ═══ */}
      <div className="h-32 -mt-16 -mb-16 relative z-10 pointer-events-none bg-gradient-to-b from-white via-[#F0A6C5]/20 to-white" />

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS SECTION — Premium Infinite Marquee
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-white via-glowy-pink-soft/8 to-[#faf7f8] relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute right-[-10%] top-[20%] w-[350px] h-[350px] bg-glowy-pink-soft/10 rounded-full filter blur-[80px] pointer-events-none" />
        <div className="absolute left-[-10%] bottom-[20%] w-[350px] h-[350px] bg-glowy-blue-light/10 rounded-full filter blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-glowy-pink-deep">Experiencias Glowy</span>
          <h2 className="serif-title text-3xl sm:text-4xl text-slate-800 font-light mt-2">Lo Que Opinan Nuestras Clientas</h2>
          <p className="text-slate-500 text-xs mt-2 font-light max-w-md mx-auto">Únete a miles de personas que han transformado su rutina con la sabiduría del K-Beauty.</p>
        </div>

        {/* Testimonials Ticker Container */}
        <div className="ticker-container w-full overflow-hidden relative py-4">
          <div className="testimonials-track flex items-stretch space-x-6 py-2">
            {[
              { name: 'Camila', city: 'Santiago', skin: 'Piel Sensible', text: 'La Pomerizing Cream es una joya. Logra hidratar a profundidad sin irritar mi piel. ¡Mi rostro brilla como nunca!', emoji: '🌸' },
              { name: 'Javiera', city: 'Viña del Mar', skin: 'Piel Seca', text: 'El Retinol Active Liposome es ultra suave. Llevo semanas usándolo y mis poros están más cerrados y sin ninguna descamación.', emoji: '🍵' },
              { name: 'Valentina', city: 'Concepción', skin: 'Piel Mixta', text: 'El Rice Water Radiance Toner es mágico. Unificó mi tono de piel y me dio una luminosidad espectacular de inmediato.', emoji: '🍊' },
              { name: 'Catalina', city: 'La Serena', skin: 'Piel Deshidratada', text: 'La esencia de Snail Mucin salvó mi barrera cutánea. Mi piel ya no se siente tirante bajo el maquillaje. Un imprescindible.', emoji: '🍯' },
              { name: 'Francisca', city: 'Temuco', skin: 'Piel Grasa', text: 'La Green Tea Seed Cream es ultra-ligera y se absorbe al instante. Controla los brillos todo el día. Muy fresca.', emoji: '🌿' },
              { name: 'Constanza', city: 'Antofagasta', skin: 'Piel Acneica', text: 'Combinar el limpiador de Heartleaf con los parches Hydro-Lock calmó por completo mi acné hormonal. Increíble.', emoji: '🍑' },
              // Duplicate reviews to make loop seamless
              { name: 'Camila', city: 'Santiago', skin: 'Piel Sensible', text: 'La Pomerizing Cream es una joya. Logra hidratar a profundidad sin irritar mi piel. ¡Mi rostro brilla como nunca!', emoji: '🌸' },
              { name: 'Javiera', city: 'Viña del Mar', skin: 'Piel Seca', text: 'El Retinol Active Liposome es ultra suave. Llevo semanas usándolo y mis poros están más cerrados y sin ninguna descamación.', emoji: '🍵' },
              { name: 'Valentina', city: 'Concepción', skin: 'Piel Mixta', text: 'El Rice Water Radiance Toner es mágico. Unificó mi tono de piel y me dio una luminosidad espectacular de inmediato.', emoji: '🍊' },
              { name: 'Catalina', city: 'La Serena', skin: 'Piel Deshidratada', text: 'La esencia de Snail Mucin salvó mi barrera cutánea. Mi piel ya no se siente tirante bajo el maquillaje. Un imprescindible.', emoji: '🍯' },
              { name: 'Francisca', city: 'Temuco', skin: 'Piel Grasa', text: 'La Green Tea Seed Cream es ultra-ligera y se absorbe al instante. Controla los brillos todo el día. Muy fresca.', emoji: '🌿' },
              { name: 'Constanza', city: 'Antofagasta', skin: 'Piel Acneica', text: 'Combinar el limpiador de Heartleaf con los parches Hydro-Lock calmó por completo mi acné hormonal. Increíble.', emoji: '🍑' }
            ].map((item, i) => (
              <div 
                key={i} 
                className="w-[300px] sm:w-[320px] bg-white/70 backdrop-blur-md border border-white/60 p-6 rounded-[2rem] soft-shadow hover:soft-shadow-lg flex flex-col justify-between flex-shrink-0 transition-all duration-300 hover:scale-[1.02] cursor-default"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs font-light leading-relaxed italic mb-6">
                    "{item.text}"
                  </p>
                </div>
                
                {/* Author Info */}
                <div className="flex items-center space-x-3.5 border-t border-slate-100/60 pt-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-lg soft-shadow-sm border border-slate-100/50">
                    {item.emoji}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-xs">{item.name}</h4>
                    <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 mt-0.5">
                      <span>{item.city}</span>
                      <span>•</span>
                      <span className="text-glowy-pink-deep font-semibold">{item.skin}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Section Divider (Soft light-to-light gradient) ═══ */}
      <div className="h-32 -mt-16 -mb-16 relative z-10 pointer-events-none bg-gradient-to-b from-[#faf7f8] via-[#EACDDB]/20 to-white" />

      {/* ═══════════════════════════════════════════════════════
          NEWSLETTER — Premium CTA
          ═══════════════════════════════════════════════════════ */}
      <span id="newsletter" className="block relative -top-24" />
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-glowy-pink-soft/8 via-white to-glowy-lavender/10 rounded-[2.5rem] p-8 sm:p-12 border border-glowy-pink-soft/15 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden soft-shadow-md">
            
            {/* Ambient decoration */}
            <div className="absolute right-0 top-0 w-44 h-44 bg-glowy-pink-soft/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-32 h-32 bg-glowy-blue-light/15 rounded-full blur-[50px] pointer-events-none" />
            
            <div className="w-full md:w-1/2 space-y-4 text-center md:text-left relative z-10">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 text-[10px] font-bold uppercase tracking-[0.15em] text-glowy-pink-deep border border-glowy-pink-soft/15 soft-shadow-sm">
                <Heart className="w-3 h-3 mr-1.5" />
                Únete a la Comunidad
              </span>
              <h2 className="serif-title text-3xl text-slate-800 font-light mt-2">¿Deseas un 10% de descuento?</h2>
              <p className="text-xs text-slate-500 font-light max-w-sm leading-relaxed">
                Regístrate a nuestro boletín para consejos semanales de k-beauty y recibe un código de descuento único en tu primera compra.
              </p>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-center relative z-10">
              {subscribed ? (
                <div className="p-4 bg-white/90 rounded-2xl border border-emerald-200/40 flex items-center space-x-3 text-emerald-600 animate-scale-in soft-shadow-sm">
                  <Check className="w-5 h-5 bg-emerald-100 p-0.5 rounded-full" />
                  <span className="text-xs font-semibold">¡Suscrito con éxito! Código enviado a tu email.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Tu dirección de correo electrónico..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3.5 rounded-full border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-glowy-pink-soft/50 focus:border-glowy-pink-soft/30 text-xs bg-white/80 soft-shadow-sm transition-all"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-slate-900 hover:bg-glowy-pink-deep text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 active:scale-95 soft-shadow-md hover:soft-shadow-lg"
                  >
                    Suscribirse
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BRANDS MARQUEE / TICKER
          ═══════════════════════════════════════════════════════ */}
      <section className="py-10 bg-gradient-to-r from-glowy-pink-soft/5 via-[#faf7f8] to-glowy-lavender/5 border-t border-slate-100/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-glowy-pink-deep">Marcas Que Ofrecemos</span>
        </div>
        <div className="ticker-container w-full overflow-hidden relative">
          <div className="animate-ticker flex items-center space-x-12 py-2">
            {[
              'SKIN1004', 'KSECRET', 'ROUND LAB', 'ETUDE', 'Dr. Althea', 'medicube',
              'Mixsoon', 'Beauty of Joseon', 'Purito SEOUL', 'celimax', 'APLB',
              // Duplicate to ensure seamless looping
              'SKIN1004', 'KSECRET', 'ROUND LAB', 'ETUDE', 'Dr. Althea', 'medicube',
              'Mixsoon', 'Beauty of Joseon', 'Purito SEOUL', 'celimax', 'APLB'
            ].map((brand, i) => (
              <BrandLogo key={i} name={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER — Premium Dark
          ═══════════════════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4">
            <h3 className="serif-title text-xl font-semibold tracking-wide text-white">GLOWYSKIN</h3>
            <p className="text-slate-400 text-xs font-light leading-relaxed max-w-xs">
              Tu portal de confianza para el cuidado facial con raíces en Seúl y envíos nacionales directos. Belleza transparente, limpia y consciente.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://www.instagram.com/glowyskin._cl/?hl=es" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-slate-800 hover:bg-glowy-pink-deep text-slate-300 hover:text-white transition-all duration-300" aria-label="Síguenos en Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" className="p-2.5 rounded-full bg-slate-800 hover:bg-glowy-pink-deep text-slate-300 hover:text-white transition-all duration-300" aria-label="Síguenos en Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-glowy-pink-soft">Explorar Tienda</h4>
            <ul className="space-y-2.5 text-xs font-light text-slate-400">
              <li><a href="#catalogo" className="hover:text-white transition-colors duration-250">Limpiadores Faciales</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors duration-250">Tónicos & Esencias</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors duration-250">Sueros Activos</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors duration-250">Hidratantes Coreanas</a></li>
              <li><a href="#quiz" className="hover:text-white transition-colors duration-250">Test Rutina de Piel</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-glowy-pink-soft">Legales</h4>
            <ul className="space-y-2.5 text-xs font-light text-slate-400">
              <li>
                <button 
                  onClick={() => setLegalModalType('privacy')}
                  className="hover:text-white transition-colors duration-250 text-left"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLegalModalType('terms')}
                  className="hover:text-white transition-colors duration-250 text-left"
                >
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLegalModalType('dmca')}
                  className="hover:text-white transition-colors duration-250 text-left"
                >
                  Aviso de DMCA
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-glowy-pink-soft">Pagos Seguros</h4>
            <p className="text-slate-400 text-xs font-light">Aceptamos tarjetas de débito, crédito y transferencias bancarias directas.</p>
            <div className="flex gap-2 flex-wrap pt-1">
              {['Visa', 'Mastercard', 'PayPal', 'RedCompra', 'WebPay'].map((pay, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-800/80 text-[10px] font-semibold text-slate-300 border border-slate-700/60">
                  {pay}
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs">
          <span>&copy; {new Date().getFullYear()} GLOWYSKIN. Todos los derechos reservados.</span>
          <span className="mt-2 sm:mt-0 flex items-center gap-1.5">
            Diseño Premium K-Beauty <Sparkles className="w-3.5 h-3.5 text-glowy-pink-soft" />
          </span>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════
          USER PROFILE SIDEBAR DRAWER
          ═══════════════════════════════════════════════════════ */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            onClick={() => setIsProfileOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
          />
          
          <div ref={profileRef} className="absolute inset-y-0 right-0 max-w-full flex animate-slide-in">
            <div className="w-screen max-w-xs bg-white soft-shadow-xl h-full flex flex-col">
              
              <div className="p-4 flex items-center justify-between border-b border-slate-100/60 bg-gradient-to-r from-slate-50/50 to-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Mi Perfil GLOWYSKIN</span>
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <UserProfileSidebar 
                user={userProfile} 
                navItems={navItems} 
                onRegister={handleRegister}
                logoutItem={logoutItem} 
                className="border-0 rounded-none shadow-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          SHOPPING CART DRAWER (WhatsApp Checkout)
          ═══════════════════════════════════════════════════════ */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
          />

          <div ref={cartRef} className="absolute inset-y-0 right-0 max-w-full flex animate-slide-in">
            <div className="w-screen max-w-md bg-white soft-shadow-xl h-full flex flex-col">
              
              <div className="p-5 flex items-center justify-between border-b border-slate-100/60 bg-gradient-to-r from-slate-50/50 to-white">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="w-5 h-5 text-glowy-pink-deep" />
                  <h3 className="serif-title font-semibold text-slate-800 text-lg">Mi Carrito</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Cart Items */}
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
                    <button
                      onClick={() => {
                        setIsCartOpen(false)
                        const quizSec = document.getElementById('quiz')
                        if (quizSec) quizSec.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-glowy-pink-deep text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 active:scale-95 soft-shadow-sm"
                    >
                      Hacer Test
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 p-3.5 bg-slate-50/60 rounded-2xl border border-slate-100/50 soft-shadow-sm hover:soft-shadow transition-all duration-250">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-slate-100/40 flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=200'
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-glowy-pink-deep uppercase tracking-[0.15em]">{item.product.brand}</span>
                        <h4 className="font-semibold text-slate-800 text-sm truncate">{item.product.name}</h4>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">${item.product.price.toLocaleString('es-CL')}</p>
                        
                        <div className="flex items-center space-x-2.5 mt-2">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, -1)}
                            className="p-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200/60 text-slate-500 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold text-slate-800 w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, 1)}
                            className="p-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200/60 text-slate-500 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => updateCartQuantity(item.product.id, -item.quantity)}
                        className="p-1.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                        aria-label="Eliminar producto"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-100/60 bg-gradient-to-t from-slate-50/50 to-white space-y-4">
                  {userProfile.isRegistered && (
                    <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100/50 text-emerald-700 text-xs flex items-center justify-between soft-shadow-sm">
                      <span className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Descuento 10% OFF Aplicado</span>
                      </span>
                      <span className="font-bold">-${Math.round(cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) * 0.1).toLocaleString('es-CL')}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-slate-600 font-medium">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-800 text-lg">
                      ${Math.round(
                        cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) * 
                        (userProfile.isRegistered ? 0.9 : 1.0)
                      ).toLocaleString('es-CL')}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center font-light">Envíos gratis en pedidos superiores a $45.000.</p>
                  
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold tracking-widest uppercase rounded-full soft-shadow-md hover:soft-shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                    <span>Completar por WhatsApp</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          LEGAL MODALS
          ═══════════════════════════════════════════════════════ */}
      {legalModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setLegalModalType(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
          />
          
          <div className="relative bg-white/95 backdrop-blur-xl border border-slate-100/60 rounded-[2.5rem] max-w-2xl w-full max-h-[80vh] overflow-y-auto soft-shadow-xl p-6 sm:p-8 animate-scale-in">
            <button 
              onClick={() => setLegalModalType(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModalType === 'privacy' && (
              <div className="space-y-4 text-slate-700">
                <h3 className="serif-title text-2xl font-bold text-slate-800 border-b border-slate-100/60 pb-3">Política de Privacidad</h3>
                <p className="text-xs leading-relaxed font-light">
                  En GLOWYSKIN nos tomamos muy en serio tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos la información personal que nos proporcionas al navegar y comprar en nuestro sitio web.
                </p>
                <h4 className="font-semibold text-sm">1. Recopilación de Información</h4>
                <p className="text-xs leading-relaxed font-light">
                  Recopilamos tu nombre, dirección de correo electrónico, dirección de envío y detalles de facturación únicamente para procesar tus compras de productos de skincare y enviarte boletines de ofertas cuando te suscribes.
                </p>
                <h4 className="font-semibold text-sm">2. Uso de Datos</h4>
                <p className="text-xs leading-relaxed font-light">
                  Tus datos son almacenados en servidores seguros y en ningún caso se venden o sientan a terceras partes sin tu consentimiento expreso, con excepción de los procesadores de pago autorizados (Visa, Paypal, etc.) que permiten completar tus transacciones.
                </p>
                <h4 className="font-semibold text-sm">3. Derechos del Usuario</h4>
                <p className="text-xs leading-relaxed font-light">
                  Tienes el derecho de solicitar la rectificación, limitación o eliminación completa de tus datos de nuestro sistema enviando un correo electrónico a nuestro departamento de soporte legal.
                </p>
              </div>
            )}

            {legalModalType === 'terms' && (
              <div className="space-y-4 text-slate-700">
                <h3 className="serif-title text-2xl font-bold text-slate-800 border-b border-slate-100/60 pb-3">Términos y Condiciones</h3>
                <p className="text-xs leading-relaxed font-light">
                  Al navegar en el sitio web de GLOWYSKIN y realizar pedidos de productos en nuestra plataforma, aceptas cumplir con los siguientes términos y condiciones de servicio.
                </p>
                <h4 className="font-semibold text-sm">1. Envíos y Entregas</h4>
                <p className="text-xs leading-relaxed font-light">
                  Los pedidos se procesan de lunes a viernes en un plazo de 24 a 48 horas tras recibir la confirmación de pago. Los tiempos de tránsito estimados dependen del servicio postal y la ubicación geográfica de entrega.
                </p>
                <h4 className="font-semibold text-sm">2. Reembolsos y Devoluciones</h4>
                <p className="text-xs leading-relaxed font-light">
                  Por razones de higiene y salud pública, no aceptamos cambios ni devoluciones de productos cosméticos o de skincare que hayan sido abiertos, desprecintados o manipulados por el cliente posterior a su entrega.
                </p>
                <h4 className="font-semibold text-sm">3. Limitación de Responsabilidad</h4>
                <p className="text-xs leading-relaxed font-light">
                  Las recomendaciones del Skin Quiz tienen carácter informativo y de orientación estética. Cada tipo de piel es diferente; recomendamos realizar una prueba de parche en el antebrazo antes del primer uso de cualquier producto para evitar reacciones alérgicas.
                </p>
              </div>
            )}

            {legalModalType === 'dmca' && (
              <div className="space-y-4 text-slate-700">
                <h3 className="serif-title text-2xl font-bold text-slate-800 border-b border-slate-100/60 pb-3">Aviso de DMCA</h3>
                <p className="text-xs leading-relaxed font-light">
                  GLOWYSKIN respeta los derechos de propiedad intelectual de otros. Si consideras que algún contenido o imagen presente en este sitio web infringe tus derechos de autor bajo la Digital Millennium Copyright Act (DMCA), puedes notificarnos enviando una solicitud formal.
                </p>
                <h4 className="font-semibold text-sm">Requisitos del Aviso de Infracción:</h4>
                <ul className="list-disc pl-5 text-xs space-y-1 font-light leading-relaxed">
                  <li>Firma física o electrónica del titular de los derechos de autor o de la persona autorizada.</li>
                  <li>Identificación clara del material con derechos de autor que alega que ha sido infringido.</li>
                  <li>Localización exacta (enlace URL) del material infractor en nuestro sitio web.</li>
                  <li>Información de contacto (correo electrónico, dirección y teléfono).</li>
                  <li>Declaración de buena fe y bajo pena de perjurio de que la información provista en la notificación es verídica.</li>
                </ul>
                <p className="text-xs font-light mt-4">
                  El aviso debe dirigirse a: <span className="font-semibold">dmca@glowyskin.com</span>
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end border-t border-slate-100/60 pt-4">
              <button
                onClick={() => setLegalModalType(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-glowy-pink-deep text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 soft-shadow-sm"
              >
                Cerrar Documento
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
