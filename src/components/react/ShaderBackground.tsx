import { MeshGradient } from '@paper-design/shaders-react'
import type React from 'react'

interface Props {
  children?: React.ReactNode
}

export default function ShaderBackground({ children }: Props) {
  return (
    <div className="min-h-[680px] w-full relative overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves={1} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={0.3} />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      {/* Primary Mesh Gradient */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={['#faf7f8', '#F0A6C5', '#EACDDB', '#D1DCE0', '#ffffff']}
        speed={0.25}
      />
      {/* Secondary overlay */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-30"
        colors={['#ffffff', '#EACDDB', '#F0A6C5', '#ffffff']}
        speed={0.15}
      />

      {/* Soft vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20 pointer-events-none" />

      {children}
    </div>
  )
}
