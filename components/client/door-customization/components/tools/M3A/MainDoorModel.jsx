"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const MainDoorModel = React.memo(
  function MainDoorModel({ object, meshRef }) {
    console.log("MAIN DOOR");
    const { scene: mainScene } = useGLTF(object.modelPath);

    const modelScene = useMemo(() => {
      console.log("MAIN DOOR CLONE");
      return mainScene.clone(true);
    }, [mainScene]);

    useEffect(() => {
      modelScene.name = object.modelName;

      modelScene.scale.set(
        object?.scale?.x ?? 1,
        object?.scale?.y ?? 1,
        object?.scale?.z ?? 1
      );

      modelScene.traverse((child) => {
        if (!child.isMesh) return;

        if (child.material) {
          child.material.needsUpdate = true;
        }

        // FRAME
        if (child.name === "_3a_90_60_frame") {
          meshRef.current.frame = child;
        }

        // DOOR
        else if (child.name === "_3a_door001") {
          if (child.material) {
            child.material.roughness = 0.4;
          }
          meshRef.current.door = child;
        }

        // JAMB
        else if (child.name === "_3a_jamb") {
          meshRef.current.jamb = child;
        }

        // THRESHOLD
        else if (child.name === "_3a_threshold") {
          meshRef.current.threshold = child;
        }

        // WALL
        else if (child.name === "wall_") {
          meshRef.current.wall = child;
        }
      });
    }, [
      modelScene,
      object?.modelName,
      object?.scale?.x,
      object?.scale?.y,
      object?.scale?.z,
    ]);

    return <primitive object={modelScene} />;
  },
  (prev, next) => {
    return (
      prev.meshRef === next.meshRef &&
      prev.object?.modelName === next.object?.modelName &&
      prev.object?.modelPath === next.object?.modelPath &&
      prev.object?.scale?.x === next.object?.scale?.x &&
      prev.object?.scale?.y === next.object?.scale?.y &&
      prev.object?.scale?.z === next.object?.scale?.z
    );
  }
);

export default MainDoorModel;
