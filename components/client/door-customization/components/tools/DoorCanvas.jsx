"use client";

import React, {  useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import * as THREE from "three";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Box, Button, Stack } from "@mui/material";

//Component
import DoorModel from "./DoorModel";
import Model3A from "./M3A/Model3A";
import SmartMenu from "./SmartMenu";



export default function DoorCanvas({ state, dispatch }) {
  console.log("Door canvas");
  

  const model3AObject = useMemo(
    () => ({
      modelName: "3A",
      modelPath: "/models/3a.glb",
      scale: {
        x: 1,
        y: 1,
        z: 1,
      },
    }),
    []
  );

  

  return (
    <Box
      sx={{
        position: "relative",
        width: "104%",
        height: "100%",
      }}
    >
      <SmartMenu smartMenuAction={state?.smartMenuAction} dispatch={dispatch} />

      <Canvas
        shadows
        // camera={{
        //   position: [0, 0, 4],
        //   fov: 35,
        // }}
        gl={{
          antialias: true,
          physicallyCorrectLights: true,
          toneMapping: THREE.LinearToneMapping,
          // toneMappingExposure: 1,
        }}
        style={{
          background:
            state?.canvasBackgroundTheme[
              state?.smartMenuAction?.canvasBackgroundTheme
            ],
        }}
      >
        <PerspectiveCamera
          makeDefault
          fov={35}
          near={0.1}
          far={20000}
          position={[0, 0, 5]}
        />

        {/* Base light */}
        <ambientLight intensity={1.2} />

        {/* Front */}
        <rectAreaLight
          position={[0, 3, 5]}
          intensity={5}
          width={5}
          height={5}
        />

        {/* Back */}
        <rectAreaLight
          position={[0, 3, -5]}
          rotation={[0, Math.PI, 0]}
          intensity={5}
          width={5}
          height={5}
        />

        {/* Left */}
        <rectAreaLight
          position={[-5, 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          intensity={3}
          width={4}
          height={4}
        />

        {/* Right */}
        <rectAreaLight
          position={[5, 2, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          intensity={3}
          width={4}
          height={4}
        />

        {/* HDR reflections */}
        <Environment preset="studio" environmentIntensity={0.5} />

        {/* <DoorModel
          smartMenuAction={state?.smartMenuAction}
          wallData={state?.wall}
        /> */}

        <Model3A
          object={model3AObject}
          smartMenuAction={state?.smartMenuAction}
          wallData={state?.wall}
          modelData={state?.model}
          selectedPreviousModelData={state?.selectedPreviousModel}
          shadeData={state?.shade}       
        />

        <OrbitControls enableDamping />
      </Canvas>
    </Box>
  );
}
