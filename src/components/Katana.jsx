/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Katana(props) {
    const { nodes, materials } = useGLTF('./antique_katana_01_1k.glb');
    return (
        <group {...props} dispose={null}>
            <mesh
                name="antique_katana_01"
                castShadow
                receiveShadow
                geometry={nodes.antique_katana_01.geometry}
                material={materials.antique_katana_01}
            />
        </group>
    );
}

useGLTF.preload('./antique_katana_01_1k.glb');
