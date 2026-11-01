'use client'

import dynamic from 'next/dynamic'
import React, { useSyncExternalStore } from 'react'

const ButterflyCanvas = dynamic(() => import('./ButterflyCanvas'), {
  ssr: false,
})

// The butterfly follows the mouse, so it only makes sense on desktop with a real
// pointer. On phones and tablets it used to download a 1MB+ 3D model and run
// WebGL for nothing. Users who ask for reduced motion also skip it.
const QUERY =
  '(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)'

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

const getSnapshot = () => window.matchMedia(QUERY).matches
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
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  if (!enabled) return null
  return (
    <ButterflyErrorBoundary>
      <ButterflyCanvas />
    </ButterflyErrorBoundary>
  )
}
