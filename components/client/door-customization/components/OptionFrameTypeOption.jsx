"use client";
import React, { memo } from "react";
//Reducer
import { storeFrameTypeOption } from "../components/state-handling/root";

function OptionFrameTypeOption({ frameTypeOptionData, state, dispatch }) {
  console.log("state:frame type option=", state);
  //Store - door model
  const storeFrameTypeOptionToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = frameTypeOptionData.find((item) => item.frameTypeOptionValue === value);

    dispatch(storeFrameTypeOption(selectedItem));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Frame Type Option
      </label>

      <select
      defaultValue={state.frameTypeOption?.frameTypeOptionValue || ""}
        onChange={storeFrameTypeOptionToRootReducer}
        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60"
      >
        <option>Select Frame Type Option</option>
        {frameTypeOptionData
          ?.filter(
            (item) => item.status && item.frameTypeId == state.frameType?._id
          )
          ?.map((item) => (
            <option key={item._id} value={item.frameTypeOptionValue}>
              {item.frameTypeOptionName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionFrameTypeOption, (prevProps, nextProps) => {
  return (
    prevProps.frameTypeData === nextProps.frameTypeData &&
    prevProps.state.frameType === nextProps.state.frameType
  );
});
