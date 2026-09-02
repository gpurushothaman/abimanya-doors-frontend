"use client";
import React, { memo } from "react";
//Reducer
import { storeFrontArchitrave } from "../components/state-handling/root";

function OptionFrontArchitrave({ frontArchitraveData, state, dispatch }) {
  console.log("state: front architrave =", state);

  //Store - door front architrave
  const storeFrontArchitraveToRootReducer = (e) => {
    const value = e.target.value;   
    dispatch(storeFrontArchitrave(value));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
      Front Architrave
      </label>

      <select
        onChange={storeFrontArchitraveToRootReducer}
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
        <option>Select Front Architrave</option>
        {frontArchitraveData
          ?.filter(
            (item) => item.status && item.frameTypeOptionId ===
            state.frameTypeOption?._id
          )?.flatMap((item) => item.front || [])
          ?.map((item,idx) => (
            <option key={idx} value={item.value}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionFrontArchitrave, (prevProps, nextProps) => {
  return (
    prevProps.frameTypeOptionData === nextProps.frameTypeOptionData &&
    prevProps.state.frameTypeOption === nextProps.state.frameTypeOption
  );
});