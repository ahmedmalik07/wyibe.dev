'use client'

import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Butterfly({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/fantasy_butterfly_animation.glb')
  const { actions } = useAnimations(animations, groupRef)
  const { viewport } = useThree()
  const current = useRef(new THREE.Vector3(0, 0, 0))
  const velocity = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const first = Object.values(actions)[0]
    if (first) {
      first.reset().fadeIn(0.5).play()
      first.setLoop(THREE.LoopRepeat, Infinity)
      first.timeScale = 2
    }
  }, [actions])

  useFrame((state) => {
    if (!groupRef.current) return

    const tx = ((mouse.current.x / window.innerWidth) * 2 - 1) * viewport.width * 0.45
    const ty = (-((mouse.current.y / window.innerHeight) * 2 - 1)) * viewport.height * 0.45

    const px = groupRef.current.position.x
    const py = groupRef.current.position.y

    current.current.set(tx, ty, 0)
    groupRef.current.position.lerp(current.current, 0.08)

    velocity.current.x = groupRef.current.position.x - px
    velocity.current.y = groupRef.current.position.y - py

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      THREE.MathUtils.clamp(-velocity.current.x * 15, -0.6, 0.6),
      0.1
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      THREE.MathUtils.clamp(velocity.current.y * 10, -0.4, 0.4),
      0.1
    )

    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2.5) * 0.003
  })

  return (
    <group ref={groupRef} scale={1.2}>
      <primitive object={scene} />
    </group>
  )
}

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#fbbf24" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#a855f7" />
      <Suspense fallback={null}>
        <Boundary>
          <Butterfly mouse={mouse} />
          <Environment preset="night" />
        </Boundary>
      </Suspense>
    </>
  )
}

class Boundary extends React.Component<{ children: React.ReactNode }, { err: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { err: false }
  }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? null : this.props.children }
}

export default function ButterflyCanvas() {
  const mouse = useRef({ x: 0, y: 0 })
  const [show, setShow] = useState(false)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip on touch / mobile
    if (window.matchMedia('(hover: none)').matches) return

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }

    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    // After the canvas mounts, reach into the DOM and force pointer-events off
    // on the actual <canvas> element — this is the only reliable way
    if (!canvasContainerRef.current) return
    const timer = setTimeout(() => {
      const canvasEl = canvasContainerRef.current?.querySelector('canvas')
      if (canvasEl) {
        canvasEl.style.pointerEvents = 'none'
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [show])

  if (!show) return null

  return (
    <div
      ref={canvasContainerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        events={undefined}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/fantasy_butterfly_animation.glb')
