"use client";
import React, { memo } from "react";
import { Button, Stack } from "@mui/material";

//Reducer
import { storeCanvasTheme, storeDoorOnlyStatus } from "../state-handling/root";

function SmartMenu({ smartMenuAction, dispatch }) {
  console.log("state:smart menu=", smartMenuAction);
  //Store - canvas theme
  const storeCanvasThemeToRootReducer = () => {
    const updateTheme = {
      canvasBackgroundThemeStatus:
        !smartMenuAction?.canvasBackgroundThemeStatus,
      canvasBackgroundTheme: !smartMenuAction?.canvasBackgroundThemeStatus
        ? "dark"
        : "light",
    };

    dispatch(storeCanvasTheme(updateTheme));
  };

  //Store - door only status
  const storeDoorOnlyStatusToRootReducer = () => {
    dispatch(storeDoorOnlyStatus(!smartMenuAction?.doorOnlyStatus));
  };
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        position: "absolute",
        top: 80,
        right: 16,
        zIndex: 10,
      }}
    >
      <Button
        variant="contained"
        size="small"
        onClick={storeDoorOnlyStatusToRootReducer}
      >
        Door only
      </Button>

      <Button
        variant="outlined"
        size="small"
        onClick={storeCanvasThemeToRootReducer}
      >
        Theme
      </Button>
    </Stack>
  );
}

export default memo(SmartMenu, (prevProps, nextProps) => {
  return (
    prevProps.smartMenuAction === nextProps.smartMenuAction &&
    prevProps.dispatch === nextProps.dispatch
  );
});
