'use client'

import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment } from '@react-three/drei'
import * as THREE from 'three'

const SIZE = 200 // px — canvas box size

function Butterfly() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/fantasy_butterfly_animation.glb')
  const { actions } = useAnimations(animations, groupRef)

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
    // gentle float + sway — no lerping needed, position is handled by the wrapper div
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.5) * 0.06
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.1
  })

  return (
    <group ref={groupRef} scale={1.8}>
      <primitive object={scene} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#fbbf24" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#a855f7" />
      <Suspense fallback={null}>
        <InnerBoundary>
          <Butterfly />
          <Environment preset="night" />
        </InnerBoundary>
      </Suspense>
    </>
  )
}

class InnerBoundary extends React.Component<
  { children: React.ReactNode },
  { err: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { err: false }
  }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? null : this.props.children }
}

export default function ButterflyCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isTouch = useRef(false)
  const pastHero = useRef(false)
  const mounted = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches
    if (isTouch.current) return

    const wrapper = wrapperRef.current
    if (!wrapper) return

    mounted.current = true

    // Move the div directly via style — zero React re-renders, no lag
    const onMove = (e: MouseEvent) => {
      if (!pastHero.current) return
      wrapper.style.left = `${e.clientX - SIZE / 2}px`
      wrapper.style.top = `${e.clientY - SIZE / 2}px`
      wrapper.style.opacity = '1'
    }

    const onScroll = () => {
      pastHero.current = window.scrollY > window.innerHeight * 0.8
      if (!pastHero.current && wrapper) {
        wrapper.style.opacity = '0'
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Always render the div+canvas (so the GLB stays loaded), just hide it
  // This avoids the canvas mount/unmount lag entirely
  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: -SIZE,
        top: -SIZE,
        width: SIZE,
        height: SIZE,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        // CSS transition smooths movement — no React state needed
        transition: 'left 0.06s ease-out, top 0.06s ease-out',
        willChange: 'left, top',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
        events={undefined}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/fantasy_butterfly_animation.glb')
