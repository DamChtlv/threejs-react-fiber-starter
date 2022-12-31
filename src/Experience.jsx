import { useState, useEffect, useMemo, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'; // UseThree is to get ThreeJS data & useFrame to do something every frame
import { ContactShadows, RandomizedLight, AccumulativeShadows, softShadows, BakeShadows, useHelper, MeshReflectorMaterial, Float, Text, Html, PivotControls, OrbitControls, TransformControls } from '@react-three/drei'; // Really cool helpers for R3F
import { useControls, button } from 'leva'; // useControls is a GUI to control values
import { Perf } from 'r3f-perf'; // Perf is a UI that display performances infos
import * as THREE from 'three';

// Make shadows more blurry when there are far from their elements
// softShadows({
//     frustum: 3.75,
//     size: 0.005,
//     near: 9.5,
//     samples: 17,
//     rings: 11
// })

export default function Experience() {

    // Perf controls
    const { showPerf } = useControls('perf', {
        showPerf: true,
    })

    // Sphere controls
    const { position, color, visible } = useControls('sphere', {
        position: {
            value: {
                x: -2.5,
                y: 0,
            },
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#14beb1',
        visible: true,
        clickMe: button(() => { console.log('test') }),
    })

    // Cube controls
    const { scale } = useControls('cube', {
        scale: {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5,
        }
    })

    // Shadow controls
    const { sBlur, sOpacity, sColor } = useControls('shadows', {
        sBlur: {
            value: 2.4,
            step: 0.01,
            min: 0,
            max: 5,
        },
        sOpacity: {
            value: .68,
            step: 0.01,
            min: 0,
            max: 1,
        },
        sColor: {
            value: "#494c58"
        },
    })

    // Refs
    const groupRef = useRef()
    const cubeRef = useRef()
    const sphereRef = useRef()
    const planeRef = useRef()

    // Set light helper
    const directionalLightRef = useRef()
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 0.5)

    /* UseThree is a ReactFiber hook to get ThreeJS data */
    const { camera, gl } = useThree()

    /*
    UseFrame is called on each frame and is recommanded to animate (for good perfs)
    delta is used as "time / tick" variable
    */
    useFrame((state, delta) => {

        /* Make camera rotate the scene */
        // const camera = state.camera ?? null
        // const angle = state.clock.elapsedTime ?? null
        // camera.position.x = Math.sin(angle) * 8
        // camera.position.z = Math.cos(angle) * 8
        // camera.lookAt(0, 0, 0)
        // cubeRef.current.position.x = 2 + Math.sin(angle)
        cubeRef.current.rotation.y += delta
    })

    return <>

        {/* Scene background color */}
        {/* <color args={ ['ivory'] } attach="background" /> */}

        {/* Display performance monitor */}
        {showPerf && <Perf position="top-left" />}

        {/* Controls orientation of the scene */}
        <OrbitControls makeDefault />

        {/* <AccumulativeShadows
            position={ [ 0, -0.99, 0 ] }
            scale={ 10 }
            color="#316d39"
            opacity={ .8 }
            frames={ Infinity }
            temporal
            blend={ 100 }
            >
            <RandomizedLight
                position={ [ 1, 2, 3 ] }
                amount={ 8 }
                ambient={ .5 }
                radius={ 1 }
                intensity={ 1 }
                bias={ 0.001 }
                />
        </AccumulativeShadows> */}

        <ContactShadows
            position={[ 0, -0.99, 0 ]}
            scale={ 10 }
            resolution={ 512 }
            far={5}
            color={sColor}
            opacity={sOpacity}
            blur={sBlur}
            />

        {/* Lights */}
        <directionalLight
            ref={directionalLightRef}
            position={[ 1, 2, 3 ]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[ 1024, 1024 ]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
        />
        <ambientLight intensity={0.5} />

        {/* Fix shadows on the first frame (shadow doesn't move if your object is moving) */}
        {/* <BakeShadows /> */}

        {/* Objects */}
        <group ref={groupRef}>

            {/* Sphere */}
            {/* <PivotControls
                anchor={[ 0, 0, 0 ]}
                depthTest={false}
                lineWidth={4}
                axisColors={[ '#9381ff', '#ff4d6d', '#7ae582' ]}
            > */}
            <mesh ref={sphereRef} castShadow position={[ position.x, position.y, 0 ]} visible={visible}>
                <sphereGeometry />
                <meshStandardMaterial color={color} />
                <Html
                    position={[ -1, 1, 0 ]}
                    wrapperClass="label | font-sans relative flex bg-[#00000088] text-white p-4 overflow-hidden rounded-full w-auto whitespace-nowrap select-none"
                    style={{ position: 'relative' }}
                    distanceFactor={6}
                    occlude={[ sphereRef, cubeRef ]}
                >Trop fort mon amour 😄
                </Html>
            </mesh>
            {/* </PivotControls> */}

            {/* Cube */}
            <mesh ref={cubeRef} castShadow rotation-y={Math.PI * 0.23} position-x={2} scale={scale}>
                <boxGeometry scale={1.5} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            {/* <TransformControls object={cubeRef} mode="translate" /> */}

        </group>

        {/* Floor */}
        <mesh ref={planeRef} rotation-x={-Math.PI * 0.5} scale={10} position-y={-1}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
            {/* <MeshReflectorMaterial
                resolution={512}
                blur={[ 1000, 2000 ]}
                mixBlur={.75}
                mirror={.75}
                color="lightgray"
            /> */}
        </mesh>

        {/* Floating text */}
        <Float
            speed={5}
            floatIntensity={1.5}>
            <Text
                font='./raleway-bold.woff'
                fontSize={1}
                color="salmon"
                style={{ textTransform: 'uppercase' }}
                position-y={2}
                maxWidth={2}
                textAlign="center">
                Hello there!
                <meshStandardMaterial side={2} />
            </Text>
        </Float>

    </>
}
