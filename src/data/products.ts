// ═══════════════════════════════════════════════════════════════
// GLOWYSKIN — Product Data & Types
// ═══════════════════════════════════════════════════════════════

export interface Product {
  id: string
  name: string
  brand: string
  description: string
  price: number
  tag: string
  image: string        // WebP path
  imageAvif: string    // AVIF path
  imageFallback: string // Original fallback
  category: 'cleanse' | 'treat' | 'moisturize' | 'special'
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Testimonial {
  name: string
  city: string
  skin: string
  text: string
  emoji: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Poremizing Quick Clay Stick Mask',
    brand: 'SKIN1004',
    description: 'Mascarilla de arcilla purificante en stick con centella de Madagascar que absorbe el exceso de sebo y afina los poros en profundidad.',
    price: 15990,
    tag: 'Best Seller',
    image: '/images/Catalogo/pomerizing.webp',
    imageAvif: '/images/Catalogo/pomerizing.avif',
    imageFallback: '/Catalogo/Pomerizing.png',
    category: 'cleanse'
  },
  {
    id: 'p2',
    name: 'SEOUL 1988 Serum: Retinal Liposome 2% + Black Ginseng',
    brand: 'KSECRET',
    description: 'Suero antiedad de alta concentración con 2% de retinal liposomado y extracto de ginseng negro para suavizar arrugas y potenciar la renovación celular.',
    price: 15490,
    tag: 'Favorito',
    image: '/images/Catalogo/8.webp',
    imageAvif: '/images/Catalogo/8.avif',
    imageFallback: '/Catalogo/8.jpeg',
    category: 'treat'
  },
  {
    id: 'p3',
    name: 'Retinol Vitamin C Vitamin E Ampoule Serum',
    brand: 'APLB',
    description: 'Ampolla multi-antioxidante con retinol, vitamina C y vitamina E para iluminar el tono, reducir manchas y rejuvenecer la piel con una fórmula suave.',
    price: 14990,
    tag: 'Iluminador',
    image: '/images/Catalogo/retinol.webp',
    imageAvif: '/images/Catalogo/retinol.avif',
    imageFallback: '/Catalogo/Retinol.png',
    category: 'treat'
  },
  {
    id: 'p4',
    name: 'Combo Sérum The Vita-A Retinal Shot Tightening Booster',
    brand: 'celimax',
    description: 'Booster tensor con retinal de alta pureza y pantenol que estimula la síntesis de colágeno para una piel más firme y luminosa desde la primera aplicación.',
    price: 15990,
    tag: 'Firmeza',
    image: '/images/Catalogo/1.webp',
    imageAvif: '/images/Catalogo/1.avif',
    imageFallback: '/Catalogo/1.jpeg',
    category: 'treat'
  },
  {
    id: 'p5',
    name: 'Probio-Cica Intensive Ampoule',
    brand: 'SKIN1004',
    description: 'Ampolla concentrada de centella de Madagascar enriquecida con probióticos fermentados para calmar pieles reactivas y reforzar la barrera cutánea.',
    price: 12990,
    tag: 'Calmante',
    image: '/images/Catalogo/4.webp',
    imageAvif: '/images/Catalogo/4.avif',
    imageFallback: '/Catalogo/4.jpeg',
    category: 'treat'
  },
  {
    id: 'p6',
    name: 'Tone Brightening Capsule Ampoule',
    brand: 'SKIN1004',
    description: 'Ampolla iluminadora con cápsulas de centella que liberan activos al aplicarse, unificando el tono y aportando un acabado vidrioso y radiante.',
    price: 18490,
    tag: 'Radiancia',
    image: '/images/Catalogo/5.webp',
    imageAvif: '/images/Catalogo/5.avif',
    imageFallback: '/Catalogo/5.jpeg',
    category: 'treat'
  },
  {
    id: 'p7',
    name: 'Probio-Cica Bakuchiol Eye Cream',
    brand: 'SKIN1004',
    description: 'Crema contorno de ojos con bakuchiol y centella fermentada para atenuar ojeras, minimizar líneas finas y restaurar la firmeza del área periocular.',
    price: 15490,
    tag: 'Nutritivo',
    image: '/images/Catalogo/7.webp',
    imageAvif: '/images/Catalogo/7.avif',
    imageFallback: '/Catalogo/7.jpeg',
    category: 'moisturize'
  },
  {
    id: 'p8',
    name: 'Hyalu-Cica Water-Fit Sun Serum SPF50+',
    brand: 'SKIN1004',
    description: 'Sérum solar ultraligero con ácido hialurónico y centella asiática. Fórmula no comedogénica que protege e hidrata dejando un acabado fresco y natural.',
    price: 14490,
    tag: 'Esencial',
    image: '/images/Catalogo/12.webp',
    imageAvif: '/images/Catalogo/12.avif',
    imageFallback: '/Catalogo/12.jpeg',
    category: 'special'
  },
  {
    id: 'p9',
    name: 'Relief Sun: Rice + Probiotics SPF50+',
    brand: 'Beauty of Joseon',
    description: 'Protector solar con 30% de agua de arroz y probióticos de granos para una protección suave, calmante y luminosa, sin residuo blanco.',
    price: 17990,
    tag: 'Protección',
    image: '/images/Catalogo/whatsapp-image-2026-06-18-at-23.03.50.webp',
    imageAvif: '/images/Catalogo/whatsapp-image-2026-06-18-at-23.03.50.avif',
    imageFallback: '/Catalogo/WhatsApp Image 2026-06-18 at 23.03.50.jpeg',
    category: 'special'
  },
  {
    id: 'p10',
    name: 'Relief Sun Aqua-fresh SPF50+',
    brand: 'Beauty of Joseon',
    description: 'Protector solar acuoso y ligero de textura gel, ideal para pieles mixtas o grasas. Hidrata, no obstruye poros y deja la piel fresca todo el día.',
    price: 17990,
    tag: 'Hidratación',
    image: '/images/Catalogo/whatsapp-image-2026-06-18-at-23.03.51.webp',
    imageAvif: '/images/Catalogo/whatsapp-image-2026-06-18-at-23.03.51.avif',
    imageFallback: '/Catalogo/WhatsApp Image 2026-06-18 at 23.03.51.jpeg',
    category: 'special'
  },
  {
    id: 'p11',
    name: 'TXA 6 Niacinamide 10 Retinal Serum',
    brand: 'Purito SEOUL',
    description: 'Sérum bifásico con ácido tranexámico, niacinamida al 10% y retinal que trabaja en sinergia para reducir manchas, cerrar poros y aclarar el tono uniformemente.',
    price: 15990,
    tag: 'Anti-manchas',
    image: '/images/Catalogo/whatsapp-image-2026-06-18-at-23.03.512.webp',
    imageAvif: '/images/Catalogo/whatsapp-image-2026-06-18-at-23.03.512.avif',
    imageFallback: '/Catalogo/WhatsApp Image 2026-06-18 at 23.03.512.jpeg',
    category: 'treat'
  },
  {
    id: 'p12',
    name: 'PDRN Pink Peptide Serum',
    brand: 'medicube',
    description: 'Suero regenerador con PDRN derivado de salmón y péptidos de señalización para una elasticidad extrema, relleno de arrugas y luminosidad duradera.',
    price: 19990,
    tag: 'Regenerador',
    image: '/images/Catalogo/whatsapp-image-2026-06-18-at-23.04.094123123.webp',
    imageAvif: '/images/Catalogo/whatsapp-image-2026-06-18-at-23.04.094123123.avif',
    imageFallback: '/Catalogo/WhatsApp Image 2026-06-18 at 23.04.094123123.jpeg',
    category: 'treat'
  }
]

