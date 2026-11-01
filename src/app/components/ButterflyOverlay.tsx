'use client'

import dynamic from 'next/dynamic'
import React, { useSyncExternalStore } from 'react'

const ButterflyCanvas = dynamic(() => import('./ButterflyCanvas'), {
  ssr: false,
})
const ButterflyWander = dynamic(() => import('./ButterflyWander'), {
  ssr: false,
})

// Desktop with a mouse: the butterfly follows the cursor.
// Phones and tablets: it pops in now and then and wanders across the screen.
// Anyone who asked the OS for reduced motion gets neither.
const DESKTOP = '(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)'
const TOUCH = '(hover: none) and (prefers-reduced-motion: no-preference)'

const subscribeTo = (query: string) => (onChange: () => void) => {
  const mq = window.matchMedia(query)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}
const subscribeDesktop = subscribeTo(DESKTOP)
const subscribeTouch = subscribeTo(TOUCH)
const getDesktop = () => window.matchMedia(DESKTOP).matches
const getTouch = () => window.matchMedia(TOUCH).matches
const getServerSnapshot = () => false

// Error boundary: if the GLB fails to load or WebGL crashes,
// silently swallow the error so the rest of the page keeps working
class ButterflyErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn('[ButterflyOverlay] 3D effect unavailable:', error.message)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export default function ButterflyOverlay() {
  const desktop = useSyncExternalStore(subscribeDesktop, getDesktop, getServerSnapshot)
  const touch = useSyncExternalStore(subscribeTouch, getTouch, getServerSnapshot)
  if (!desktop && !touch) return null
  return (
    <ButterflyErrorBoundary>
      {desktop ? <ButterflyCanvas /> : <ButterflyWander />}
    </ButterflyErrorBoundary>
  )
}
