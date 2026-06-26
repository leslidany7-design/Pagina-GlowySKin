import React from 'react'
import { useStore } from '@nanostores/react'
import { $toastMessage } from '../../stores/cartStore'

export default function Toast() {
  const toastMessage = useStore($toastMessage)

  if (!toastMessage) return null

  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-up glassmorphism px-5 py-3.5 rounded-2xl flex items-center space-x-3 text-sm font-medium text-slate-700 soft-shadow-md max-w-sm">
      <span className="w-2 h-2 rounded-full bg-glowy-pink-deep animate-soft-pulse flex-shrink-0" />
      <span className="leading-snug">{toastMessage}</span>
    </div>
  )
}
