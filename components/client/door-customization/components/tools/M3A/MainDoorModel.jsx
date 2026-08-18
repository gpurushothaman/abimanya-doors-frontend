"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MainDoorModel = React.memo(function MainDoorModel({
  object,
  smartMenuAction,
  wallData,
  meshRef,
  selectedPreviousModelData
}) {
   const { scene: mainScene } = useGLTF(object.modelPath);

  const modelScene = useMemo(() => {
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
        setMorphTarget(
          child,
          "width",
          wallData?.blendWidth ?? 0
        );

        setMorphTarget(
          child,
          "height",
          wallData?.blendHeight ?? 0
        );

        child.visible =
          !smartMenuAction?.doorOnlyStatus;

        meshRef.current.frame = child;
      }

      // DOOR
      else if (child.name === "_3a_door001") {
        child.visible = true;

        if (child.material) {
          child.material.roughness = 0.4;
        }

        setMorphTarget(
          child,
          "width",
          wallData?.blendWidth ?? 0
        );

        setMorphTarget(
          child,
          "height",
          wallData?.blendHeight ?? 0
        );

        meshRef.current.door = child;
      }

      // JAMB
      else if (child.name === "_3a_jamb") {
        setMorphTarget(
          child,
          "width",
          wallData?.blendWidth ?? 0
        );

        setMorphTarget(
          child,
          "height",
          wallData?.blendHeight ?? 0
        );

        child.visible =
          !smartMenuAction?.doorOnlyStatus;

        meshRef.current.jamb = child;
      }

      // THRESHOLD
      else if (child.name === "_3a_threshold") {
        setMorphTarget(
          child,
          "width",
          wallData?.blendWidth ?? 0
        );

        child.visible =
          !smartMenuAction?.doorOnlyStatus;

        meshRef.current.threshold = child;
      }

      // WALL
      else if (child.name === "wall_") {
        setMorphTarget(
          child,
          "width",
          wallData?.blendWidth ?? 0
        );

        setMorphTarget(
          child,
          "height",
          wallData?.blendHeight ?? 0
        );

        child.visible =
          !smartMenuAction?.doorOnlyStatus;

        meshRef.current.wall = child;
      }
    });
  }, [
    modelScene,
    object?.modelName,
    object?.scale?.x,
    object?.scale?.y,
    object?.scale?.z,
    smartMenuAction?.doorOnlyStatus,
    wallData?.blendWidth,
    wallData?.blendHeight,
  ]);

  // WALL THICKNESS
  useEffect(() => {
    updateWallThickness(
      meshRef.current,
      wallData?.blendThickness
    );
  }, [wallData?.blendThickness]);

  return (
    <primitive object={modelScene} />
  );
});

function setMorphTarget(mesh, targetName, value) {
  if (
    !mesh.morphTargetDictionary ||
    !mesh.morphTargetInfluences
  ) {
    return;
  }

  const index =
    mesh.morphTargetDictionary[targetName];

  if (index === undefined) {
    return;
  }

  mesh.morphTargetInfluences[index] = value;
}

function updateWallThickness(meshRef, thickness) {
  const wallMesh = meshRef.wall;
  const frontArchitrave = meshRef.frontArchitrave;
  const jamb = meshRef.jamb;

  if (!wallMesh) return;

  const wallDict = wallMesh.morphTargetDictionary;

  if (wallDict?.["_3a_thickness"] !== undefined) {
    wallMesh.morphTargetInfluences[
      wallDict["_3a_thickness"]
    ] = thickness ?? 0;
  }

  const geometry = wallMesh.geometry;
  const position = geometry.attributes.position;
  const morphPositions =
    geometry.morphAttributes.position || [];

  const influences =
    wallMesh.morphTargetInfluences || [];

  const box = new THREE.Box3();

  const vertex = new THREE.Vector3();
  const morph = new THREE.Vector3();

  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);

    for (
      let j = 0;
      j < morphPositions.length;
      j++
    ) {
      const influence = influences[j];

      if (!influence) continue;

      morph.fromBufferAttribute(
        morphPositions[j],
        i
      );

      vertex.addScaledVector(
        morph,
        influence
      );
    }

    vertex.applyMatrix4(
      wallMesh.matrixWorld
    );

    box.expandByPoint(vertex);
  }

  if (frontArchitrave) {
  
    frontArchitrave.position.z =
      box.max.z - 0.07027325675295999;
  }

  if (jamb) {
 
    const jambDict =
      jamb.morphTargetDictionary;

    if (
      jambDict?.thickness !== undefined
    ) {
      jamb.morphTargetInfluences[
        jambDict.thickness
      ] = thickness ?? 0;
    }
  }
}

export default MainDoorModel;