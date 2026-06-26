import { useState } from 'react'
import { useStore } from '@nanostores/react'
import { motion } from 'framer-motion'
import { ChevronRight, Copy, Check, Sparkles, X, Star, Truck, Home, Eye, Heart, Settings, LogOut } from 'lucide-react'
import { $isProfileOpen, $userProfile, registerUser, logoutUser } from '../../stores/cartStore'

const AVATAR_OPTIONS = [
  { id: 'av1', name: 'Flor de Cerezo', emoji: '🌸' },
  { id: 'av2', name: 'Té Verde', emoji: '🍵' },
  { id: 'av3', name: 'Mandarina Jeju', emoji: '🍊' },
  { id: 'av4', name: 'Arroz Wash', emoji: '🍚' },
  { id: 'av5', name: 'Miel Real', emoji: '🍯' },
  { id: 'av6', name: 'Melocotón', emoji: '🍑' },
  { id: 'av7', name: 'Skincare', emoji: '🧖‍♀️' },
  { id: 'av8', name: 'Bambú', emoji: '🎋' },
  { id: 'av9', name: 'Mandu', emoji: '🥟' },
  { id: 'av10', name: 'Palillos', emoji: '🥢' },
]

const sidebarVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
}

const navItems = [
  { label: 'Mis Pedidos', href: '#catalogo', icon: <Truck className="h-full w-full" /> },
  { label: 'Reseñas', href: '#', icon: <Star className="h-full w-full" /> },
  { label: 'Direcciones', href: '#', icon: <Home className="h-full w-full" /> },
  { label: 'Vistos Recientemente', href: '#catalogo', icon: <Eye className="h-full w-full" /> },
  { label: 'Favoritos', href: '#catalogo', icon: <Heart className="h-full w-full" /> },
  { label: 'Configuración', href: '#', icon: <Settings className="h-full w-full" />, isSeparator: true },
]

export default function ProfileDrawer() {
  const isOpen = useStore($isProfileOpen)
  const user = useStore($userProfile)
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [selectedAv, setSelectedAv] = useState(AVATAR_OPTIONS[0].emoji)
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('GLOWY10')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (regName.trim() && regEmail.trim()) {
      registerUser(regName.trim(), regEmail.trim(), selectedAv)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={() => $isProfileOpen.set(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
      <div className="absolute inset-y-0 right-0 max-w-full flex animate-slide-in">
        <div className="w-screen max-w-xs bg-white soft-shadow-xl h-full flex flex-col">

          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-slate-100/60 bg-gradient-to-r from-slate-50/50 to-white">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Mi Perfil GLOWYSKIN</span>
            <button onClick={() => $isProfileOpen.set(false)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <motion.aside className="flex h-full w-full flex-col p-5 overflow-y-auto no-scrollbar" initial="hidden" animate="visible" variants={sidebarVariants}>
            {user.isRegistered ? (
              <>
                {/* User Info */}
                <motion.div variants={itemVariants} className="flex items-center space-x-4 p-2">
                  <div className="h-14 w-14 text-2xl rounded-full bg-glowy-pink-soft/20 flex items-center justify-center border-2 border-glowy-pink-soft/40 shadow-sm">
                    {user.avatarUrl || '🌸'}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-semibold text-base text-slate-800 flex items-center">
                      {user.name}
                      <Sparkles className="w-3.5 h-3.5 text-glowy-pink-deep ml-1" />
                    </span>
                    <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                  </div>
                </motion.div>

                {/* Coupon */}
                <motion.div variants={itemVariants} className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-glowy-pink-soft/10 to-glowy-lavender/30 border border-glowy-pink-soft/20 flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-glowy-pink-deep uppercase tracking-wider">Tu Regalo de Bienvenida</span>
                    <span className="px-2 py-0.5 rounded-full bg-glowy-pink-deep text-white text-[9px] font-bold">10% OFF</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-light">Usa este cupón en tu primera compra escribiendo en WhatsApp.</p>
                  <div className="flex items-center justify-between bg-white rounded-xl p-2 border border-slate-100 shadow-sm">
                    <span className="font-mono font-bold text-slate-800 text-sm pl-1">GLOWY10</span>
                    <button onClick={handleCopyCoupon} className="p-1.5 rounded-lg bg-slate-50 hover:bg-glowy-pink-soft/10 text-slate-500 hover:text-glowy-pink-deep transition-all flex items-center justify-center" aria-label="Copiar cupón">
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="my-4 border-t border-border" />

                {/* Nav Links */}
                <nav className="flex-1 space-y-1" role="navigation">
                  {navItems.map((item, index) => (
                    <div key={index}>
                      {item.isSeparator && <motion.div variants={itemVariants} className="h-6" />}
                      <motion.a href={item.href} variants={itemVariants}
                        className="group flex items-center rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-glowy-pink-deep hover:bg-glowy-pink-soft/5 transition-all">
                        <span className="mr-3 h-5 w-5 text-slate-400 group-hover:text-glowy-pink-deep transition-colors">{item.icon}</span>
                        <span>{item.label}</span>
                        <ChevronRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </motion.a>
                    </div>
                  ))}
                </nav>

                {/* Logout */}
                <motion.div variants={itemVariants} className="mt-4 border-t border-slate-100 pt-4">
                  <button onClick={logoutUser} className="group flex w-full items-center rounded-2xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
                    <span className="mr-3 h-5 w-5"><LogOut className="h-full w-full" /></span>
                    <span>Cerrar Sesión</span>
                  </button>
                </motion.div>
              </>
            ) : (
              /* Registration Form */
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <motion.div variants={itemVariants} className="text-center space-y-2">
                    <div className="inline-flex p-3 rounded-full bg-glowy-pink-soft/10 text-glowy-pink-deep mb-1">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                    <h3 className="serif-title text-xl font-bold text-slate-800">Tu Cuenta GLOWYSKIN</h3>
                    <p className="text-xs text-slate-500 font-light">
                      Crea tu cuenta personalizada y recibe de inmediato un <strong>10% de descuento</strong> en tu primera compra de k-beauty.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="border-t border-slate-100 my-2" />

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div variants={itemVariants} className="space-y-1">
                      <label htmlFor="reg-name" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Nombre Completo</label>
                      <input id="reg-name" type="text" required placeholder="Tu nombre..." value={regName} onChange={(e) => setRegName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-glowy-pink-soft text-xs" />
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-1">
                      <label htmlFor="reg-email" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Correo Electrónico</label>
                      <input id="reg-email" type="email" required placeholder="ejemplo@correo.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-glowy-pink-soft text-xs" />
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Elige tu avatar K-beauty</label>
                      <div className="grid grid-cols-5 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        {AVATAR_OPTIONS.map(av => (
                          <button key={av.id} type="button" onClick={() => setSelectedAv(av.emoji)} title={av.name}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all border-2 active:scale-95 hover:bg-white ${selectedAv === av.emoji ? 'border-glowy-pink-deep bg-white scale-105 shadow-sm ring-2 ring-glowy-pink-soft/20' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                            {av.emoji}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="pt-2">
                      <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-glowy-pink-deep text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-md hover:shadow-lg transition-all active:scale-95">
                        CREAR MI PERFIL · ACTIVAR 10% OFF
                      </button>
                    </motion.div>
                  </form>
                </div>
                <motion.div variants={itemVariants} className="text-center pt-4">
                  <span className="text-[9px] text-slate-400 font-light">Al registrarte aceptas recibir promociones de K-Beauty.</span>
                </motion.div>
              </div>
            )}
          </motion.aside>

        </div>
      </div>
    </div>
  )
}
