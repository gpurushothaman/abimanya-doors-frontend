"use client";
import React, { memo } from "react";
//Reducer
import { storeDoorWithFrame } from "../components/state-handling/root";

function OptionDoorWithFrameSection({ state, dispatch }) {
  console.log("state:door with frame section=", state);
  //Store - door model
  const storeDoorWithFrameToRootReducer = (e) => {
    const value = e.target.value;
    dispatch(storeDoorWithFrame(value));
  };
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Door With Frame
      </label>

      <select    
      defaultValue={""}  
        onChange={storeDoorWithFrameToRootReducer}
        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60"
      >      
        <option value="">Select Option</option>
        <option value="edgeBanding">Edge Banding</option>
        <option value="woodLipping">Wood Lipping</option>
        <option value="none">None</option>    
      </select>
    </div>
  );
}

export default memo(OptionDoorWithFrameSection);
