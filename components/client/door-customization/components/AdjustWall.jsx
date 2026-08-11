"use client";
import React, { memo } from "react";
//Reducer
import { storeAdjustWallHeight, storeAdjustWallWidth } from "../components/state-handling/root";

function AdjustWall({ wallData, dispatch }) {
  console.log("state:wall=", wallData);

  const handleWallHeightChange = (e) => {
    const height = Number(e.target.value);

    let blend =
      (height - wallData?.heightMin) /
      (wallData?.heightMax - wallData?.heightMin);

    let wallBlendHeight = Math.max(0, Math.min(1, blend));

    const payload = {
      height: height,
      blendHeight: wallBlendHeight,
    };
    dispatch(storeAdjustWallHeight(payload));
  };


  const handleWallWidthChange = (e) => {
    const width = Number(e.target.value);

    let blend =
      (width - wallData?.widthMin) /
      (wallData?.widthMax - wallData?.widthMin);

    let wallBlendWidth = Math.max(0, Math.min(1, blend));

    const payload = {
      width: width,
      blendWidth: wallBlendWidth,
    };
    dispatch(storeAdjustWallWidth(payload));
  };

  return (
    <div className="rounded-xl bg-[#f6f8f5] p-4">
      <p className="text-[14px] font-semibold">Wall Dimensions</p>

      <p className="mt-1 text-[12px] text-gray-500">
        Adjust the wall size for your door
      </p>

      {/* HEIGHT */}

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-[13px] font-medium">Height</label>

          <span className="text-[12px] font-semibold text-[#198754]">
            {wallData?.height} mm
          </span>
        </div>

        <input
          type="range"
          min="1800"
          max="2400"
          defaultValue="2100"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#198754]"
          onChange={(e) => handleWallHeightChange(e)}
        />

        <p className="mt-2 text-[11px] text-gray-400">1800 – 2400 mm</p>
      </div>

      {/* WIDTH */}

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-[13px] font-medium">Width</label>

          <span className="text-[12px] font-semibold text-[#198754]">
            {wallData?.width} mm
          </span>
        </div>

        <input
          type="range"
          min="600"
          max="1200"
          defaultValue="600"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#198754]"
          onChange={(e) => handleWallWidthChange(e)}
        />

        <p className="mt-2 text-[11px] text-gray-400">600 – 1200 mm</p>
      </div>

      {/* THICKNESS */}

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-[13px] font-medium">Wall Thickness</label>

          <span className="text-[12px] font-semibold text-[#198754]">
            140 mm
          </span>
        </div>

        <input
          type="range"
          min="140"
          max="260"
          defaultValue="140"
          className="h-1.5 w-full cursor-pointer rounded-lg bg-gray-200 accent-[#198754]"
        />

        <p className="mt-2 text-[11px] text-gray-400">140 – 260 mm</p>
      </div>
    </div>
  );
}

export default memo(AdjustWall);
// export default memo(AdjustWall, (prevProps, nextProps) => {
//   return (
//     prevProps.subDesignData === nextProps.subDesignData &&
//     prevProps.state.subDesign === nextProps.state.subDesign
//   );
// });
