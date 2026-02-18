"use client"

import React, { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Suspense } from "react"

interface ThreeHeroIconProps {
    className?: string
}

// Floating geometric shapes
function FloatingShapes() {
    const groupRef = useRef<THREE.Group>(null)
    const mouse = useRef({ x: 0, y: 0 })

    // Track mouse
    React.useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener("mousemove", onMove)
        return () => window.removeEventListener("mousemove", onMove)
    }, [])

    useFrame((state) => {
        if (!groupRef.current) return
        const t = state.clock.elapsedTime
        groupRef.current.rotation.y = t * 0.08
        groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.15
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.current.x * 3, 0.03)
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.current.y * 3, 0.03)
    })

    // Generate random shape positions/sizes
    const shapes = useMemo(() => {
        const items = []
        const rng = (min: number, max: number) => Math.random() * (max - min) + min

        for (let i = 0; i < 18; i++) {
            items.push({
                type: i % 3, // 0=box, 1=octahedron, 2=torus
                position: [rng(-30, 30), rng(-20, 20), rng(-25, 5)] as [number, number, number],
                rotation: [rng(0, Math.PI), rng(0, Math.PI), rng(0, Math.PI)] as [number, number, number],
                scale: rng(0.8, 2.5),
                speed: rng(0.3, 1.2),
                phase: rng(0, Math.PI * 2),
                color: i % 2 === 0 ? "#2563eb" : "#0C71C3",
            })
        }
        return items
    }, [])

    return (
        <group ref={groupRef}>
            {shapes.map((s, i) => (
                <AnimatedShape key={i} {...s} index={i} />
            ))}
        </group>
    )
}

function AnimatedShape({
    type,
    position,
    rotation,
    scale,
    speed,
    phase,
    color,
    index,
}: {
    type: number
    position: [number, number, number]
    rotation: [number, number, number]
    scale: number
    speed: number
    phase: number
    color: string
    index: number
}) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime
        meshRef.current.rotation.x = rotation[0] + t * speed * 0.4
        meshRef.current.rotation.y = rotation[1] + t * speed * 0.6
        meshRef.current.position.y = position[1] + Math.sin(t * speed + phase) * 2
    })

    const material = (
        <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.25}
            roughness={0.1}
            metalness={0.3}
            clearcoat={1}
            wireframe={index % 4 === 0}
        />
    )

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            {type === 0 && <boxGeometry args={[3, 3, 3]} />}
            {type === 1 && <octahedronGeometry args={[2.5]} />}
            {type === 2 && <torusGeometry args={[2, 0.6, 8, 20]} />}
            {material}
        </mesh>
    )
}

// Particle field
function Particles() {
    const pointsRef = useRef<THREE.Points>(null)

    const positions = useMemo(() => {
        const arr = new Float32Array(1200 * 3)
        for (let i = 0; i < 1200 * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 80
        }
        return arr
    }, [])

    useFrame((state) => {
        if (!pointsRef.current) return
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
        pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#2563eb"
                size={0.25}
                sizeAttenuation
                transparent
                opacity={0.6}
            />
        </points>
    )
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[20, 20, 20]} intensity={500} color="#2563eb" />
            <pointLight position={[-20, -10, 10]} intensity={300} color="#0C71C3" />
            <Particles />
            <FloatingShapes />
        </>
    )
}

export default function ThreeHeroIcon({ className = "" }: ThreeHeroIconProps) {
    return (
        <div className={`w-full h-full absolute inset-0 z-0 pointer-events-none ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 50], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    )
}
