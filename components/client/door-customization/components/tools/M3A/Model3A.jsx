"use client";

import React,{useRef} from "react";
import MainDoorModel from "./MainDoorModel";
import Architraves from "./Architraves";
import DoorModel from "./DoorModel";
import DoorTextures from "./DoorTextures";

const Model3A = React.memo(function Model3A({
  object,
  smartMenuAction,
  wallData,
  modelData,
  selectedPreviousModelData,
  shadeData,
}) {
  const meshRef = useRef({});
  return (
    <group>
      {/* Main frame / wall / jamb / threshold */}
      <MainDoorModel
        object={object}
        smartMenuAction={smartMenuAction}
        wallData={wallData}
        meshRef={meshRef}
        selectedPreviousModelData={selectedPreviousModelData}
      />

      {/* Front + Back architraves */}
      <Architraves
        object={object}
        smartMenuAction={smartMenuAction}
        wallData={wallData}
        meshRef={meshRef}
      />

      {/* Changeable door */}
      <DoorModel
        smartMenuAction={smartMenuAction}
        modelPath={modelData?.modelPath}
        modelValue={modelData?.modelValue}
        selectedPreviousModelData={selectedPreviousModelData}
        defaultDoor={meshRef?.current?.door}
      />

      {/* Textures */}
      <DoorTextures
        modelData={modelData}
        shadeData={shadeData}  
        meshRef={meshRef}   
      />
    </group>
  );
});

export default Model3A;