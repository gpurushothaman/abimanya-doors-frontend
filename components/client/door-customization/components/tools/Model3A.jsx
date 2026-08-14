"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model3A({ object, smartMenuAction, wallData, isSidebarOpen }) {
  const wallRef = useRef(null);
  const frontArchitraveRef = useRef(null);
  const jambRef = useRef(null);
  // Main model
  const { scene: mainScene } = useGLTF(object.modelPath);

  // Front architrave
  const { scene: frontArchitraveScene } = useGLTF(
    "/models/3ab_architrave_front.glb"
  );

  // Back architrave
  const { scene: backArchitraveScene } = useGLTF(
    "/models/3ab_architrave_back.glb"
  );

  /*
   * Clone the scenes so that modifying one Model3A
   * does not affect another Model3A.
   */
  const modelScene = useMemo(() => {
    return mainScene.clone(true);
  }, [mainScene]);

  const frontScene = useMemo(() => {
    return frontArchitraveScene.clone(true);
  }, [frontArchitraveScene]);

  const backScene = useMemo(() => {
    return backArchitraveScene.clone(true);
  }, [backArchitraveScene]);

  // --------------------------------------------------
  // MAIN MODEL
  // --------------------------------------------------

  useEffect(() => {
    modelScene.name = object.modelName;

    modelScene.scale.set(
      object?.scale?.x ?? 1,
      object?.scale?.y ?? 1,
      object?.scale?.z ?? 1
    );

    modelScene.traverse((child) => {
      if (!child.isMesh) return;

      console.log("child:", child.name);

      //   child.castShadow = true;
      //   child.receiveShadow = true;

      if (child.material) {
        child.material.needsUpdate = true;
      }

      // ---------------------------------------------
      // Frame
      // ---------------------------------------------

      if (child.name === "_3a_90_60_frame") {
        setMorphTarget(child, "width", wallData?.blendWidth ?? 0);
        setMorphTarget(child, "height", wallData?.blendHeight ?? 0);

        child.visible = !smartMenuAction?.doorOnlyStatus;
      }

      // ---------------------------------------------
      // Door
      // ---------------------------------------------
      else if (child.name === "_3a_door001") {
        child.visible = true;

        child.material.roughness = 0.4;

        setMorphTarget(child, "width", wallData?.blendWidth ?? 0);
        setMorphTarget(child, "height", wallData?.blendHeight ?? 0);
      }

      // ---------------------------------------------
      // Jamb
      // ---------------------------------------------
      else if (child.name === "_3a_jamb") {
        setMorphTarget(child, "width", wallData?.blendWidth ?? 0);
        setMorphTarget(child, "height", wallData?.blendHeight ?? 0);

        child.visible = !smartMenuAction?.doorOnlyStatus;
        jambRef.current = child;
      }

      // ---------------------------------------------
      // Threshold
      // ---------------------------------------------
      else if (child.name === "_3a_threshold") {
        setMorphTarget(child, "width", wallData?.blendWidth ?? 0);
        setMorphTarget(child, "height", wallData?.blendHeight ?? 0);

        child.visible = !smartMenuAction?.doorOnlyStatus;
      }

      // ---------------------------------------------
      // Wall
      // ---------------------------------------------
      else if (child.name === "wall_") {
        setMorphTarget(child, "width", wallData?.blendWidth ?? 0);
        setMorphTarget(child, "height", wallData?.blendHeight ?? 0);

        child.visible = !smartMenuAction?.doorOnlyStatus;
        wallRef.current = child;
      }
    });
  }, [
    modelScene,
    smartMenuAction?.doorOnlyStatus,
    wallData?.blendWidth,
    wallData?.blendHeight,
  ]);

  // --------------------------------------------------
  // FRONT ARCHITRAVE
  // --------------------------------------------------

  useEffect(() => {
    frontScene.name = "3a_front_architrave";

    frontScene.scale.set(
      object?.scale?.x ?? 1,
      object?.scale?.y ?? 1,
      object?.scale?.z ?? 1
    );

    frontScene.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        child.material.needsUpdate = true;
      }

      if (child.name === "_3a_b_architrave_front") {
        setMorphTarget(child, "width", wallData?.blendWidth ?? 0);
        setMorphTarget(child, "height", wallData?.blendHeight ?? 0);

        child.visible = !smartMenuAction?.doorOnlyStatus;
        frontArchitraveRef.current = child;
      }
    });
  }, [
    frontScene,
    smartMenuAction?.doorOnlyStatus,
    wallData?.blendWidth,
    wallData?.blendHeight,
  ]);

  // --------------------------------------------------
  // BACK ARCHITRAVE
  // --------------------------------------------------

  useEffect(() => {
    backScene.name = "3a_back_architrave";

    backScene.scale.set(
      object?.scale?.x ?? 1,
      object?.scale?.y ?? 1,
      object?.scale?.z ?? 1
    );

    backScene.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        child.material.needsUpdate = true;
      }

      if (child.name === "_3a_b_architrave_back") {
        setMorphTarget(child, "width", wallData?.blendWidth ?? 0);
        setMorphTarget(child, "height", wallData?.blendHeight ?? 0);

        child.visible = !smartMenuAction?.doorOnlyStatus;
      }
    });
  }, [
    backScene,
    smartMenuAction?.doorOnlyStatus,
    wallData?.blendWidth,
    wallData?.blendHeight,
  ]);

  useEffect(() => {
    updateWallThickness();
  }, [wallData?.blendThickness]);


  const updateWallThickness = () => {
    const wallMesh = wallRef.current;
    const frontArchitrave = frontArchitraveRef.current;
    const jamb = jambRef.current;
  
    if (!wallMesh) return;
  
    // -----------------------------
    // Wall thickness morph
    // -----------------------------
  
    const wallDict = wallMesh.morphTargetDictionary;
  
    if (wallDict?.["_3a_thickness"] !== undefined) {
      wallMesh.morphTargetInfluences[
        wallDict["_3a_thickness"]
      ] = wallData?.blendThickness;
    }
  
    // -----------------------------
    // Get wall geometry
    // -----------------------------
  
    const geometry = wallMesh.geometry;
  
    const position = geometry.attributes.position;
  
    const morphPositions =
      geometry.morphAttributes.position || [];
  
    const influences =
      wallMesh.morphTargetInfluences || [];
  
    // -----------------------------
    // Calculate bounding box
    // -----------------------------
  
    const box = new THREE.Box3();
  
    const vertex = new THREE.Vector3();
    const morph = new THREE.Vector3();
  
    for (let i = 0; i < position.count; i++) {
  
      // Base position
      vertex.fromBufferAttribute(position, i);
  
      // Apply morph targets
      for (let j = 0; j < morphPositions.length; j++) {
  
        const influence = influences[j];
  
        if (influence === 0) continue;
  
        morph.fromBufferAttribute(
          morphPositions[j],
          i
        );
  
        vertex.addScaledVector(
          morph,
          influence
        );
      }
  
      // Convert to world space
      vertex.applyMatrix4(
        wallMesh.matrixWorld
      );
  
      // Expand bounding box
      box.expandByPoint(vertex);
    }
  
    // -----------------------------
    // Move front architrave
    // -----------------------------
  
    if (frontArchitrave) {
      frontArchitrave.position.z =
        box.max.z - 0.07027325675295999;
    }
  
    // -----------------------------
    // Jamb thickness
    // -----------------------------
  
    if (jamb) {
      const jambDict =
        jamb.morphTargetDictionary;
  
      if (jambDict?.thickness !== undefined) {
        jamb.morphTargetInfluences[
          jambDict.thickness
        ] = wallData?.blendThickness;
      }
    }
  };




  return (
    <group  position={[isSidebarOpen ? 0.5 : 0,0,0,]} >

    <primitive object={modelScene} />
    <primitive object={frontScene} />
    <primitive object={backScene} />

  </group>
  );
}

// --------------------------------------------------
// MORPH TARGET HELPER
// --------------------------------------------------

function setMorphTarget(mesh, targetName, value) {
  if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) {
    return;
  }

  const index = mesh.morphTargetDictionary[targetName];

  if (index === undefined) {
    console.warn(`Morph target "${targetName}" not found on ${mesh.name}`);

    return;
  }

  mesh.morphTargetInfluences[index] = value;
}

export default Model3A;
