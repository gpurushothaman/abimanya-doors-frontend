"use client";
import React, { memo } from "react";
//Reducer
import { storeThreshold } from "../components/state-handling/root";

function OptionThreshold({ thresholdData, state, dispatch }) {
  console.log("state: threshold =", state);
  //Store - door model
  const storeThresholdToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = thresholdData.find(
      (item) => item.thresholdValue === value
    );

    dispatch(storeThreshold(selectedItem));
  };
  return (
    <div className="border-t border-gray-100 px-5 pb-5 pt-4">
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Threshold
      </label>

      <select
        onChange={storeThresholdToRootReducer}
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
        <option>Select Threshold</option>
        {thresholdData
          ?.filter(
            (item) => item.status && item.subDesignId == state.subDesign?._id
          )
          ?.map((item) => (
            <option key={item._id} value={item.thresholdValue}>
              {item.thresholdName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionThreshold, (prevProps, nextProps) => {
  return (
    prevProps.subDesignData === nextProps.subDesignData &&
    prevProps.state.subDesign === nextProps.state.subDesign
  );
});