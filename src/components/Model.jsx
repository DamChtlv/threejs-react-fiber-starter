import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Clone, useGLTF, useFBX } from "@react-three/drei";

export default function Model({ children }) {

    const modelRef = useRef();
    // const model = useGLTF('./antique_katana_01_1k.gltf')
    // const model = useFBX('./LightSaber_FBX.fbx')
    // const model = useFBX('./Lightsaber.fbx')
    // const model = useGLTF('./goreforged_greatsword.glb')
    const model = useGLTF('./stone_pillar.glb')
    console.log(model);

    useFrame((state, delta) => {
        modelRef.current.rotation.y -= delta / 3
    })

    return <>
        <Clone ref={modelRef} object={ model.scene ?? model } position={[ -3, 0.25, 0 ]} scale={model?.scene ? 0.015 : 1} />
        <Clone ref={modelRef} object={ model.scene ?? model } position={[ 0, 0.25, 0 ]} scale={model?.scene ? 0.015 : 1} />
        <Clone ref={modelRef} object={ model.scene ?? model } position={[ 3, 0.25, 0 ]} scale={model?.scene ? 0.015 : 1} />
        {/* <primitive ref={modelRef} object={model.scene ?? model} position={[ 3, 0.25, 0 ]} scale={model?.scene ? 0.015 : 1} /> */}
    </>
}

useGLTF.preload('./stone_pillar.glb')
