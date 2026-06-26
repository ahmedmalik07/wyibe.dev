'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const ButterflyCanvas = dynamic(() => import('./ButterflyCanvas'), {
  ssr: false,
})

// Error boundary — if the GLB fails to load or WebGL crashes,
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
    // Log silently — don't surface to user
    console.warn('[ButterflyOverlay] 3D effect unavailable:', error.message)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export default function ButterflyOverlay() {
  return (
    <ButterflyErrorBoundary>
      <ButterflyCanvas />
    </ButterflyErrorBoundary>
  )
}
