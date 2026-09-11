"use client";
import React, { memo } from "react";
//Reducer
import { storeFrameSection } from "../components/state-handling/root";

function OptionFrameSection({ frameSectionData, state, dispatch }) {
  console.log("state:frame section=", state);
  //Store - door model
  const storeFrameSectionToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = frameSectionData.find((item) => item.frameSectionValue === value);

    dispatch(storeFrameSection(selectedItem));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Frame Section
      </label>

      <select
      defaultValue={state.frameSection?.frameSectionValue || ""}
        onChange={storeFrameSectionToRootReducer}
        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60"
      >
        <option>Select Frame Section</option>
        {frameSectionData
          ?.filter(
            (item) => item.status && item.frameTypeOptionId == state.frameTypeOption?._id
          )
          ?.map((item) => (
            <option key={item._id} value={item.frameSectionValue}>
              {item.frameSectionName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionFrameSection, (prevProps, nextProps) => {
  return (
    prevProps.frameTypeOptionData === nextProps.frameTypeOptionData &&
    prevProps.state.frameTypeOption === nextProps.state.frameTypeOption
  );
});
