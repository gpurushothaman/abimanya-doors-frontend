"use client";

import React, { useEffect, useMemo } from "react";
import * as THREE from "three";

const AdjustHeightWidthThicknessApplyToModel = React.memo(
  function AdjustHeightWidthThicknessApplyToModel({
    meshRef,
    wallData,
    modelPath,
    modelValue,
    frameSectionData,
    selectedPreviousFrameSectionData,
    jambLocationData,
    doorThicknessData,
    selectedPreviousDoorThicknessData,
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

    // FRAME SECTION
    useEffect(() => {
      if (!meshRef?.current) return;
      adjustFrameSection(meshRef.current);
    }, [frameSectionData]);

    // DOOR THICKNESS
    useEffect(() => {
      if (!meshRef?.current) return;
      adjustDoorThickness(meshRef.current);
    }, [doorThicknessData]);

    // ==========================================
    // Adjust ( Door Thickness )
    // ==========================================

    function adjustDoorThickness(meshes) {
      //Reset
      if (selectedPreviousDoorThicknessData) {
        setMorphTarget(
          meshes[modelValue] || meshes.door,
          selectedPreviousDoorThicknessData?.DoorThicknessValue,
          0
        );
        setMorphTarget(
          meshes.frame,
          selectedPreviousDoorThicknessData?.DoorThicknessValue,
          0
        );
        setMorphTarget(
          meshes.threshold,
          selectedPreviousDoorThicknessData?.DoorThicknessValue,
          0
        );
      }
      if (doorThicknessData?.DoorThicknessValue !== "DT_32") {
        //Apply door thickness to ( frame and threshold )
        setMorphTarget(meshes.frame, doorThicknessData?.DoorThicknessValue, 1);
        setMorphTarget(
          meshes.threshold,
          doorThicknessData?.DoorThicknessValue,
          1
        );
        setMorphTarget(
          meshes[modelValue] || meshes.door,
          doorThicknessData?.DoorThicknessValue,
          1
        );
      }
    }

    // ==========================================
    // Adjust ( Frame Section )
    // ==========================================

    function adjustFrameSection(meshes) {
      let thresholdDictName = null;
      let framesectionDictName = null;

      //Reset
      if (selectedPreviousFrameSectionData) {
        if (jambLocationData === "front") {
          //3A
          framesectionDictName =
            selectedPreviousFrameSectionData?.frameSectionValue;
          thresholdDictName =
            selectedPreviousFrameSectionData?.frameSectionValue?.replace(
              "_F",
              "_T"
            );
        } else {
          //3B
          framesectionDictName =
            selectedPreviousFrameSectionData?.frameSectionValue?.replace(
              "_3a",
              "_3b"
            );
          thresholdDictName =
            selectedPreviousFrameSectionData?.frameSectionValue
              ?.replace("_F", "_T")
              ?.replace("_3a", "_3b");
        }

        setMorphTarget(meshes.frame, framesectionDictName, 0);
        setMorphTarget(meshes.threshold, thresholdDictName, 0);
      }

      if (jambLocationData === "front") {
        //3A
        framesectionDictName = frameSectionData?.frameSectionValue;
        thresholdDictName = frameSectionData?.frameSectionValue?.replace(
          "_F",
          "_T"
        );
      } else {
        //3B
        framesectionDictName = frameSectionData?.frameSectionValue?.replace(
          "_3a",
          "_3b"
        );
        thresholdDictName = frameSectionData?.frameSectionValue
          ?.replace("_F", "_T")
          ?.replace("_3a", "_3b");
      }

      setMorphTarget(meshes.frame, framesectionDictName, 1);
      setMorphTarget(meshes.threshold, thresholdDictName, 1);
    }

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
      if (!mesh?.morphTargetDictionary || !mesh?.morphTargetInfluences) {
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
