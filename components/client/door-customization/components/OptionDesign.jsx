"use client";
import React, { memo } from "react";
//Reducer
import { storeDesign } from "../components/state-handling/root";

function OptionDesign({ designData, state, dispatch }) {
  console.log("state:design=", state);
  //Store - door design
  const storeDesignToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = designData.find((item) => item.designValue === value);

    dispatch(storeDesign(selectedItem));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Design
      </label>

      <select
        onChange={storeDesignToRootReducer}
        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60"
      >
        <option>Select door design</option>
        {designData
          ?.filter((item) => item.status)
          ?.map((item) => (
            <option key={item._id} value={item.designValue}>
              {item.designName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionDesign, (prevProps, nextProps) => {
  return (
    prevProps.designData === nextProps.designData &&
    prevProps.state.design === nextProps.state.design
  );
});
