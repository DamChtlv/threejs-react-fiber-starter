import { Suspense, useState, useEffect, useMemo, useRef } from 'react'
import { useLoader, useThree, useFrame } from '@react-three/fiber'; // UseThree is to get ThreeJS data & useFrame to do something every frame
import { Stage, Lightformer, Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, softShadows, BakeShadows, useHelper, MeshReflectorMaterial, Float, Text, Html, PivotControls, OrbitControls, TransformControls } from '@react-three/drei'; // Really cool helpers for R3F
import { useControls, button } from 'leva'; // useControls is a GUI to control values
import { Perf } from 'r3f-perf'; // Perf is a UI that display performances infos
// import * as THREE from 'three';
// import Model from './components/Model';
// import Katana from './components/Katana';
// import StonePillar from './components/StonePillar';
import Stegosaur from './components/Stegosaur';
import Placeholder from './components/Placeholder';

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
    const { spPosition, spColor, spVisible } = useControls('sphere', {
        spPosition: {
            value: {
                x: -2.5,
                y: 1,
            },
            step: 0.01,
            joystick: 'invertY'
        },
        spColor: '#14beb1',
        spVisible: true,
        clickMe: button(() => { console.log('test') }),
    })

    // Cube controls
    const { cuScale } = useControls('cube', {
        cuScale: {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5,
        }
    })

    // Shadow controls
    const { shBlur, shOpacity, shColor } = useControls('shadows', {
        shBlur: {
            value: 3,
            min: 0,
            max: 5,
        },
        shOpacity: {
            value: .5,
            min: 0,
            max: 1,
        },
        shColor: {
            value: "#271a07"
        },
    })

    // Sky controls
    const { sunPosition } = useControls('sky', {
        sunPosition: {
            value: [ 1, 2, 3 ]
        }
    })

    // Environment Map controls
    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('envmap', {
        envMapIntensity: { value: 1, min: 0, max: 12 },
        envMapHeight: { value: 8.2, min: 0, max: 10 },
        envMapRadius: { value: 33.2, min: 10, max: 50 },
        envMapScale: { value: 19, min: 10, max: 150 },
    })

    // Refs
    const groupRef = useRef()
    const cubeRef = useRef()
    const sphereRef = useRef()
    const planeRef = useRef()
    const pivotRef = useRef()
    const directionalLightRef = useRef()

    const [ pivotData, setPivotData ] = useState([ false, false ])

    /* Set light helper */
    // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 0.5)

    /* UseThree is a ReactFiber hook to get ThreeJS data on first frame */
    const { camera, gl } = useThree()

    /*
    UseFrame is called on each frame and is recommanded to animate (for good perfs)
    delta is used as "time / tick" variable
    */
    useFrame((state, delta) => {
        /* Make camera rotate the scene */
        const camera = state.camera ?? null
        // console.log(camera.position);
        // const angle = state.clock.elapsedTime ?? null
        // camera.position.x = Math.sin(angle / 10) * 8
        // camera.position.z = Math.cos(angle / 10) * 8
        // camera.lookAt(0, 3, 0)
        // cubeRef.current.position.x = 2 + Math.sin(angle)
    })

    /* Hooking on onDrag of pivot seems to update his dynamic shadow position even if shadow are freeze / set to frames={1} */
    const onPivotDrag = (l, deltaL, w, deltaW) => setPivotData([ deltaL, deltaW ])
    useEffect((pivotData) => {
        // console.log('coucou');
        // console.log(pivotData);
    }, [ pivotData ])

    return <>

        {/* Scene background color */}
        {/* <color args={ ['ivory'] } attach="background" /> */}

        {/* Display performance monitor */}
        {showPerf && <Perf position="top-left" />}

        {/* Controls orientation of the scene */}
        <OrbitControls makeDefault autoRotate autoRotateSpeed={1}  />

        {/* Environment map is used to have natural lights &/or background images */}
        {/* <Environment
            // background // Enable environment map as background images
            preset='sunset' // Drei has some default environment maps usable using "preset"
            ground={ {
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale,
             } }
            // resolution={32}
            // files={ './environmentMaps/the_sky_is_on_fire_2k.hdr' }
            // files={[
            //     './environmentMaps/2/px.jpg',
            //     './environmentMaps/2/nx.jpg',
            //     './environmentMaps/2/py.jpg',
            //     './environmentMaps/2/ny.jpg',
            //     './environmentMaps/2/pz.jpg',
            //     './environmentMaps/2/nz.jpg',
            // ]}
        > */}
        {/* <color args={[ 'black' ]} attach="background" />
            <Lightformer
                position-z={-5}
                scale={10}
                color="red"
                intensity={ 10 }
                form="ring"
            /> */}
        {/* <mesh position-z={-2} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color={ [10, 0, 0] } />
            </mesh> */}
        {/* </Environment> */}

        {/* <AccumulativeShadows
            position={ [ 0, 0.1, 0 ] }
            scale={ 10 }
            color={shColor}
            opacity={shOpacity}
            frames={ Infinity }
            temporal
            blend={shBlur}
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

        {/* <ContactShadows
            position={[ 0, 0, 0 ]}
            scale={10}
            resolution={512}
            far={5}
            color={shColor}
            opacity={shOpacity}
            blur={shBlur}
            frames={1}
        /> */}

        {/* Lights */}
        <directionalLight
            ref={directionalLightRef}
            position={sunPosition}
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

        {/* Sky */}
        {/* <Sky sunPosition={ sunPosition } /> */}

        {/* Fix shadows on the first frame (shadow doesn't move if your object is moving) */}
        {/* <BakeShadows /> */}

        {/* Objects */}
        {/* <group ref={groupRef}> */}

            {/* Sphere */}
            {/* <PivotControls
                anchor={[ 0, 0, 0 ]}
                depthTest={false}
                lineWidth={4}
                axishColors={[ '#9381ff', '#ff4d6d', '#7ae582' ]}
                onDrag={onPivotDrag}
                ref={pivotRef}
            > */}
            {/* <mesh ref={sphereRef} castShadow position={[ spPosition.x, spPosition.y, 0 ]} visible={spVisible}>
                    <sphereGeometry />
                    <meshStandardMaterial envMapIntensity={envMapIntensity} color={spColor} />
                    <Html
                        position={[ -1, 1, 0 ]}
                        wrapperClass="label | font-sans relative flex bg-[#00000088] text-white p-4 overflow-hidden rounded-full w-auto whitespace-nowrap select-none"
                        style={{ position: 'relative' }}
                        distanceFactor={6}
                        occlude={[ sphereRef, cubeRef ]}
                    >That's a sphere 😄
                    </Html>
                </mesh> */}
            {/* </PivotControls> */}

            {/* Cube */}
            {/* <mesh ref={cubeRef} castShadow rotation-y={Math.PI * 0.23} position-x={2} position-y={1} scale={cuScale}>
                <boxGeometry scale={1.5} />
                <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
            </mesh> */}
            {/* <TransformControls object={cubeRef} mode="translate" /> */}

        {/* </group> */}

        {/* Floor */}
        {/* <mesh ref={planeRef} rotation-x={-Math.PI * 0.5} scale={10} position-y={0}> */}
        {/* <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} /> */}
        {/* <MeshReflectorMaterial
                resolution={512}
                blur={[ 1000, 2000 ]}
                mixBlur={.75}
                mirror={.75}
                color="lightgray"
            /> */}
        {/* </mesh> */}

        {/* <Stage
            contactShadow={{ opacity: 0.2, blur: 3 }}
            environment='sunset'
            preset='portrait'
            intensity={ 1.5 }
        > */}
        {/* <mesh ref={cubeRef} castShadow rotation-y={Math.PI * 0.23} position-x={2} position-y={1} scale={cuScale}>
                <boxGeometry scale={1.5} />
                <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
            </mesh> */}

        {/* <mesh ref={sphereRef} castShadow position={[ spPosition.x, spPosition.y, 0 ]} visible={spVisible}>
                <sphereGeometry />
                <meshStandardMaterial envMapIntensity={envMapIntensity} color={spColor} />
            </mesh> */}

        {/* Suspense is used to lazyload components, fallback is used to show something while the component is loading */}
        <Suspense fallback={<Placeholder position-y={.5} scale={[ 2, 3, 2 ]} />}>

            {/* Floating text */}
            <Float
                speed={5}
                floatIntensity={1.5}>
                <Text
                    font='./raleway-bold.woff'
                    fontSize={1}
                    color="salmon"
                    style={{ textTransform: 'uppercase' }}
                    position-y={3}
                    position-z={1.5}
                    maxWidth={2}
                    castShadow
                    textAlign="center">
                    Hello there!
                    <meshStandardMaterial envMapIntensity={envMapIntensity} side={2} />
                </Text>
            </Float>

            <Stegosaur />
        </Suspense>

        {/* </Stage> */}

    </>
}
