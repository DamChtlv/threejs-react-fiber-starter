import { useState, useEffect, useMemo, useRef } from 'react'
import { useThree, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Float, Text, Html, PivotControls, OrbitControls, TransformControls } from '@react-three/drei';
// import CustomObject from "./CustomObject";

export default function Experience() {

    const groupRef = useRef()
    const cubeRef = useRef()
    const sphereRef = useRef()
    const planeRef = useRef()

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

        cubeRef.current.rotation.y += delta
    })

    return <>

        <OrbitControls makeDefault />

        {/* Lights */}
        <directionalLight position={[ 1, 2, 3 ]} intensity={1} />
        <ambientLight intensity={0.5} />

        {/* Objects */}
        <group ref={groupRef}>

            <PivotControls
                anchor={ [0,0,0] }
                depthTest={false}
                lineWidth={4}
                axisColors={['#9381ff','#ff4d6d','#7ae582']}
                // scale={ 100 }
                // fixed={true}
            >
                <mesh ref={sphereRef} position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                    <Html
                        position={ [ -1, 1, 0 ] }
                        wrapperClass="label | font-sans relative flex bg-[#00000088] text-white p-4 overflow-hidden rounded-full w-auto whitespace-nowrap select-none"
                        style={{position: 'relative'}}
                        distanceFactor={6}
                        occlude={ [ sphereRef, cubeRef ] }
                        >Trop fort mon amour 😄
                    </Html>
                </mesh>
            </PivotControls>

            <mesh ref={cubeRef} rotation-y={Math.PI * 0.23} position-x={2} scale={1.5}>
                <boxGeometry scale={1.5} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <TransformControls object={cubeRef} mode="translate" />

        </group>

        {/* Floor */}
        <mesh ref={planeRef} rotation-x={-Math.PI * 0.5} scale={10} position-y={-1}>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            <MeshReflectorMaterial
                resolution={ 512 }
                blur={ [ 1000, 2000 ] }
                mixBlur={ .75 }
                mirror={ .75 }
                color="lightgray"
                />
        </mesh>

        <Float
            speed={5}
            floatIntensity={1.5}
            >
            <Text
                font='./raleway-bold.woff'
                fontSize={1}
                color="salmon"
                style={{textTransform: 'uppercase'}}
                position-y={ 2 }
                maxWidth={ 2 }
                textAlign="center"
                >
                    Hello there!
                    <meshStandardMaterial side={ 2 } />
                </Text>
        </Float>

        {/* <CustomObject /> */}

    </>
}
