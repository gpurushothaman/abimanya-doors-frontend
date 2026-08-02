"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
} from "@react-three/drei";

import DoorModel from "./DoorModel";
import * as THREE from "three";


export default function DoorCanvas() {

  return (
    <Canvas
      shadows
      camera={{
        position: [0, 1.5, 5],
        fov: 35,
      }}
      gl={{
        antialias: true,
        physicallyCorrectLights: true,
        toneMapping: THREE.LinearToneMapping,
       // toneMappingExposure: 1,
      }}
    >

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
      <Environment preset="studio" environmentIntensity={0.5}/>


      <DoorModel />

      <OrbitControls enableDamping />

    </Canvas>
  );
}