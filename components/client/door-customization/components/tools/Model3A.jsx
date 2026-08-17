"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// --------------------------------------------------
// DOOR MODEL
// --------------------------------------------------

const DoorModel = React.memo(function DoorModel({
  modelPath,
  modelValue,
  useCommonModelStatus,
}) {
  if (!modelPath) {
    return null;
  }

  if (useCommonModelStatus && !modelPath) {
    return null;
  }

  return <DoorModelLoader modelPath={modelPath} modelValue={modelValue} />;
});

// --------------------------------------------------
// DOOR MODEL LOADER
// --------------------------------------------------

const DoorModelLoader = React.memo(function DoorModelLoader({
  modelPath,
  modelValue,
}) {
  console.log("RENDER DoorModelLoader");
  // Hooks must always run
  const { scene: doorScene } = useGLTF(`${SERVER_URL}/${modelPath}`);

  const doorModel = scene.getObjectByName(modelValue);

  const doorModelScene = useMemo(() => {
    // Already exists → don't create another clone
    if (doorModel) {
      return null;
    }
    console.log("CLONING MODEL:", modelValue);
    // Doesn't exist → this is a new model
    const clonedScene = doorScene.clone(true);
    clonedScene.name = modelValue;

    return clonedScene;
  }, [doorScene, modelValue, doorModel]);

  if (doorModel) {
    doorModel.visible = true;
    return null;
  }

  return <primitive object={doorModelScene} />;
});

// --------------------------------------------------
// MAIN MODEL
// --------------------------------------------------

