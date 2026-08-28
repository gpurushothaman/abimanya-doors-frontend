"use client";
import React, { memo } from "react";
//Reducer
import { storeDoorThickness } from "../components/state-handling/root";

function OptionDoorThickness({ doorThicknessData, state, dispatch }) {
  console.log("state:door thickness=", state);
  //Store - door model
  const storeDoorThicknessToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = doorThicknessData.find(
      (item) => item.DoorThicknessValue === value
    );

    dispatch(storeDoorThickness(selectedItem));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Door Thickness
      </label>

      <select
        onChange={storeDoorThicknessToRootReducer}
        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60"
      >
        <option>Select Door Thickness</option>
        {doorThicknessData
          ?.filter(
            (item) => item.status && item.frameTypeOptionId == state.frameTypeOption?._id
          )
          ?.map((item) => (
            <option key={item._id} value={item.DoorThicknessValue}>
              {item.DoorThicknessName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionDoorThickness, (prevProps, nextProps) => {
  return (
    prevProps.frameTypeOptionData === nextProps.frameTypeOptionData &&
    prevProps.state.frameTypeOption === nextProps.state.frameTypeOption
  );
});
