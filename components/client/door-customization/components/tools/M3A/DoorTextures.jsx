"use client";

import React, { useEffect } from "react";
import * as THREE from "three";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const DoorTextures = React.memo(function DoorTextures({ modelData, meshRef }) {
  
  useEffect(() => {
    const doorTextureUrl = modelData?.modelMainTexturePath
      ? `${SERVER_URL}/${modelData?.modelMainTexturePath}`
      : null;

    const seamlessTextureUrl = modelData?.textureData?.[0]?.texturePath
      ? `${SERVER_URL}/${modelData?.textureData?.[0]?.texturePath}`
      : null;

    if (!doorTextureUrl && !seamlessTextureUrl) {
      return;
    }

    console.log("TEXTURE CHANGED", doorTextureUrl, seamlessTextureUrl);

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
  }, [modelData?.modelMainTexturePath, modelData?.textureData?.[0]?.texturePath]);

  return null;
});

export default DoorTextures;
