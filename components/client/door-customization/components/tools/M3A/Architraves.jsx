"use client";

import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

const Architraves = React.memo(function Architraves({
  object,
  smartMenuAction,
  wallData,
  meshRef
}) {
  const { scene: frontArchitraveScene } =
    useGLTF("/models/3ab_architrave_front.glb");

  const { scene: backArchitraveScene } =
    useGLTF("/models/3ab_architrave_back.glb");

  const frontScene = useMemo(
    () => frontArchitraveScene.clone(true),
    [frontArchitraveScene]
  );

  const backScene = useMemo(
    () => backArchitraveScene.clone(true),
    [backArchitraveScene]
  );

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

      if (child.name === "_3a_b_architrave_front") {
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

      if (child.name === "_3a_b_architrave_back") {
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

  return (
    <>
      <primitive object={frontScene} />
      <primitive object={backScene} />
    </>
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

  if (index === undefined) return;

  mesh.morphTargetInfluences[index] = value;
}

export default Architraves;