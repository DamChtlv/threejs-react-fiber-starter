import './style.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from "@react-three/fiber";
import Experience from './Experience';
// import * as THREE from 'three'
import { Leva } from 'leva';

const root = createRoot(document.getElementById('root'));

root.render(
    <StrictMode> {/* StrictMode is a debug helper from React */}

        <Leva collapsed={false} /> {/* Leva is a GUI to display controls */}

        <Canvas
            shadows={false}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                // zoom: 100,
                position: [ 0, 0, 9.1 ]
            }}>

            <Experience /> {/* Our custom experience component */}

        </Canvas>

    </StrictMode>
)
