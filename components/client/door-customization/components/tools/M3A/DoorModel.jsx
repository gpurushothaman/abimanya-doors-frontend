"use client";

import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const DoorModel = React.memo(function DoorModel({
  modelPath,
  modelValue,
  selectedPreviousModelData,
  meshRef,
}) {
  console.log("DOOR MODELS");
  const { scene } = useThree();

  useEffect(() => {
    if (!modelPath) {
      if (meshRef?.current) {
        meshRef.current.door.visible = true;
      }
      return;
    }

    if (selectedPreviousModelData === "default") {
      if (meshRef?.current) {
        meshRef.current.door.visible  = false;
      }
    } else {
      const previousDoor = scene.getObjectByName(
        selectedPreviousModelData?.modelValue
      );

      if (previousDoor) {
        previousDoor.visible = false;
      }
    }
  }, [
    modelPath,
    selectedPreviousModelData
  ]);

  if (!modelPath) {
    return null;
  }

  return (
    <DoorModelLoader
      modelPath={modelPath}
      modelValue={modelValue}   
      meshRef={meshRef}
    />
  );

});

const DoorModelLoader = React.memo(function DoorModelLoader({
  modelPath,
  modelValue,  
  meshRef,
}) {
  
  const { scene: doorScene } = useGLTF(`${SERVER_URL}/${modelPath}`);

  const cloneRef = useRef(null);

  if (!cloneRef.current) {
    console.log("cloning door");
    const clone = doorScene.clone(true);
    clone.name = modelValue;

    cloneRef.current = clone;
  }

  useEffect(() => {
    const clone = cloneRef.current;

    if (!clone) return;

    clone.traverse((child) => {
      if (!child.isMesh) return;

     
      meshRef.current[modelValue] = child;
    });
  }, []);

  return <primitive object={cloneRef.current} />;

//   function setMorphTarget(mesh, targetName, value) {
//     if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) {
//       return;
//     }

//     const index = mesh.morphTargetDictionary[targetName];

//     if (index === undefined) {
//       console.warn(`Morph "${targetName}" not found on ${mesh.name}`);
//       return;
//     }

//     mesh.morphTargetInfluences[index] = value;
//   }
});
export default DoorModel;
