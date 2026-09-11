"use client";
import React, { memo } from "react";
//Reducer
import { storeBackArchitrave } from "../components/state-handling/root";

function OptionBackArchitrave({ backArchitraveData, state, dispatch }) {
  console.log("state: back architrave =", state);

  //Store - door front architrave
  const storeBackArchitraveToRootReducer = (e) => {
    const value = e.target.value;   
    dispatch(storeBackArchitrave(value));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
      Back Architrave
      </label>

      <select
      defaultValue={state.backArchitrave || ""}
        onChange={storeBackArchitraveToRootReducer}
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
        <option>Select Back Architrave</option>
        {backArchitraveData
          ?.filter(
            (item) => item.status && item.frameTypeOptionId ===
            state.frameTypeOption?._id
          )?.flatMap((item) => item.back || [])
          ?.map((item,idx) => (
            <option key={idx} value={item.value}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionBackArchitrave, (prevProps, nextProps) => {
  return (
    prevProps.frameTypeOptionData === nextProps.frameTypeOptionData &&
    prevProps.state.frameTypeOption === nextProps.state.frameTypeOption
  );
});