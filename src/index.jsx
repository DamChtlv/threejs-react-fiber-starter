import './style.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from "@react-three/fiber";
import Experience from './Experience';
import * as THREE from 'three'

const root = createRoot(document.getElementById('root'));
const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    // zoom: 100,
    position: [ 3, 2, 6 ]
}

root.render(
    <Canvas
        // orthographic // Set camera style to orthographic
        // flat // Set linear encodings to flat
        // dpr={[ 1, 2 ]} //? set pixel resolution, default value
        gl={{
            // antialias: false, // Set antialias off
            // toneMapping: THREE.ACESFilmicToneMapping, // Change light encoding
            // outputEncoding: THREE.LinearEncoding // Change color encoding
        }}
        camera={cameraSettings}
    >
        <Experience />
    </Canvas>
)
