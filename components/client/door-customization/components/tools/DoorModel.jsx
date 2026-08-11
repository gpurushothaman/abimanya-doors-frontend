"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function DoorModel({ smartMenuAction, wallData }) {
  const { scene } = useGLTF("/models/3A.glb");
  console.log("door model");

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (!child.isMesh) return;

      if (child.name === "_3a_90_60_frame") {
        const frameDict = child.morphTargetDictionary;

        if (frameDict?.width !== undefined) {
          child.morphTargetInfluences[frameDict.width] =
            wallData?.blendWidth ?? 0;
        }

        if (frameDict?.height !== undefined) {
          child.morphTargetInfluences[frameDict.height] =
            wallData?.blendHeight ?? 0;
        }

        child.visible = !smartMenuAction?.doorOnlyStatus;
      } else if (child.name === "_3a_door001") {
        child.visible = true;

        child.material.roughness = 0.4;

        const doorDict = child.morphTargetDictionary;

        if (doorDict?.width !== undefined) {
          child.morphTargetInfluences[doorDict.width] =
            wallData?.blendWidth ?? 0;
        }

        if (doorDict?.height !== undefined) {
          child.morphTargetInfluences[doorDict.height] =
            wallData?.blendHeight ?? 0;
        }
      } else if (child.name === "_3a_jamb") {
        const jambDict = child.morphTargetDictionary;

        if (jambDict?.width !== undefined) {
          child.morphTargetInfluences[jambDict.width] =
            wallData?.blendWidth ?? 0;
        }

        if (jambDict?.height !== undefined) {
          child.morphTargetInfluences[jambDict.height] =
            wallData?.blendHeight ?? 0;
        }

        child.visible = !smartMenuAction?.doorOnlyStatus;
      } else if (child.name === "_3a_threshold") {
        const thresholdDict = child.morphTargetDictionary;

        if (thresholdDict?.width !== undefined) {
          child.morphTargetInfluences[thresholdDict.width] =
            wallData?.blendWidth ?? 0;
        }

        if (thresholdDict?.height !== undefined) {
          child.morphTargetInfluences[thresholdDict.height] =
            wallData?.blendHeight ?? 0;
        }

        child.visible = !smartMenuAction?.doorOnlyStatus;
      } else if (child.name === "wall_") {
        const wallDict = child.morphTargetDictionary;

        if (wallDict?.width !== undefined) {
          child.morphTargetInfluences[wallDict.width] =
            wallData?.blendWidth ?? 0;
        }

        if (wallDict?.height !== undefined) {
          child.morphTargetInfluences[wallDict.height] =
            wallData?.blendHeight ?? 0;
        }

        child.visible = !smartMenuAction?.doorOnlyStatus;
      }
    });
  }, [
    scene,
    smartMenuAction?.doorOnlyStatus,
    wallData?.blendWidth,
    wallData?.blendHeight,
  ]);

  return (
    <primitive
      object={scene}
      scale={[1.5, 1.11, 1]}
      position={[0, -0.1, 0.1]}
    />
  );
}

useGLTF.preload("/models/3A.glb");
