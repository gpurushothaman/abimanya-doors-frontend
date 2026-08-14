"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Box, Button, Stack } from "@mui/material";

//Component
import DoorModel from "./DoorModel";
import Model3A from "./Model3A";
import SmartMenu from "./SmartMenu";

export default function DoorCanvas({ state, dispatch, isSidebarOpen }) {
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
          position={
            isSidebarOpen
              ? [0, 0, 5]
              : [0, 0, 5]
          }
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
          object={{
            modelName: "3A",
            modelPath: "/models/3a.glb",
            scale: {
              x: 1,
              y: 1,
              z: 1,
            },
          }}
          smartMenuAction={state?.smartMenuAction}
          wallData={state?.wall}
          isSidebarOpen={isSidebarOpen}
        />

        <OrbitControls enableDamping />
      </Canvas>
    </Box>
  );
}
