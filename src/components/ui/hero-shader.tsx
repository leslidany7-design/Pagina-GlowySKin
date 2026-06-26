"use client"

import type React from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  return (
    <div className="min-h-[680px] w-full relative overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Primary Mesh Gradient — luminous GLOWYSKIN palette */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#faf7f8", "#F0A6C5", "#EACDDB", "#D1DCE0", "#ffffff"]}
        speed={0.25}
      />
      {/* Secondary overlay — softer depth layer */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-30"
        colors={["#ffffff", "#EACDDB", "#F0A6C5", "#ffffff"]}
        speed={0.15}
      />

      {/* Soft vignette overlay for content legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20 pointer-events-none" />

      {children}
    </div>
  )
}
