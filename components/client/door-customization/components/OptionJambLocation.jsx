"use client";
import React, { memo } from "react";
//Reducer
import { storeJambLocation } from "../components/state-handling/root";

function OptionJambLocation({ locationData, state, dispatch }) {
  console.log("state: jamb location =", state);
  //Store - door model
  const storeJambLocationToRootReducer = (e) => {
    const value = e.target.value;
    const selectedItem = locationData.find(
      (item) => item.jambLocationValue === value
    );

    dispatch(storeJambLocation(selectedItem));
  };
  return (
    <div className="border-t border-gray-100 p-5">
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
      Jamb Location
      </label>

      <select
        onChange={storeJambLocationToRootReducer}
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
        <option>Select Location</option>
        {locationData
          ?.filter(
            (item) => item.status && item.frameTypeOptionId == state.frameTypeOption?._id
          )
          ?.map((item) => (
            <option key={item._id} value={item.jambLocationValue}>
              {item.jambLocationName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default memo(OptionJambLocation, (prevProps, nextProps) => {
  return (
    prevProps.frameTypeOptionData === nextProps.frameTypeOptionData &&
    prevProps.state.frameTypeOption === nextProps.state.frameTypeOption
  );
});