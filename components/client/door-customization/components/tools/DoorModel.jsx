"use client";

import { useGLTF } from "@react-three/drei";

export default function DoorModel() {

  const { scene } = useGLTF(
    "/models/base.glb"
  );

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0,0,0]}
    />
  );
}


useGLTF.preload("/models/base.glb");