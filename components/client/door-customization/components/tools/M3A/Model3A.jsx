"use client";

import React, { useRef } from "react";

import MainDoorModel from "./MainDoorModel";
import Architraves from "./Architraves";
import DoorModel from "./DoorModel";
import DoorTextures from "./DoorTextures";
import SmartMenuActionsApplyToModel from "./SmartMenuActionsApplyToModel";
import AdjustHeightWidthThicknessApplyToModel from "./AdjustHeightWidthThicknessApplyToModel";

const Model3A = React.memo(function Model3A({
  object,
  smartMenuAction,
  thresholdStatus,
  wallData,
  modelData,
  selectedPreviousModelData,
  shadeData,
  frameSectionData,
  selectedPreviousFrameSectionData,
  jambLocationData,
  doorThicknessData,
  selectedPreviousDoorThicknessData,
  frontArchitraveData,
  backArchitraveData
}) {
  const meshRef = useRef({});
  return (
    <group>
      <MainDoorModel object={object} meshRef={meshRef} />
      <Architraves object={object} meshRef={meshRef} />

      <DoorModel
        modelPath={modelData?.modelPath}
        modelValue={modelData?.modelValue}
        selectedPreviousModelData={selectedPreviousModelData}
        meshRef={meshRef}
      />

      <SmartMenuActionsApplyToModel
        meshRef={meshRef}
        doorOnlyStatus={smartMenuAction?.doorOnlyStatus}
        thresholdStatus={thresholdStatus}
      />

      <AdjustHeightWidthThicknessApplyToModel
        meshRef={meshRef}
        wallData={wallData}
        modelPath={modelData?.modelPath}
        modelValue={modelData?.modelValue}
        frameSectionData={frameSectionData}
        selectedPreviousFrameSectionData={selectedPreviousFrameSectionData}
        jambLocationData={jambLocationData}
        doorThicknessData={doorThicknessData}
        selectedPreviousDoorThicknessData={selectedPreviousDoorThicknessData}
        frontArchitraveData={frontArchitraveData}
        backArchitraveData={backArchitraveData}
      />

      <DoorTextures
        modelData={modelData}
        shadeData={shadeData}
        meshRef={meshRef}
        modelPath={modelData?.modelPath}
      />
    </group>
  );
});

export default Model3A;
