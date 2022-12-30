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
        camera={cameraSettings}
    >
        <Experience />
    </Canvas>
)
