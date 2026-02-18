"use client"

import React, { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Suspense } from "react"

// Background Pattern
function BackgroundPattern() {
    return (
        <mesh rotation={[0, 0, 0]} position={[0, 0, -5]}>
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial
                color="transparent"
                wireframe
                side={THREE.DoubleSide}
                opacity={0.2}
                transparent
            />
        </mesh>
    )
}

// ─── Human Figure (simplified) ───────────────────────────────────────
function HumanFigure() {
    const groupRef = useRef<THREE.Group>(null)
    const lineRef = useRef<THREE.LineSegments>(null)
    const pointsRef = useRef<THREE.Points>(null)
    const glowLineRef = useRef<THREE.LineSegments>(null)

    const { positions, linePositions } = useMemo(() => {
        const verts = generateHumanVertices() // Human figure vertices data
        const edges = generateHumanEdges() // Wireframe edges

        const linePosArr = new Float32Array(edges.length * 3)
        for (let i = 0; i < edges.length; i++) {
            const idx = edges[i]
            linePosArr[i * 3] = verts[idx * 3]
            linePosArr[i * 3 + 1] = verts[idx * 3 + 1]
            linePosArr[i * 3 + 2] = verts[idx * 3 + 2]
        }

        return { positions: verts, linePositions: linePosArr }
    }, [])

    const sizes = useMemo(() => {
        const count = positions.length / 3
        const arr = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            arr[i] = 0.08 + Math.random() * 0.1
        }
        return arr
    }, [positions])

    useFrame((state) => {
        if (!groupRef.current) return
        const t = state.clock.elapsedTime

        // Enhance floating and rotation
        groupRef.current.position.y = Math.sin(t * 0.4) * 0.25
        groupRef.current.rotation.y += THREE.MathUtils.lerp(0, 0.1, 0.02)
    })

    return (
        <group ref={groupRef} position={[0, 0, 0]} scale={1.5}>
            <lineSegments ref={lineRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
                </bufferGeometry>
                <lineBasicMaterial color="#00A8FF" transparent opacity={0.8} linewidth={2} />
            </lineSegments>

            <lineSegments ref={glowLineRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
                </bufferGeometry>
                <lineBasicMaterial color="#1A90FF" transparent opacity={0.4} linewidth={3} blending={THREE.AdditiveBlending} />
            </lineSegments>

            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                    <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
                </bufferGeometry>
                <pointsMaterial color="#3DBEF8" size={0.1} sizeAttenuation transparent opacity={0.85} blending={THREE.AdditiveBlending} />
            </points>
        </group>
    )
}

// ─── Ambient Particles for Visual Effects ──────────────────────────
function AmbientParticles() {
    const ref = useRef<THREE.Points>(null)

    const positions = useMemo(() => {
        const count = 400
        const arr = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2
            const radius = 2 + Math.random() * 5
            arr[i * 3] = Math.cos(angle) * radius
            arr[i * 3 + 1] = Math.random() * 12 - 2
            arr[i * 3 + 2] = Math.sin(angle) * radius - 2
        }
        return arr
    }, [])

    const velocities = useMemo(() => {
        const count = 400
        const arr = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            arr[i] = 0.002 + Math.random() * 0.006
        }
        return arr
    }, [])

    useFrame(() => {
        if (!ref.current) return
        const posArr = ref.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < 400; i++) {
            posArr[i * 3 + 1] += velocities[i]
            if (posArr[i * 3 + 1] > 10) {
                posArr[i * 3 + 1] = -2
            }
        }
        ref.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#3DBEF8" size={0.04} sizeAttenuation transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </points>
    )
}

// ─── Final Scene Composition ──────────────────────────────────────────
function Scene() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 10, 8]} intensity={80} color="#00A8FF" />
            <pointLight position={[-5, 5, 5]} intensity={40} color="#7DD8FF" />
            <pointLight position={[0, -3, 8]} intensity={30} color="#0ea5e9" />
            <BackgroundPattern />
            <HumanFigure />
            <AmbientParticles />
        </>
    )
}

// ─── Main Component ────────────────────────────────────────────────────
interface WireframeHumanProps {
    className?: string
}

// ─── Procedural Human Data Generation ─────────────────────────────────
function generateHumanVertices() {
    const verts: number[] = []

    // Head (Sphere-ish)
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        verts.push(Math.cos(angle) * 0.4, 3.5 + Math.sin(angle) * 0.4, 0)
    }

    // Spine
    verts.push(0, 3.1, 0) // neck
    verts.push(0, 2.0, 0) // mid
    verts.push(0, 1.0, 0) // pelvis

    // Shoulders & Arms
    verts.push(-0.8, 2.8, 0.2) // L shoulder
    verts.push(-1.4, 2.0, 0.5) // L elbow
    verts.push(-1.8, 1.0, 0.8) // L hand

    verts.push(0.8, 2.8, 0.2) // R shoulder
    verts.push(1.4, 2.0, 0.5) // R elbow
    verts.push(1.8, 1.0, 0.8) // R hand

    // Legs
    verts.push(-0.4, 1.0, 0) // L hip
    verts.push(-0.6, -0.5, 0.5) // L knee
    verts.push(-0.8, -2.0, 1.0) // L foot

    verts.push(0.4, 1.0, 0) // R hip
    verts.push(0.6, -0.5, 0.5) // R knee
    verts.push(0.8, -2.0, 1.0) // R foot

    return new Float32Array(verts)
}

function generateHumanEdges() {
    const edges: number[] = []

    // Head circle
    for (let i = 0; i < 8; i++) {
        edges.push(i, (i + 1) % 8)
    }

    // Spine
    edges.push(8, 9)
    edges.push(9, 10)

    // Connect neck to head
    edges.push(8, 0)

    // Shoulders
    edges.push(8, 11) // neck to L shoulder
    edges.push(8, 14) // neck to R shoulder

    // Arms
    edges.push(11, 12) // L shoulder to elbow
    edges.push(12, 13) // L elbow to hand

    edges.push(14, 15) // R shoulder to elbow
    edges.push(15, 16) // R elbow to hand

    // Lower body
    edges.push(10, 17) // pelvis to L hip
    edges.push(10, 20) // pelvis to R hip

    // Legs
    edges.push(17, 18) // L hip to knee
    edges.push(18, 19) // L knee to foot

    edges.push(20, 21) // R hip to knee
    edges.push(21, 22) // R knee to foot

    return new Uint16Array(edges)
}

export default function WireframeHuman({ className = "" }: WireframeHumanProps) {
    return (
        <div className={`w-full h-full absolute inset-0 z-0 pointer-events-none ${className}`}>
            <Canvas
                camera={{ position: [0, 3, 12], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    )
}
