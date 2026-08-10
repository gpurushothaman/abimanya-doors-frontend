"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function DoorModel({ smartMenuAction }) {
  const { scene } = useGLTF("/models/3A.glb");
  console.log("door model")

  useEffect(() => {
    scene.traverse((child) => {
      console.log("child name:=", child);
      if (child.isMesh) {
        if (child.name?.includes("_door")) {
          child.visible = true;
        } else {
          child.visible = !smartMenuAction?.doorOnlyStatus;
        }
      }
    });
  }, [scene, smartMenuAction?.doorOnlyStatus]);

  return (
    <primitive
      object={scene}
      scale={[1.5, 1.11, 1]}
      position={[0, -0.1, 0.1]}
    />
  );
}

useGLTF.preload("/models/3A.glb");