const Model3A = React.memo(
  function Model3A({
    object,
    smartMenuAction,
    wallData,
    modelData,
    shadeData,
  }) {
    console.log("RENDER Model3A");

    const meshRef = useRef({});

    // --------------------------------------------------
    // MAIN MODEL
    // --------------------------------------------------

    const { scene: mainScene } = useGLTF(object.modelPath);

    // --------------------------------------------------
    // FRONT ARCHITRAVE
    // --------------------------------------------------

    const { scene: frontArchitraveScene } = useGLTF(
      "/models/3ab_architrave_front.glb"
    );

    // --------------------------------------------------
    // BACK ARCHITRAVE
    // --------------------------------------------------

    const { scene: backArchitraveScene } = useGLTF(
      "/models/3ab_architrave_back.glb"
    );

    // --------------------------------------------------
    // CLONE MAIN MODEL
    // --------------------------------------------------

    const modelScene = useMemo(() => {
      return mainScene.clone(true);
    }, [mainScene]);

    // --------------------------------------------------
    // CLONE FRONT ARCHITRAVE
    // --------------------------------------------------

    const frontScene = useMemo(() => {
      return frontArchitraveScene.clone(true);
    }, [frontArchitraveScene]);

    // --------------------------------------------------
    // CLONE BACK ARCHITRAVE
    // --------------------------------------------------

    const backScene = useMemo(() => {
      return backArchitraveScene.clone(true);
    }, [backArchitraveScene]);

    // --------------------------------------------------
    // MAIN MODEL SETUP
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

          meshRef.current.frame = child;
        }

        // ---------------------------------------------
        // Door
        // ---------------------------------------------
        else if (child.name === "_3a_door001") {
          child.visible = true;

          if (child.material) {
            child.material.roughness = 0.4;
          }

          setMorphTarget(child, "width", wallData?.blendWidth ?? 0);

          setMorphTarget(child, "height", wallData?.blendHeight ?? 0);

          meshRef.current.door = child;
        }

        // ---------------------------------------------
        // Jamb
        // ---------------------------------------------
        else if (child.name === "_3a_jamb") {
          setMorphTarget(child, "width", wallData?.blendWidth ?? 0);

          setMorphTarget(child, "height", wallData?.blendHeight ?? 0);

          child.visible = !smartMenuAction?.doorOnlyStatus;

          meshRef.current.jamb = child;
        }

        // ---------------------------------------------
        // Threshold
        // ---------------------------------------------
        else if (child.name === "_3a_threshold") {
          setMorphTarget(child, "width", wallData?.blendWidth ?? 0);

          setMorphTarget(child, "height", wallData?.blendHeight ?? 0);

          child.visible = !smartMenuAction?.doorOnlyStatus;

          meshRef.current.threshold = child;
        }

        // ---------------------------------------------
        // Wall
        // ---------------------------------------------
        else if (child.name === "wall_") {
          setMorphTarget(child, "width", wallData?.blendWidth ?? 0);

          setMorphTarget(child, "height", wallData?.blendHeight ?? 0);

          child.visible = !smartMenuAction?.doorOnlyStatus;

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

          meshRef.current.frontArchitrave = child;
        }
      });
    }, [
      frontScene,
      object?.scale?.x,
      object?.scale?.y,
      object?.scale?.z,
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

          meshRef.current.backArchitrave = child;
        }
      });
    }, [
      backScene,
      object?.scale?.x,
      object?.scale?.y,
      object?.scale?.z,
      smartMenuAction?.doorOnlyStatus,
      wallData?.blendWidth,
      wallData?.blendHeight,
    ]);

    // --------------------------------------------------
    // WALL THICKNESS
    // --------------------------------------------------

    useEffect(() => {
      updateWallThickness();
    }, [wallData?.blendThickness]);

    // --------------------------------------------------
    // TEXTURE
    // --------------------------------------------------

    useEffect(() => {
      updateDoorSeamlessTexture(
        modelData?.modelMainTexturePath,
        modelData?.textureData?.[0]?.texturePath
      );
    }, [
      modelData?.modelMainTexturePath,
      modelData?.textureData?.[0]?.texturePath,
    ]);

    // --------------------------------------------------
    // UPDATE DOOR TEXTURE
    // --------------------------------------------------

    const updateDoorSeamlessTexture = (
      modelMainTexturePath,
      seamlessTexturePath
    ) => {
      if (!modelMainTexturePath && !seamlessTexturePath) {
        return;
      }

      const doorTextureUrl = modelMainTexturePath
        ? `${SERVER_URL}/${modelMainTexturePath}`
        : null;

      const seamlessTextureUrl = seamlessTexturePath
        ? `${SERVER_URL}/${seamlessTexturePath}`
        : null;

      Object.entries(meshRef.current).forEach(([key, value]) => {
        if (!value?.material) return;

        let textureUrl = null;

        if (key.includes("door")) {
          textureUrl = doorTextureUrl;
        } else if (!key.includes("wall")) {
          textureUrl = seamlessTextureUrl;
        }

        if (!textureUrl) return;

        const textureLoader = new THREE.TextureLoader();

        textureLoader.load(textureUrl, (texture) => {
          texture.flipY = false;
          texture.colorSpace = THREE.SRGBColorSpace;

          if (texture.image) {
            value.material.map = texture;
            value.material.needsUpdate = true;
          }
        });
      });
    };

    // --------------------------------------------------
    // UPDATE WALL THICKNESS
    // --------------------------------------------------

    const updateWallThickness = () => {
      const wallMesh = meshRef.current.wall;
      const frontArchitrave = meshRef.current.frontArchitrave;
      const jamb = meshRef.current.jamb;

      if (!wallMesh) return;

      // ---------------------------------------------
      // Wall thickness morph
      // ---------------------------------------------

      const wallDict = wallMesh.morphTargetDictionary;

      if (wallDict?.["_3a_thickness"] !== undefined) {
        wallMesh.morphTargetInfluences[wallDict["_3a_thickness"]] =
          wallData?.blendThickness ?? 0;
      }

      // ---------------------------------------------
      // Get geometry
      // ---------------------------------------------

      const geometry = wallMesh.geometry;

      const position = geometry.attributes.position;

      const morphPositions = geometry.morphAttributes.position || [];

      const influences = wallMesh.morphTargetInfluences || [];

      // ---------------------------------------------
      // Calculate bounding box
      // ---------------------------------------------

      const box = new THREE.Box3();

      const vertex = new THREE.Vector3();
      const morph = new THREE.Vector3();

      for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i);

        for (let j = 0; j < morphPositions.length; j++) {
          const influence = influences[j];

          if (influence === 0) continue;

          morph.fromBufferAttribute(morphPositions[j], i);

          vertex.addScaledVector(morph, influence);
        }

        vertex.applyMatrix4(wallMesh.matrixWorld);

        box.expandByPoint(vertex);
      }

      // ---------------------------------------------
      // Move front architrave
      // ---------------------------------------------

      if (frontArchitrave) {
        frontArchitrave.position.z = box.max.z - 0.07027325675295999;
      }

      // ---------------------------------------------
      // Jamb thickness
      // ---------------------------------------------

      if (jamb) {
        const jambDict = jamb.morphTargetDictionary;

        if (jambDict?.thickness !== undefined) {
          jamb.morphTargetInfluences[jambDict.thickness] =
            wallData?.blendThickness ?? 0;
        }
      }
    };

    // --------------------------------------------------
    // RENDER
    // --------------------------------------------------

    return (
      <group>
        <primitive object={modelScene} />

        <primitive object={frontScene} />

        <primitive object={backScene} />

        <DoorModel
          modelPath={modelData?.modelPath}
          modelValue={modelData?.modelValue}
          useCommonModelStatus={modelData?.useCommonModelStatus}
        />
      </group>
    );
  },

  // --------------------------------------------------
  // MEMO COMPARISON
  // --------------------------------------------------

  (prev, next) => {
    return (
      // Main model
      prev.object?.modelPath === next.object?.modelPath &&
      prev.object?.modelName === next.object?.modelName &&
      prev.object?.scale?.x === next.object?.scale?.x &&
      prev.object?.scale?.y === next.object?.scale?.y &&
      prev.object?.scale?.z === next.object?.scale?.z &&
      // Door model
      prev.modelData?.modelPath === next.modelData?.modelPath &&
      prev.modelData?.modelValue === next.modelData?.modelValue &&
      prev.modelData?.useCommonModelStatus ===
        next.modelData?.useCommonModelStatus &&
      // Door texture
      prev.modelData?.modelMainTexturePath ===
        next.modelData?.modelMainTexturePath &&
      prev.modelData?.textureData?.[0]?.texturePath ===
        next.modelData?.textureData?.[0]?.texturePath &&
      // Wall
      prev.wallData?.blendWidth === next.wallData?.blendWidth &&
      prev.wallData?.blendHeight === next.wallData?.blendHeight &&
      prev.wallData?.blendThickness === next.wallData?.blendThickness &&
      // Menu
      prev.smartMenuAction?.doorOnlyStatus ===
        next.smartMenuAction?.doorOnlyStatus
    );
  }
);

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
