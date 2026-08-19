"use client";

import React, { useEffect, useMemo } from "react";
import * as THREE from "three";

const AdjustHeightWidthThicknessApplyToModel = React.memo(
  function AdjustHeightWidthThicknessApplyToModel({
    meshRef,
    wallData,
    modelPath,
    modelValue,
  }) {
    console.log("Adjust height width");

    useEffect(() => {
      if (!meshRef?.current) return;
      adjustModelHeightWidth(meshRef);
    }, [wallData?.blendHeight, wallData?.blendWidth, modelPath]);

    // WALL THICKNESS
    useEffect(() => {
      if (!meshRef?.current) return;
      updateWallThickness(meshRef.current, wallData?.blendThickness);
    }, [wallData?.blendThickness]);

    // ==========================================
    // Adjust ( height / width / Thickness )
    // ==========================================

    function adjustModelHeightWidth(meshes) {
      let doorMesh = !modelPath
        ? meshes.current.door
        : meshes.current[modelValue];

      setMorphTarget(meshes.current.frame, "width", wallData?.blendWidth ?? 0);
      setMorphTarget(
        meshes.current.frame,
        "height",
        wallData?.blendHeight ?? 0
      );

      setMorphTarget(meshes.current.jamb, "width", wallData?.blendWidth ?? 0);
      setMorphTarget(meshes.current.jamb, "height", wallData?.blendHeight ?? 0);

      setMorphTarget(
        meshes.current.threshold,
        "width",
        wallData?.blendWidth ?? 0
      );
      setMorphTarget(
        meshes.current.threshold,
        "height",
        wallData?.blendHeight ?? 0
      );

      setMorphTarget(meshes.current.wall, "width", wallData?.blendWidth ?? 0);
      setMorphTarget(meshes.current.wall, "height", wallData?.blendHeight ?? 0);

      setMorphTarget(
        meshes.current.frontArchitrave,
        "width",
        wallData?.blendWidth ?? 0
      );
      setMorphTarget(
        meshes.current.frontArchitrave,
        "height",
        wallData?.blendHeight ?? 0
      );

      setMorphTarget(
        meshes.current.backArchitrave,
        "width",
        wallData?.blendWidth ?? 0
      );
      setMorphTarget(
        meshes.current.backArchitrave,
        "height",
        wallData?.blendHeight ?? 0
      );

      if (doorMesh) {
        setMorphTarget(doorMesh, "width", wallData?.blendWidth ?? 0);
        setMorphTarget(doorMesh, "height", wallData?.blendHeight ?? 0);
      }
    }

    function setMorphTarget(mesh, targetName, value) {
      if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) {
        return;
      }

      const index = mesh.morphTargetDictionary[targetName];

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
        wallMesh.morphTargetInfluences[wallDict["_3a_thickness"]] =
          thickness ?? 0;
      }

      const geometry = wallMesh.geometry;
      const position = geometry.attributes.position;
      const morphPositions = geometry.morphAttributes.position || [];

      const influences = wallMesh.morphTargetInfluences || [];

      const box = new THREE.Box3();

      const vertex = new THREE.Vector3();
      const morph = new THREE.Vector3();

      for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i);

        for (let j = 0; j < morphPositions.length; j++) {
          const influence = influences[j];

          if (!influence) continue;

          morph.fromBufferAttribute(morphPositions[j], i);

          vertex.addScaledVector(morph, influence);
        }

        vertex.applyMatrix4(wallMesh.matrixWorld);

        box.expandByPoint(vertex);
      }

      if (frontArchitrave) {
        frontArchitrave.position.z = box.max.z - 0.07027325675295999;
      }

      if (jamb) {
        const jambDict = jamb.morphTargetDictionary;

        if (jambDict?.thickness !== undefined) {
          jamb.morphTargetInfluences[jambDict.thickness] = thickness ?? 0;
        }
      }
    }

    return null;
  }
);

export default AdjustHeightWidthThicknessApplyToModel;
