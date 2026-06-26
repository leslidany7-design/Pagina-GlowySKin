import React, { useState } from 'react'
import { useStore } from '@nanostores/react'
import { Sparkles, ArrowRight, Check, Copy } from 'lucide-react'
import { $userProfile, $isProfileOpen, showToast } from '../../stores/cartStore'

export default function DiscountBanner() {
  const user = useStore($userProfile)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('GLOWY10')
    setCopied(true)
    showToast('Código de cupón GLOWY10 copiado')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#F0A6C5]/35 via-[#EACDDB]/40 to-[#F0A6C5]/30 border-b border-[#F0A6C5]/20 py-2.5 px-4 text-center overflow-hidden relative shadow-sm">
      {/* Background soft shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-shimmer pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs text-slate-700 font-medium relative z-10">
        {!user.isRegistered ? (
          <>
            <div className="flex items-center space-x-2 animate-soft-pulse">
              <Sparkles className="w-4 h-4 text-glowy-pink-deep shrink-0" />
              <p className="leading-relaxed">
                Únete a la comunidad Glowy y obtén un <strong className="font-extrabold text-glowy-pink-deep">10% de descuento</strong> en tu primera compra de K-Beauty.
              </p>
            </div>
            <button
              onClick={() => $isProfileOpen.set(true)}
              className="inline-flex items-center space-x-1 font-bold text-glowy-pink-deep hover:text-[#c44d8e] transition-colors uppercase tracking-wider text-[10px] shrink-0 border-b border-glowy-pink-deep/40 hover:border-glowy-pink-deep"
            >
              <span>Registrarse y activar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <p className="leading-relaxed">
                ¡Tu <strong className="font-bold text-emerald-600">10% OFF</strong> de bienvenida está activo! Usa el cupón en tu pedido:
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center space-x-1.5 bg-white/80 hover:bg-white text-slate-800 font-mono font-bold px-3 py-1 rounded-full border border-glowy-pink-soft/30 shadow-sm active:scale-95 transition-all text-[11px]"
                title="Haga clic para copiar"
              >
                <span>GLOWY10</span>
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400" />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
