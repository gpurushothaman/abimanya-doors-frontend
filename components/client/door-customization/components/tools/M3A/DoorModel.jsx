"use client";

import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const DoorModel = React.memo(function DoorModel({
  smartMenuAction,
  modelPath,
  modelValue,
  selectedPreviousModelData,
  defaultDoor,
}) {
  const { scene } = useThree();

  useEffect(() => {
    if (!modelPath) {
      if (defaultDoor) {
        defaultDoor.visible = true;
      }
      return;
    }

    if (selectedPreviousModelData === "default") {
      if (defaultDoor) {
        defaultDoor.visible = false;
      }
    } else {
      const previousDoor = scene.getObjectByName(
        selectedPreviousModelData?.modelValue
      );

      if (previousDoor) {
        previousDoor.visible = false;
      }
    }
  }, [modelPath, selectedPreviousModelData, defaultDoor, scene, smartMenuAction]);

  if (!modelPath) {
    return null;
  }

  return <DoorModelLoader modelPath={modelPath} modelValue={modelValue} />;
});

const DoorModelLoader = React.memo(function DoorModelLoader({
  modelPath,
  modelValue,
}) {
  const { scene: doorScene } = useGLTF(`${SERVER_URL}/${modelPath}`);

  const cloneRef = useRef(null);

  // Clone ONLY once for this mounted component
  if (!cloneRef.current) {
    console.log("CLONING DOOR:", modelPath);

    const clone = doorScene.clone(true);
    clone.name = modelValue;

    cloneRef.current = clone;
  }

  return <primitive object={cloneRef.current} />;
});

export default DoorModel;
