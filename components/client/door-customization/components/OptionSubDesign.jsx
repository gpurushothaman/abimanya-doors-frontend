"use client";
import React, { memo } from "react";
//Reducer
import { storeSubDesign } from "../components/state-handling/root";

function OptionSubDesign({ subDesignData, state, dispatch }) {
  console.log("state:subdesign=", state);
  //Store - door sub design
  const storeSubDesignToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = subDesignData.find(
      (item) => item.subDesignValue === value
    );

    dispatch(storeSubDesign(selectedItem));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Sub Design
      </label>

      <select
        onChange={storeSubDesignToRootReducer}
        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60"
      >
        <option>Select sub design</option>
        {subDesignData
          ?.filter((item) => item.status && item.designId == state.design?._id)
          ?.map((item) => (
            <option key={item._id} value={item.subDesignValue}>
              {item.subDesignName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionSubDesign, (prevProps, nextProps) => {
  return (
    prevProps.designData === nextProps.designData &&
    prevProps.state.design === nextProps.state.design
  );
});
