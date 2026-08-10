"use client";
import React, { memo } from "react";
//Reducer
import { storeFrame } from "../components/state-handling/root";

function OptionFrame({ frameData, state, dispatch }) {
  console.log("state:frame=", state);
  //Store - door model
  const storeFrameToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = frameData.find((item) => item.frameValue === value);

    dispatch(storeFrame(selectedItem));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Frame
      </label>

      <select
        onChange={storeFrameToRootReducer}
        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60"
      >
        <option>Select Frame</option>
        {frameData
          ?.filter(
            (item) => item.status && item.subDesignId == state.subDesign?._id
          )
          ?.map((item) => (
            <option key={item._id} value={item.frameValue}>
              {item.frameName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionFrame, (prevProps, nextProps) => {
  return (
    prevProps.subDesignData === nextProps.subDesignData &&
    prevProps.state.subDesign === nextProps.state.subDesign
  );
});
