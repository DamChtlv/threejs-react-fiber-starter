import { useState, useEffect, useMemo, useRef } from 'react'
import { extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CustomObject from "./CustomObject";

// Generate orbitControls class as <orbitControls> tag
extend({ OrbitControls })

export default function Experience() {

    const groupRef = useRef()
    const cubeRef = useRef()
    const sphereRef = useRef()
    const planeRef = useRef()

    // UseThree is a ReactFiber hook to get ThreeJS data
    const { camera, gl } = useThree()

    // UseFrame is called on each frame and is recommanded to animate (for good perfs)
    // delta is used as "time / tick" variable
    useFrame((state, delta) => {

        // const camera = state.camera ?? null
        // const angle = state.clock.elapsedTime ?? null

        // camera.position.x = Math.sin(angle) * 8
        // camera.position.z = Math.cos(angle) * 8
        // camera.lookAt(0, 0, 0)

        cubeRef.current.rotation.y += delta
    })

    return <>

        {/* Controls */}
        <orbitControls args={[ camera, gl.domElement ]} />

        {/* Lights */}
        <directionalLight position={[ 1, 2, 3 ]} intensity={1} />
        <ambientLight intensity={0.5} />

        {/* Objects */}
        <group ref={groupRef}>
            <mesh ref={cubeRef} rotation-y={Math.PI * 0.23} position-x={2} scale={1.5}>
                <boxGeometry scale={1.5} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <mesh ref={sphereRef} position-x={-2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
        </group>

        {/* Floor */}
        <mesh ref={planeRef} rotation-x={-Math.PI * 0.5} scale={10} position-y={-1}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <CustomObject />

    </>
}
