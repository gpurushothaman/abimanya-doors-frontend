"use client";
import React, { memo } from "react";
//Reducer
import { storeModel } from "../components/state-handling/root";

function OptionModel({ modelData, state, dispatch }) {
  console.log("state:model=", state);
  //Store - door model
  const storeModelToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = modelData.find(
      (item) => item.modelValue === value
    );
  
    dispatch(storeModel(selectedItem));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Model
      </label>

      <select
        onChange={storeModelToRootReducer}
        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60"
      >
        <option>Select model</option>
        {modelData
          ?.filter((item) => item.status && item.subDesignId == state.subDesign?._id)
          ?.map((item) => (
            <option key={item._id} value={item.modelValue}>
              {item.modelName}
            </option>
          ))}
      </select>
    </div>
  );
}


export default memo(OptionModel, (prevProps, nextProps) => {
  return (
    prevProps.subDesignData === nextProps.subDesignData &&
    prevProps.state.subDesign === nextProps.state.subDesign
  );
});
