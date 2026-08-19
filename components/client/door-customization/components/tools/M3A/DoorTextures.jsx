"use client";

import React, { useEffect } from "react";
import * as THREE from "three";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const DoorTextures = React.memo(function DoorTextures({
  modelData,
  shadeData,
  meshRef,
  modelPath,
}) {
  // ==========================================
  // MODEL DATA → MODEL MAIN TEXTURE
  // ==========================================
  useEffect(() => {
    if (!meshRef?.current) return;

    const doorTextureUrl = modelData?.modelMainTexturePath
      ? `${SERVER_URL}/${modelData.modelMainTexturePath}`
      : null;

    const seamlessTextureUrl = modelData?.textureData?.[0]?.texturePath
      ? `${SERVER_URL}/${modelData.textureData[0].texturePath}`
      : null;

    if (!doorTextureUrl && !seamlessTextureUrl) return;

    console.log("MODEL TEXTURE CHANGED", modelData);

    applyTextures(
      meshRef.current,
      doorTextureUrl,
      seamlessTextureUrl,
      modelData?.modelValue
    );
  }, [
    modelData?.modelMainTexturePath,
    modelData?.textureData?.[0]?.texturePath,
  ]);

  // ==========================================
  // SHADE DATA → SHADE MAIN TEXTURE
  // ==========================================
  useEffect(() => {
    if (!meshRef?.current) return;

    const doorTextureUrl = shadeData?.texturePath
      ? `${SERVER_URL}/${shadeData.texturePath}`
      : null;

    const seamlessTextureUrl = shadeData?.textureData?.[0]?.texturePath
      ? `${SERVER_URL}/${shadeData.textureData[0].texturePath}`
      : null;

    if (!doorTextureUrl && !seamlessTextureUrl) return;

    console.log("SHADE TEXTURE CHANGED", doorTextureUrl);

    applyTextures(
      meshRef.current,
      doorTextureUrl,
      seamlessTextureUrl,
      modelData?.modelValue
    );
  }, [shadeData?.texturePath, shadeData?.textureData?.[0]?.texturePath]);

  // ==========================================
  // APPLY TEXTURES
  // ==========================================
  function applyTextures(
    meshes,
    doorTextureUrl,
    seamlessTextureUrl,
    modelValue
  ) {
    const textureLoader = new THREE.TextureLoader();

    Object.entries(meshes).forEach(([key, mesh]) => {
      if (!mesh?.material) return;

      let textureUrl = null;

      const meshName = key;

      //Except door - Apply seamless texture

      let selectDoorMesh = !modelPath ? "door" : modelValue;

      if (selectDoorMesh === meshName) {
        textureUrl = doorTextureUrl;
      }

      //Apply seamless texture
      else if (
        [
          "frame",
          "jamb",
          "threshold",
          "frontArchitrave",
          "backArchitrave",
        ]?.indexOf(meshName) !== -1
      ) {
        textureUrl = seamlessTextureUrl;
      }

      if (!textureUrl) return;

      textureLoader.load(textureUrl, (texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;

        // Dispose old texture
        if (mesh.material.map) {
          mesh.material.map.dispose();
        }

        mesh.material.map = texture;
        mesh.material.needsUpdate = true;
      });
    });
  }

  return null;
});

export default DoorTextures;
