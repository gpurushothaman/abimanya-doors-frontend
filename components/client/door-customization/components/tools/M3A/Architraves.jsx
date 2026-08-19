"use client";

import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

const Architraves = React.memo(function Architraves({
  object,
  meshRef
}) {

    console.log("Architrave")
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
          meshRef.current.frontArchitrave = child;
      }
    });
  }, [
    frontScene,
    object?.scale?.x,
    object?.scale?.y,
    object?.scale?.z  
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
          meshRef.current.backArchitrave = child;
      }
    });
  }, [
    backScene,
    object?.scale?.x,
    object?.scale?.y,
    object?.scale?.z
  ]);

  return (
    <>
      <primitive object={frontScene} />
      <primitive object={backScene} />
    </>
  );
});

export default Architraves;