"use client";
import React, { memo } from "react";
//Reducer
import { storeModel } from "../components/state-handling/root";

function OptionShade({ shadeData, state, dispatch }) {
  console.log("state:shades=", shadeData);
  //Store - door model
  const storeShadeToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = shadeData.find(
      (item) => item._id === value
    );

    dispatch(storeModel(selectedItem));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Shade
      </label>

      <select
        onChange={storeShadeToRootReducer}
        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60"
      >
        <option>Select shade</option>
        {shadeData
          ?.filter((item) => item.status && item.modelId == state.model?._id)
          ?.map((item) => (
            <option key={item._id} value={item._id}>
              {item.shadeName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionShade, (prevProps, nextProps) => {
  return (
    prevProps.modelData === nextProps.modelData &&
    prevProps.state.model === nextProps.state.model
  );
});
