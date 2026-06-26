import { useState } from 'react'
import { useStore } from '@nanostores/react'
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  ShoppingBag,
  Sparkles,
  Droplet,
  Flame,
  Leaf,
  Moon,
  Sun,
} from 'lucide-react'
import { addToCart } from '../../stores/cartStore'
import { PRODUCTS, type Product } from '../../data/products'

export default function SkinQuiz() {
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({ skinType: '', concern: '', texture: '' })
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])

  const addRoutineToCart = () => {
    recommendedProducts.forEach(prod => addToCart(prod, 1))
  }

  return (
    <>
      <span id="quiz" className="block relative -top-24" />
      <section className="py-20 bg-gradient-to-b from-[#faf7f8] via-white to-[#faf7f8] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white/80 backdrop-blur-lg p-8 sm:p-12 rounded-[2.5rem] border border-white/50 soft-shadow-lg relative overflow-hidden">

            <div className="absolute -top-16 -left-16 w-40 h-40 bg-glowy-pink-soft/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-glowy-blue-light/20 rounded-full blur-3xl pointer-events-none" />

            {/* Quiz Intro */}
            {quizStep === 0 && (
              <div className="text-center space-y-6 relative z-10">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-glowy-pink-soft/10 to-glowy-lavender/15 text-[10px] font-bold text-glowy-pink-deep uppercase tracking-[0.15em] border border-glowy-pink-soft/10">
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  Personalización Inteligente
                </span>
                <h2 className="serif-title text-3xl sm:text-4xl text-slate-800 font-light">¿No sabes por dónde empezar?</h2>
                <p className="text-slate-500 text-sm max-w-lg mx-auto font-light leading-relaxed">
                  Responde 3 preguntas rápidas y nuestro algoritmo creará una rutina ideal de 3 pasos basada en las necesidades exactas de tu piel.
                </p>
                <div className="pt-4">
                  <button onClick={() => setQuizStep(1)} className="px-8 py-3.5 bg-slate-900 hover:bg-glowy-pink-deep text-white text-xs font-bold tracking-widest uppercase rounded-full soft-shadow-md hover:soft-shadow-lg active:scale-95 transition-all duration-300">
                    Hacer Test de Piel
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Skin Type */}
            {quizStep === 1 && (
              <div className="space-y-6 relative z-10 animate-fade-up">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Paso 1 de 3: Tipo de Piel</span><span>33%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100/80 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-glowy-pink-soft to-glowy-pink-deep w-1/3 transition-all duration-500 rounded-full" />
                </div>
                <h3 className="serif-title text-2xl text-slate-800 text-center py-2">¿Cómo sientes tu piel durante el día?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { val: 'seca', label: 'Tirante y Seca', desc: 'Siento descamación, falta de hidratación y brillo.', icon: <Droplet className="w-5 h-5 text-glowy-blue-pearl" /> },
                    { val: 'grasa', label: 'Grasa / Con Brillo', desc: 'Produzco exceso de grasa en todo el rostro y poros dilatados.', icon: <Flame className="w-5 h-5 text-glowy-pink-deep" /> },
                    { val: 'mixta', label: 'Mixta (Zona T)', desc: 'Frente y nariz grasas, pero mejillas secas o normales.', icon: <Leaf className="w-5 h-5 text-emerald-400" /> },
                    { val: 'sensible', label: 'Sensible / Irritada', desc: 'Tiendo a ponerme roja con facilidad o reaccionar a productos.', icon: <Sparkles className="w-5 h-5 text-amber-400" /> },
                  ].map(opt => (
                    <button key={opt.val} onClick={() => { setQuizAnswers(prev => ({ ...prev, skinType: opt.val })); setQuizStep(2); }}
                      className="p-5 rounded-[2rem] border border-slate-100/60 bg-white/70 hover:bg-white text-left hover:border-glowy-pink-soft/30 soft-shadow-sm hover:soft-shadow-md transition-all duration-250 group flex items-start space-x-4">
                      <div className="p-2.5 rounded-2xl bg-slate-50/80 group-hover:bg-glowy-pink-soft/10 transition-colors duration-250">{opt.icon}</div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{opt.label}</h4>
                        <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-start pt-4">
                  <button onClick={() => setQuizStep(0)} className="text-xs text-slate-400 hover:text-slate-700 font-bold uppercase tracking-wider flex items-center transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Atrás
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Concern */}
            {quizStep === 2 && (
              <div className="space-y-6 relative z-10 animate-fade-up">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Paso 2 de 3: Preocupación Principal</span><span>66%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100/80 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-glowy-pink-soft to-glowy-pink-deep w-2/3 transition-all duration-500 rounded-full" />
                </div>
                <h3 className="serif-title text-2xl text-slate-800 text-center py-2">¿Cuál es tu mayor preocupación hoy?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { val: 'deshidratación', label: 'Deshidratación y Opacidad', desc: 'Piel apagada, sin brillo natural y líneas finas.', icon: <Droplet className="w-5 h-5 text-cyan-400" /> },
                    { val: 'poros', label: 'Acné y Poros Obstruidos', desc: 'Puntos negros, brotes y poros muy visibles.', icon: <Flame className="w-5 h-5 text-red-400" /> },
                    { val: 'manchas', label: 'Manchas y Tono Irregular', desc: 'Hiperpigmentación, marcas de acné o manchas solares.', icon: <Sun className="w-5 h-5 text-amber-500" /> },
                    { val: 'envejecimiento', label: 'Líneas de Expresión y Firmeza', desc: 'Falta de elasticidad y arrugas prematuras.', icon: <Moon className="w-5 h-5 text-indigo-400" /> },
                  ].map(opt => (
                    <button key={opt.val} onClick={() => { setQuizAnswers(prev => ({ ...prev, concern: opt.val })); setQuizStep(3); }}
                      className="p-5 rounded-[2rem] border border-slate-100/60 bg-white/70 hover:bg-white text-left hover:border-glowy-pink-soft/30 soft-shadow-sm hover:soft-shadow-md transition-all duration-250 group flex items-start space-x-4">
                      <div className="p-2.5 rounded-2xl bg-slate-50/80 group-hover:bg-glowy-pink-soft/10 transition-colors duration-250">{opt.icon}</div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{opt.label}</h4>
                        <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-start pt-4">
                  <button onClick={() => setQuizStep(1)} className="text-xs text-slate-400 hover:text-slate-700 font-bold uppercase tracking-wider flex items-center transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Atrás
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Texture */}
            {quizStep === 3 && (
              <div className="space-y-6 relative z-10 animate-fade-up">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Paso 3 de 3: Textura de Preferencia</span><span>99%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100/80 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-glowy-pink-soft to-glowy-pink-deep w-[99%] transition-all duration-500 rounded-full" />
                </div>
                <h3 className="serif-title text-2xl text-slate-800 text-center py-2">¿Qué textura prefieres en tus cremas?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { val: 'gel', label: 'Gel Ligero', desc: 'Absorción rápida sin peso graso.', icon: <Droplet className="w-5 h-5 text-teal-400" /> },
                    { val: 'suero', label: 'Suero Fluido', desc: 'Textura acuosa y concentrada.', icon: <Sparkles className="w-5 h-5 text-purple-400" /> },
                    { val: 'rica', label: 'Crema Rica', desc: 'Sensación suntuosa, nutritiva y cremosa.', icon: <Leaf className="w-5 h-5 text-glowy-pink-deep" /> },
                  ].map(opt => (
                    <button key={opt.val} onClick={() => {
                      const nextAnswers = { ...quizAnswers, texture: opt.val }
                      setQuizAnswers(nextAnswers)
                      setTimeout(() => {
                        let cleanser = PRODUCTS.find(p => p.id === 'p1')!
                        if (quizAnswers.skinType === 'grasa' || quizAnswers.skinType === 'mixta') cleanser = PRODUCTS.find(p => p.id === 'p4')!
                        let treatment = PRODUCTS.find(p => p.id === 'p6')!
                        if (quizAnswers.concern === 'envejecimiento') treatment = PRODUCTS.find(p => p.id === 'p2')!
                        else if (quizAnswers.concern === 'manchas') treatment = PRODUCTS.find(p => p.id === 'p11')!
                        else if (quizAnswers.concern === 'deshidratación') treatment = PRODUCTS.find(p => p.id === 'p5')!
                        let cream = PRODUCTS.find(p => p.id === 'p7')!
                        if (opt.val === 'gel') cream = PRODUCTS.find(p => p.id === 'p8')!
                        setRecommendedProducts([cleanser, treatment, cream])
                        setQuizStep(4)
                      }, 50)
                    }}
                      className="p-5 rounded-[2rem] border border-slate-100/60 bg-white/70 hover:bg-white text-center hover:border-glowy-pink-soft/30 soft-shadow-sm hover:soft-shadow-md transition-all duration-250 group flex flex-col items-center">
                      <div className="p-3 rounded-full bg-slate-50/80 group-hover:bg-glowy-pink-soft/10 mb-3 transition-colors duration-250">{opt.icon}</div>
                      <h4 className="font-semibold text-slate-800 text-sm">{opt.label}</h4>
                      <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-start pt-4">
                  <button onClick={() => setQuizStep(2)} className="text-xs text-slate-400 hover:text-slate-700 font-bold uppercase tracking-wider flex items-center transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Atrás
                  </button>
                </div>
              </div>
            )}

            {/* Results */}
            {quizStep === 4 && (
              <div className="space-y-6 relative z-10 animate-fade-up">
                <div className="text-center">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase tracking-[0.15em] border border-emerald-100/60">
                    <Check className="w-3 h-3 mr-1" /> Rutina Generada
                  </span>
                  <h3 className="serif-title text-3xl text-slate-800 mt-3">Tu Rutina de Belleza Ideal</h3>
                  <p className="text-xs text-slate-500 font-light mt-1.5">
                    Diseñada para piel <span className="font-bold text-slate-700">{quizAnswers.skinType}</span> con enfoque en <span className="font-bold text-slate-700">{quizAnswers.concern}</span>.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {recommendedProducts.map((prod, idx) => (
                    <div key={prod.id} className="bg-white/95 rounded-[2.5rem] p-5 border border-slate-100/50 soft-shadow-md flex flex-col items-center relative group soft-lift">
                      <span className="absolute -top-3 left-4 bg-slate-900 text-white text-[9px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider soft-shadow-sm">Paso {idx + 1}</span>
                      <div className="w-32 h-32 rounded-2xl overflow-hidden mt-3 bg-slate-50/50">
                        <picture>
                          <source srcSet={prod.imageAvif} type="image/avif" />
                          <source srcSet={prod.image} type="image/webp" />
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                        </picture>
                      </div>
                      <span className="text-[9px] font-semibold text-glowy-pink-deep uppercase tracking-[0.15em] mt-3">
                        {prod.category === 'cleanse' ? 'Limpieza' : prod.category === 'treat' ? 'Tratamiento' : 'Hidratación'}
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm text-center mt-1 truncate w-full">{prod.name}</h4>
                      <p className="text-[11px] text-slate-500 text-center font-light mt-1 h-12 overflow-hidden leading-relaxed">{prod.description}</p>
                      <div className="flex items-center justify-between w-full border-t border-slate-100/50 pt-3 mt-3">
                        <span className="font-extrabold text-slate-800 text-sm">${prod.price.toLocaleString('es-CL')}</span>
                        <button onClick={() => addToCart(prod)} className="p-1.5 rounded-full bg-slate-50/80 hover:bg-glowy-pink-soft/15 text-slate-600 hover:text-glowy-pink-deep transition-all duration-250">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-slate-100/50">
                  <button onClick={() => { setQuizStep(0); setQuizAnswers({ skinType: '', concern: '', texture: '' }); }}
                    className="text-xs text-slate-400 hover:text-slate-700 font-bold uppercase tracking-wider order-2 sm:order-1 transition-colors">Repetir Test</button>
                  <button onClick={addRoutineToCart}
                    className="px-10 py-4 bg-glowy-pink-deep hover:bg-glowy-pink-deep/90 text-white text-xs font-bold tracking-widest uppercase rounded-full soft-shadow-md hover:soft-shadow-lg active:scale-95 transition-all duration-300 flex items-center space-x-2 order-1 sm:order-2">
                    <span>Comprar Rutina Completa</span>
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}