export const BRANDS = [
  'KSECRET', 'ROUND LAB', 'ETUDE', 'Dr. Althea', 'medicube',
  'mixsoon', 'Beauty of Joseon', 'Purito SEOUL', 'celimax', 'APLB', 'SKIN1004'
] as const

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Camila', city: 'Santiago', skin: 'Piel Sensible', text: 'La Pomerizing Cream es una joya. Logra hidratar a profundidad sin irritar mi piel. ¡Mi rostro brilla como nunca!', emoji: '🌸' },
  { name: 'Javiera', city: 'Viña del Mar', skin: 'Piel Seca', text: 'El Retinol Active Liposome es ultra suave. Llevo semanas usándolo y mis poros están más cerrados y sin ninguna descamación.', emoji: '🍵' },
  { name: 'Valentina', city: 'Concepción', skin: 'Piel Mixta', text: 'El Rice Water Radiance Toner es mágico. Unificó mi tono de piel y me dio una luminosidad espectacular de inmediato.', emoji: '🍊' },
  { name: 'Catalina', city: 'La Serena', skin: 'Piel Deshidratada', text: 'La esencia de Snail Mucin salvó mi barrera cutánea. Mi piel ya no se siente tirante bajo el maquillaje. Un imprescindible.', emoji: '🍯' },
  { name: 'Francisca', city: 'Temuco', skin: 'Piel Grasa', text: 'La Green Tea Seed Cream es ultra-ligera y se absorbe al instante. Controla los brillos todo el día. Muy fresca.', emoji: '🌿' },
  { name: 'Constanza', city: 'Antofagasta', skin: 'Piel Acneica', text: 'Combinar el limpiador de Heartleaf con los parches Hydro-Lock calmó por completo mi acné hormonal. Increíble.', emoji: '🍑' },
]

export const PAYMENT_METHODS = ['Visa', 'Mastercard', 'PayPal', 'RedCompra', 'WebPay'] as const

export const WHATSAPP_NUMBER = '56981888642'
export const INSTAGRAM_URL = 'https://www.instagram.com/glowyskin._cl/?hl=es'
