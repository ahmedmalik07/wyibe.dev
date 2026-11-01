'use client'

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

// Phone / tablet version of the butterfly. There is no cursor to follow, so it
// pops in at a random spot, wanders across the screen along a random curve and
// flies off an edge. Then it waits a while and does it again. The WebGL canvas
// only exists while the butterfly is on screen, so it costs nothing in between.

const MODEL = '/fantasy_butterfly_animation.glb'
const FLIGHT_SECONDS = 7
const FIRST_DELAY: [number, number] = [5000, 10000]
const NEXT_DELAY: [number, number] = [20000, 40000]

const rand = (min: number, max: number) => min + Math.random() * (max - min)

function buildPath(w: number, h: number) {
  // Start somewhere inside the screen (so it "appears" instead of entering),
  // visit three random points, then leave through a random edge.
  const inside = () => new THREE.Vector3(rand(-w * 0.38, w * 0.38), rand(-h * 0.35, h * 0.35), rand(-0.5, 0.5))
  const exits = [
    new THREE.Vector3(-w * 0.8, rand(-h * 0.4, h * 0.4), 0),
    new THREE.Vector3(w * 0.8, rand(-h * 0.4, h * 0.4), 0),
    new THREE.Vector3(rand(-w * 0.4, w * 0.4), h * 0.75, 0),
  ]
  const exit = exits[Math.floor(Math.random() * exits.length)]
  return new THREE.CatmullRomCurve3([inside(), inside(), inside(), inside(), exit], false, 'centripetal')
}

function WanderingButterfly({ onDone }: { onDone: () => void }) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(MODEL)
  const { actions } = useAnimations(animations, group)
  const { viewport } = useThree()
  const start = useRef<number | null>(null)
  const done = useRef(false)
  const lastX = useRef(0)

  const path = useMemo(() => buildPath(viewport.width, viewport.height), [viewport.width, viewport.height])
  // Keep the butterfly about a third of the screen wide on any phone.
  const baseScale = Math.min(1.2, viewport.width * 0.15)

  useEffect(() => {
    const flap = Object.values(actions)[0]
    if (flap) {
      flap.reset().play()
      flap.setLoop(THREE.LoopRepeat, Infinity)
      flap.timeScale = 2.4
    }
  }, [actions])

  useFrame((state) => {
    const g = group.current
    if (!g || done.current) return
    if (start.current === null) start.current = state.clock.elapsedTime
    const elapsed = state.clock.elapsedTime - start.current

    // Ease in and out along the path so it lingers a bit mid-screen.
    const raw = Math.min(elapsed / FLIGHT_SECONDS, 1)
    const t = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2
    const p = path.getPointAt(t)
    g.position.set(p.x, p.y + Math.sin(elapsed * 6) * 0.05, p.z)

    // Pop in: quick overshoot scale during the first 0.35s.
    const pop = Math.min(elapsed / 0.35, 1)
    const overshoot = pop < 1 ? Math.sin(pop * Math.PI * 0.75) * 1.25 : 1
    g.scale.setScalar(baseScale * Math.max(overshoot, 0.001))

    // Bank into turns, like the desktop version.
    const vx = p.x - lastX.current
    lastX.current = p.x
    const tangent = path.getTangentAt(t)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, THREE.MathUtils.clamp(-vx * 25, -0.6, 0.6), 0.1)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, THREE.MathUtils.clamp(tangent.y * 0.5, -0.4, 0.4), 0.1)

    if (raw >= 1) {
      done.current = true
      onDone()
    }
  })

  return (
    <group ref={group} scale={0.001}>
      <primitive object={scene} />
    </group>
  )
}

class Boundary extends React.Component<{ children: React.ReactNode; onError: () => void }, { err: boolean }> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props)
    this.state = { err: false }
  }
  static getDerivedStateFromError() { return { err: true } }
  componentDidCatch() { this.props.onError() }
  render() { return this.state.err ? null : this.props.children }
}

export default function ButterflyWander() {
  const [flightId, setFlightId] = useState(0) // 0 = not flying
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const broken = useRef(false)

  const schedule = (range: [number, number]) => {
    if (broken.current) return
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      // Don't fly while the tab is in the background; try again later.
      if (document.visibilityState !== 'visible') return schedule(NEXT_DELAY)
      setFlightId((n) => n + 1)
    }, rand(range[0], range[1]))
  }

  useEffect(() => {
    schedule(FIRST_DELAY)
    // Warm the model cache shortly after load so the first flight starts instantly.
    const warm = setTimeout(() => useGLTF.preload(MODEL), 2500)
    return () => {
      clearTimeout(warm)
      if (timer.current) clearTimeout(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const finish = () => {
    setFlightId(0)
    schedule(NEXT_DELAY)
  }

  if (!flightId) return null

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 40 }}>
      <Canvas
        key={flightId}
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        events={undefined}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.6} />
        <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#fbbf24" />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#a855f7" />
        <Suspense fallback={null}>
          <Boundary onError={() => { broken.current = true; setFlightId(0) }}>
            <WanderingButterfly onDone={finish} />
          </Boundary>
        </Suspense>
      </Canvas>
    </div>
  )
}
