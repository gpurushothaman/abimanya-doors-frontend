"use client";

import React, { memo } from "react";
import { Box } from "@mui/material";
import {
  DoorOpen,
  Sun,
  Moon,
} from "lucide-react";

// Reducer
import {
  storeCanvasTheme,
  storeDoorOnlyStatus,
} from "../state-handling/root";

function SmartMenu({ smartMenuAction, dispatch }) {
  console.log("state:smart menu=", smartMenuAction);

  /* =====================================================
     CURRENT STATES
  ===================================================== */

  const isDoorOnly = Boolean(
    smartMenuAction?.doorOnlyStatus
  );

  const isDark =
    smartMenuAction?.canvasBackgroundTheme === "dark";


  /* =====================================================
     DOOR ONLY
  ===================================================== */

  const handleDoorOnly = () => {
    dispatch(
      storeDoorOnlyStatus(!isDoorOnly)
    );
  };


  /* =====================================================
     THEME
  ===================================================== */

  const handleThemeChange = (theme) => {
    const shouldBeDark = theme === "dark";

    if (shouldBeDark === isDark) {
      return;
    }

    const updateTheme = {
      canvasBackgroundThemeStatus: shouldBeDark,
      canvasBackgroundTheme: theme,
    };

    dispatch(storeCanvasTheme(updateTheme));
  };


  return (
    <Box
      sx={{
        position: "absolute",

        top: 70,
        right: 80,

        zIndex: 10,

        display: "flex",
        alignItems: "center",

        gap: "12px",

        width: "fit-content",
      }}
    >

      {/* =================================================
          DOOR ONLY BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={handleDoorOnly}
        aria-label="Door only"
        aria-pressed={isDoorOnly}

        style={{
          width: "52px",
          height: "38px",

          padding: "3px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "24px",

          border: isDoorOnly
            ? "1px solid #078B50"
            : "1px solid #d9d9d9",

          background: isDoorOnly
            ? "#48ad15"
            : "#ffffff",

          cursor: "pointer",

          boxShadow: isDoorOnly
            ? "0 4px 12px rgba(0, 139, 80, 0.25)"
            : "0 3px 10px rgba(0, 0, 0, 0.10)",

          transition:
            "all 180ms ease",

          outline: "none",
        }}
      >

        {/* Door Icon Circle */}

        <span
          style={{
            width: "30px",
            height: "30px",

            borderRadius: "50%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            background: isDoorOnly
              ? "#ffffff"
              : "#48ad15",

            transition:
              "all 180ms ease",

            flexShrink: 0,
          }}
        >

          <DoorOpen
            size={18}
            strokeWidth={1.8}
            color={
              isDoorOnly
                ? "#078B50"
                : "#ffffff"
            }
          />

        </span>

      </button>


      {/* =================================================
          THEME SWITCH
      ================================================= */}

      <div
        style={{
          position: "relative",

          width: "112px",
          height: "38px",

          padding: "3px",

          display: "flex",
          alignItems: "center",

          borderRadius: "24px",

          background: "#ffffff",

          border:
            "1px solid #dedede",

          boxShadow:
            "0 3px 10px rgba(0,0,0,0.10)",

          overflow: "hidden",

          boxSizing: "border-box",
        }}
      >

        {/* =================================================
            GREEN ACTIVE CIRCLE
        ================================================= */}

        <div
          style={{
            position: "absolute",

            top: "50%",

            left: isDark
              ? "calc(75% - 1px)"
              : "calc(25% + 1px)",

            transform:
              "translate(-50%, -50%)",

            width: "32px",
            height: "32px",

            borderRadius: "50%",

            background:
              "#48ad15",

            boxShadow:
              "0 2px 7px rgba(0, 130, 75, 0.25)",

            transition:
              "left 220ms cubic-bezier(0.4, 0, 0.2, 1)",

            pointerEvents: "none",

            zIndex: 1,
          }}
        />


        {/* =================================================
            LIGHT
        ================================================= */}

        <button
          type="button"

          onClick={() =>
            handleThemeChange("light")
          }

          aria-label="Light theme"
          aria-pressed={!isDark}

          style={{
            position: "relative",

            zIndex: 2,

            width: "50%",
            height: "32px",

            padding: 0,

            margin: 0,

            border: "none",
            outline: "none",

            background:
              "transparent",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            cursor: "pointer",

            color: !isDark
              ? "#ffffff"
              : "#555b5b",

            transition:
              "color 180ms ease",

            flexShrink: 0,
          }}
        >

          <Sun
            size={20}
            strokeWidth={1.8}

            style={{
              position: "relative",
              zIndex: 3,
              display: "block",
            }}
          />

        </button>


        {/* =================================================
            DARK
        ================================================= */}

        <button
          type="button"

          onClick={() =>
            handleThemeChange("dark")
          }

          aria-label="Dark theme"
          aria-pressed={isDark}

          style={{
            position: "relative",

            zIndex: 2,

            width: "50%",
            height: "32px",

            padding: 0,

            margin: 0,

            border: "none",
            outline: "none",

            background:
              "transparent",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            cursor: "pointer",

            color: isDark
              ? "#ffffff"
              : "#555b5b",

            transition:
              "color 180ms ease",

            flexShrink: 0,
          }}
        >

          <Moon
            size={20}
            strokeWidth={1.8}

            fill={
              isDark
                ? "#ffffff"
                : "none"
            }

            style={{
              position: "relative",
              zIndex: 3,
              display: "block",
            }}
          />

        </button>

      </div>

    </Box>
  );
}


/* =====================================================
   MEMO
===================================================== */

export default memo(
  SmartMenu,
  (prevProps, nextProps) => {
    return (
      prevProps.smartMenuAction ===
        nextProps.smartMenuAction &&
      prevProps.dispatch ===
        nextProps.dispatch
    );
  }
);