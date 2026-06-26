'use client'

import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Butterfly({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/fantasy_butterfly_animation.glb')
  const { actions } = useAnimations(animations, groupRef)
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0))
  const velocity = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

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

    const x = (mousePosition.x / window.innerWidth) * 2 - 1
    const y = -((mousePosition.y / window.innerHeight) * 2 - 1)

    targetPosition.current.set(
      x * viewport.width * 0.5,
      y * viewport.height * 0.5,
      0
    )

    const prevX = groupRef.current.position.x
    const prevY = groupRef.current.position.y

    groupRef.current.position.lerp(targetPosition.current, 0.08)

    velocity.current.x = groupRef.current.position.x - prevX
    velocity.current.y = groupRef.current.position.y - prevY

    const tiltZ = THREE.MathUtils.clamp(-velocity.current.x * 15, -0.6, 0.6)
    const tiltX = THREE.MathUtils.clamp(velocity.current.y * 10, -0.4, 0.4)

    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, tiltZ, 0.1)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, tiltX, 0.1)

    // Subtle floating
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2.5) * 0.003
  })

  return (
    <group ref={groupRef} scale={0.7}>
      <primitive object={scene} />
    </group>
  )
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#fbbf24" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#a855f7" />
      <Suspense fallback={null}>
        <ErrorBoundary>
          <Butterfly mousePosition={mousePosition} />
          <Environment preset="night" />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}

// Inner error boundary for the 3D model specifically
class ErrorBoundary extends React.Component<
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTouch, setIsTouch] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    // Don't render on touch/mobile devices — no cursor to follow
    setIsTouch(window.matchMedia('(hover: none)').matches)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Show butterfly only after scrolling past the hero section
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      setPastHero(window.scrollY > heroHeight * 0.8)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isTouch || !pastHero) return null

  return (
    <div
      className="fixed inset-0"
      style={{ zIndex: 50, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        events={{ enabled: false }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/fantasy_butterfly_animation.glb')
