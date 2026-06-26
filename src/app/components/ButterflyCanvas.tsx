'use client'

import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Size of the canvas box in px — small enough to never cover buttons
const SIZE = 140

function Butterfly() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/fantasy_butterfly_animation.glb')
  const { actions } = useAnimations(animations, groupRef)
  const floatRef = useRef(0)

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0]
      if (firstAction) {
        firstAction.reset().fadeIn(0.5).play()
        firstAction.setLoop(THREE.LoopRepeat, Infinity)
        firstAction.timeScale = 2
      }
    }
  }, [actions])

  useFrame((state) => {
    if (!groupRef.current) return
    floatRef.current = Math.sin(state.clock.elapsedTime * 2.5) * 0.04
    groupRef.current.position.y = floatRef.current
    // gentle idle sway
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.08
  })

  return (
    <group ref={groupRef} scale={0.7}>
      <primitive object={scene} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#fbbf24" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#a855f7" />
      <Suspense fallback={null}>
        <InnerErrorBoundary>
          <Butterfly />
          <Environment preset="night" />
        </InnerErrorBoundary>
      </Suspense>
    </>
  )
}

class InnerErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

export default function ButterflyCanvas() {
  // Raw mouse pos (unsmoothed) — we smooth via CSS translate
  const [pos, setPos] = useState({ x: -999, y: -999 })
  const [isTouch, setIsTouch] = useState(true)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })

    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (isTouch || !pastHero) return null

  // Centre the small canvas on the cursor
  const left = pos.x - SIZE / 2
  const top = pos.y - SIZE / 2

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left,
        top,
        width: SIZE,
        height: SIZE,
        // No pointer-events at all — the div is tiny and sits ON the cursor,
        // but we disable it so clicks pass straight through
        pointerEvents: 'none',
        zIndex: 9999,
        // Smooth the position with a CSS transition so it glides
        transition: 'left 0.08s linear, top 0.08s linear',
        willChange: 'left, top',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
        // Disable ALL R3F event handling — pass undefined to skip event manager entirely
        events={undefined}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/fantasy_butterfly_animation.glb')
