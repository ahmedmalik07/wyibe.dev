'use client'

import dynamic from 'next/dynamic'

const ButterflyCanvas = dynamic(() => import('./ButterflyCanvas'), {
  ssr: false,
})

export default function ButterflyOverlay() {
  return <ButterflyCanvas />
}
