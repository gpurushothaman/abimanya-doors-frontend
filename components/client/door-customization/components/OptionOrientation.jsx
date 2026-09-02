"use client";
import React, { memo } from "react";
//Reducer
import { storeOrientation } from "./state-handling/root";

function OptionOrientation({ orientationData, state, dispatch }) {
  console.log("state: orientation =", state);
  //Store - door model
  const storeOrientationToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = orientationData.find(
      (item) => item.doorOrientationValue === value
    );

    dispatch(storeOrientation(selectedItem));
  };
  return (
    <div className="border-t border-gray-100 p-5">
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
      Door Orientation
      </label>

      <select
        onChange={storeOrientationToRootReducer}
        className="w-full
        rounded-xl
        border
        border-gray-200
        bg-[#fafafa]
        px-4
        py-3
        text-[14px]
        outline-none
        focus:border-[#198754]
        focus:ring-4
        focus:ring-[#aaf485]/60"
      >
        <option>Select Orientation</option>
        {orientationData
          ?.filter(
            (item) => item.status && item.frameTypeOptionId == state.frameTypeOption?._id
          )
          ?.map((item) => (
            <option key={item._id} value={item.doorOrientationValue}>
              {item.doorOrientationName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionOrientation, (prevProps, nextProps) => {
  return (
    prevProps.frameTypeOptionData === nextProps.frameTypeOptionData &&
    prevProps.state.frameTypeOption === nextProps.state.frameTypeOption
  );
});