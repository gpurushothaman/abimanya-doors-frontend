"use client";
import React, { memo } from "react";
//Reducer
import { storeFrameType } from "../components/state-handling/root";

function OptionFrameType({ frameTypeData, state, dispatch }) {
  console.log("state:frame type=", state);
  //Store - door model
  const storeFrameTypeToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = frameTypeData.find((item) => item.frameTypeValue === value);

    dispatch(storeFrameType(selectedItem));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Frame Type
      </label>

      <select
        onChange={storeFrameTypeToRootReducer}
        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60"
      >
        <option>Select Frame Type</option>
        {frameTypeData
          ?.filter(
            (item) => item.status && item.frameId == state.frame?._id
          )
          ?.map((item) => (
            <option key={item._id} value={item.frameTypeValue}>
              {item.frameTypeName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionFrameType, (prevProps, nextProps) => {
  return (
    prevProps.frameData === nextProps.frameData &&
    prevProps.state.frame === nextProps.state.frame
  );
});
