import { useMemo, useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function CustomObject({ children }) {

    const geometryRef = useRef()
    const verticesCount = 5 * 3

    // Generate NormalMap on first render to have light reflection
    useEffect(() => {
        geometryRef.current.computeVertexNormals()
    }, [])

    // Cache "positions" variable using UseMemo()
    const positions = useMemo( () => {
        const positions = new Float32Array(verticesCount * 3)

        for (let index = 0; index < verticesCount * 3; index++) {
            positions[index] = (Math.random() - .5) * 3
        }

        return positions;
    }, [verticesCount])

    return <mesh>
        <bufferGeometry ref={geometryRef}>
            <bufferAttribute
                attach="attributes-position"
                count={ verticesCount }
                itemSize={3}
                array={positions}
                />
        </bufferGeometry>
        <meshStandardMaterial
            // color="red"
            side={THREE.DoubleSide}
            />
    </mesh>
}
