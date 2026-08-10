"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function DoorModel() {

  const { scene } = useGLTF(
    "/models/3A.glb"
  );

  useEffect(() => {
    scene.traverse((child) => {
      console.log("child name:=", child);
      if (child.name === "wall_") {
        child.visible = false;
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={[1.5, 1.11, 1]}
      position={[0, -0.1, 0.1]}
    />
  );
}

useGLTF.preload("/models/3A.glb");