"use client";
import { useReducer, useEffect } from "react";

//Reducer
import {
  rootReducer,
  initialState,
  storeData,
} from "./components/state-handling/root";

//Components
//UI
import OptionLocation from "./components/OptionLocation";
import OptionDesign from "./components/OptionDesign";
import OptionSubDesign from "./components/OptionSubDesign";
import OptionModel from "./components/OptionModel";
import OptionShade from "./components/OptionShade";
//Tools
import DoorCanvas from "./components/tools/DoorCanvas";


export default function Customize({ optionsData }) {

  //Reducer
  const [state, dispatch] = useReducer(
    rootReducer,
    initialState
  );

  //Store data
  useEffect(()=>{
    storeDataToRootReducer();
  },[]);

  const storeDataToRootReducer = () => {
    dispatch(
      storeData(
        optionsData
      )
    );
  };

  console.log("wow:=", optionsData);
  return (
    <main className="min-h-screen bg-[#aaf485] text-[#202522]">
      <div className="flex min-h-screen w-full">
        {/* ================= LEFT OPTIONS PANEL ================= */}
        <div className="w-[500px] flex-shrink-0 bg-amber-50">
          <div className="mx-auto flex min-h-screen w-full flex-col">
            <div className="mx-auto flex min-h-screen w-full max-w-[500px] flex-col bg-amber-50">
              {/* ================= HEADER ================= */}

              <header className="px-5 pb-5 pt-28">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-[26px] font-semibold tracking-[-0.5px]">
                      Customize Options
                    </h1>
                  </div>

                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-white/40"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-6 w-6"
                    >
                      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
              </header>

              {/* ================= CONTENT ================= */}

              <div className="flex-1 overflow-y-auto px-4 pb-28">
                {/* =====================================================
              DOOR OPTIONS
          ===================================================== */}

                <details
                  open
                  className="group overflow-hidden rounded-2xl bg-white shadow-[0_5px_20px_rgba(0,0,0,0.08)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-5">
                    <div>
                      <h2 className="text-[18px] font-semibold">
                        Door Options
                      </h2>

                      <p className="mt-1 text-[12px] text-gray-500">
                        Design and configure your door
                      </p>
                    </div>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6 text-gray-600 transition-transform duration-200 group-open:rotate-180"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />
                    </svg>
                  </summary>

                  {/* ================= DOOR SUB OPTIONS ================= */}

                  <div className="bg-[#fafafa] px-3 pb-3">
                    {/* LOCATIONS */}

                    <OptionLocation locationData={optionsData?.location} state={state} dispatch={dispatch}/>

                    {/* DESIGNS */}

                    <details className="group/item mt-2 overflow-hidden rounded-xl bg-white shadow-sm">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                        <span className="text-[16px] font-medium">Designs</span>

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-5 w-5 text-gray-500 transition-transform group-open/item:rotate-180"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9l6 6 6-6"
                          />
                        </svg>
                      </summary>

                      <div className="space-y-4 border-t border-gray-100 px-5 pb-5 pt-4">
                        <OptionDesign designData={optionsData?.design} state={state} dispatch={dispatch} />

                        <OptionSubDesign subDesignData={optionsData?.subDesign} state={state} dispatch={dispatch} />

                        <OptionModel modelData={optionsData?.models} state={state} dispatch={dispatch} />  

                        <OptionShade shadeData={optionsData?.shades} state={state} dispatch={dispatch} />                  

                     
                      </div>
                    </details>

                    {/* FRAMES */}

                    <details className="group/item mt-2 overflow-hidden rounded-xl bg-white shadow-sm">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                        <span className="text-[16px] font-medium">Frames</span>

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-5 w-5 text-gray-500 transition-transform group-open/item:rotate-180"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9l6 6 6-6"
                          />
                        </svg>
                      </summary>

                      <div className="space-y-5 border-t border-gray-100 px-5 pb-5 pt-4">
                        <div>
                          <label className="mb-2 block text-[12px] font-medium text-gray-500">
                            Frame
                          </label>

                          <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60">
                            <option>Select Frame</option>
                            <option>No</option>
                            <option>Half</option>
                            <option>Full</option>
                          </select>
                        </div>

                        {/* WALL DIMENSIONS */}

                        <div className="rounded-xl bg-[#f6f8f5] p-4">
                          <p className="text-[14px] font-semibold">
                            Wall Dimensions
                          </p>

                          <p className="mt-1 text-[12px] text-gray-500">
                            Adjust the wall size for your door
                          </p>

                          {/* HEIGHT */}

                          <div className="mt-5">
                            <div className="mb-2 flex items-center justify-between">
                              <label className="text-[13px] font-medium">
                                Height
                              </label>

                              <span className="text-[12px] font-semibold text-[#198754]">
                                1800 mm
                              </span>
                            </div>

                            <input
                              type="range"
                              min="1800"
                              max="2400"
                              defaultValue="1800"
                              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#198754]"
                            />

                            <p className="mt-2 text-[11px] text-gray-400">
                              1800 – 2400 mm
                            </p>
                          </div>

                          {/* WIDTH */}

                          <div className="mt-5">
                            <div className="mb-2 flex items-center justify-between">
                              <label className="text-[13px] font-medium">
                                Width
                              </label>

                              <span className="text-[12px] font-semibold text-[#198754]">
                                600 mm
                              </span>
                            </div>

                            <input
                              type="range"
                              min="600"
                              max="1200"
                              defaultValue="600"
                              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#198754]"
                            />

                            <p className="mt-2 text-[11px] text-gray-400">
                              600 – 1200 mm
                            </p>
                          </div>

                          {/* THICKNESS */}

                          <div className="mt-5">
                            <div className="mb-2 flex items-center justify-between">
                              <label className="text-[13px] font-medium">
                                Wall Thickness
                              </label>

                              <span className="text-[12px] font-semibold text-[#198754]">
                                140 mm
                              </span>
                            </div>

                            <input
                              type="range"
                              min="140"
                              max="260"
                              defaultValue="140"
                              className="h-1.5 w-full cursor-pointer rounded-lg bg-gray-200 accent-[#198754]"
                            />

                            <p className="mt-2 text-[11px] text-gray-400">
                              140 – 260 mm
                            </p>
                          </div>
                        </div>

                        {/* FRAME TYPE */}

                        <div>
                          <label className="mb-2 block text-[12px] font-medium text-gray-500">
                            Frame Type
                          </label>

                          <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60">
                            <option>Select Frame Type</option>
                          </select>
                        </div>

                        {/* FRAME TYPE OPTIONS */}

                        <div>
                          <label className="mb-2 block text-[12px] font-medium text-gray-500">
                            Frame Type Options
                          </label>

                          <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60">
                            <option>Select Frame Type Option</option>
                          </select>
                        </div>

                        {/* FRAME SECTION */}

                        <div>
                          <label className="mb-2 block text-[12px] font-medium text-gray-500">
                            Frame Section
                          </label>

                          <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60">
                            <option>Select Frame Section</option>
                          </select>
                        </div>
                      </div>
                    </details>

                    {/* THRESHOLD */}

                    <details className="group/item mt-2 overflow-hidden rounded-xl bg-white shadow-sm">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                        <span className="text-[16px] font-medium">
                          Threshold
                        </span>

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-5 w-5 text-gray-500 transition-transform group-open/item:rotate-180"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9l6 6 6-6"
                          />
                        </svg>
                      </summary>

                      <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                        <label className="mb-2 block text-[12px] font-medium text-gray-500">
                          Threshold
                        </label>

                        <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60">
                          <option>Select Threshold</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </details>

                    {/* ORIENTATION */}

                    <details className="group/item mt-2 overflow-hidden rounded-xl bg-white shadow-sm">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                        <span className="text-[16px] font-medium">
                          Orientation
                        </span>

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-5 w-5 text-gray-500 transition-transform group-open/item:rotate-180"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9l6 6 6-6"
                          />
                        </svg>
                      </summary>

                      <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                        <label className="mb-2 block text-[12px] font-medium text-gray-500">
                          Door Orientation
                        </label>

                        <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60">
                          <option>Select Orientation</option>
                          <option>LHS</option>
                          <option>RHS</option>
                        </select>
                      </div>
                    </details>
                  </div>
                </details>

                {/* =====================================================
              JAMB OPTIONS
          ===================================================== */}

                <details className="group mt-4 overflow-hidden rounded-2xl bg-white shadow-[0_5px_20px_rgba(0,0,0,0.08)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-5">
                    <div>
                      <h2 className="text-[17px] font-semibold">
                        Jamb Options
                      </h2>

                      <p className="mt-1 text-[12px] text-gray-500">
                        Configure jamb placement
                      </p>
                    </div>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6 text-gray-500 transition-transform group-open:rotate-180"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />
                    </svg>
                  </summary>

                  <div className="border-t border-gray-100 p-5">
                    <label className="mb-2 block text-[12px] font-medium text-gray-500">
                      Jamb Location
                    </label>

                    <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60">
                      <option>Select Location</option>
                      <option>Front</option>
                      <option>Back</option>
                    </select>
                  </div>
                </details>

                {/* =====================================================
              ARCHITRAVE OPTIONS
          ===================================================== */}

                <details className="group mt-4 overflow-hidden rounded-2xl bg-white shadow-[0_5px_20px_rgba(0,0,0,0.08)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-5">
                    <div>
                      <h2 className="text-[17px] font-semibold">
                        Architrave Options
                      </h2>

                      <p className="mt-1 text-[12px] text-gray-500">
                        Adjust front and back finish
                      </p>
                    </div>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6 text-gray-500 transition-transform group-open:rotate-180"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />
                    </svg>
                  </summary>

                  <div className="space-y-4 border-t border-gray-100 p-5">
                    <div>
                      <label className="mb-2 block text-[12px] font-medium text-gray-500">
                        Front Architrave
                      </label>

                      <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60">
                        <option>Select Front Architrave</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-[12px] font-medium text-gray-500">
                        Back Architrave
                      </label>

                      <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60">
                        <option>Select Back Architrave</option>
                      </select>
                    </div>
                  </div>
                </details>

                {/* =====================================================
              THICKNESS OPTIONS
          ===================================================== */}

                <details className="group mt-4 overflow-hidden rounded-2xl bg-white shadow-[0_5px_20px_rgba(0,0,0,0.08)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-5">
                    <div>
                      <h2 className="text-[17px] font-semibold">
                        Thickness Options
                      </h2>

                      <p className="mt-1 text-[12px] text-gray-500">
                        Choose your door thickness
                      </p>
                    </div>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6 text-gray-500 transition-transform group-open:rotate-180"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />
                    </svg>
                  </summary>

                  <div className="border-t border-gray-100 p-5">
                    <label className="mb-2 block text-[12px] font-medium text-gray-500">
                      Door Thickness
                    </label>

                    <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60">
                      <option>Select Door Thickness</option>
                      <option>32 mm</option>
                      <option>35 mm</option>
                      <option>38 mm</option>
                      <option>40 mm</option>
                      <option>45 mm</option>
                      <option>50 mm</option>
                    </select>
                  </div>
                </details>
              </div>

              {/* ================= BOTTOM BUTTON ================= */}

              <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-[500px]  p-3">
                <button
                  type="button"
                  className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[#198754] text-[16px] font-semibold text-white shadow-lg shadow-green-900/15 transition hover:bg-[#157347] active:scale-[0.99]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CANVAS AREA ================= */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <div className="h-full w-full relative">
            {/* Door Canvas */}
            <DoorCanvas />

   
          </div>
        </div>
      </div>
    </main>
  );
}
