"use client";

import React, { useEffect, useMemo } from "react";

const SmartMenuActionsApplyToModel = React.memo(
  function SmartMenuActionsApplyToModel({ meshRef, doorOnlyStatus, thresholdStatus }) {
    console.log("Smart menu actions");

    useEffect(() => {   
      if (!meshRef?.current) return;
      showDoorOnly(meshRef);
    }, [doorOnlyStatus]);

    useEffect(() => {    
      if (!meshRef?.current) return;
      showThreshold(meshRef);
    }, [thresholdStatus]);

    // ==========================================
    // SHOW DOOR ONLY
    // ==========================================
    function showDoorOnly(meshes) {
      meshes.current.frame.visible = meshes.current.jamb.visible = meshes.current.threshold.visible = meshes.current.wall.visible = meshes.current.frontArchitrave.visible = meshes.current.backArchitrave.visible = !doorOnlyStatus;
    }

    // ==========================================
    // SHOW THRESHOLD
    // ==========================================
    function showThreshold(meshes) {
       meshes.current.threshold.visible = thresholdStatus;
    }

    return null;
  }
);

export default SmartMenuActionsApplyToModel;
