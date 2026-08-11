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
import OptionFrame from "./components/OptionFrame";
import AdjustWall from "./components/AdjustWall";
//Tools
import DoorCanvas from "./components/tools/DoorCanvas";

export default function Customize({ optionsData }) {
  //Reducer
  const [state, dispatch] = useReducer(rootReducer, initialState);

  //Store data
  useEffect(() => {
    storeDataToRootReducer();
  }, []);

  const storeDataToRootReducer = () => {
    dispatch(storeData(optionsData));
  };

  console.log("wow:=", optionsData);
  return (
    <main className="h-screen w-full overflow-hidden bg-[#f3f4f6] text-[#202522]">
      {/* =========================================================
        MAIN 2-COLUMN LAYOUT
    ========================================================= */}
      <div className="grid h-full w-full grid-cols-[28%_70%]">
        {/* =======================================================
          LEFT SIDE - CUSTOMIZE OPTIONS
      ======================================================= */}
        <aside className="relative flex h-full min-h-0 flex-col bg-amber-50">
          {/* ================= HEADER ================= */}
          <header className="shrink-0 px-8 pb-4 pt-18">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[25px] font-semibold tracking-[-0.4px]">
                  Customize Options
                </h1>
              </div>

              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full text-gray-600 transition hover:bg-white/40"
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

          {/* ===================================================
            SCROLLABLE CUSTOMIZE OPTIONS
        =================================================== */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-2">
            {/* =================================================
              DOOR OPTIONS
          ================================================= */}
            <details
              open
              className="group overflow-hidden rounded-2xl bg-white shadow-[0_5px_20px_rgba(0,0,0,0.08)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4">
                <div>
                  <h2 className="text-[18px] font-semibold">Door Options</h2>

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
                {/* LOCATION */}
                <OptionLocation
                  locationData={optionsData?.location}
                  state={state}
                  dispatch={dispatch}
                />

                {/* ================= DESIGNS ================= */}

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
                    {/* DESIGN */}
                    <OptionDesign
                      designData={optionsData?.design}
                      state={state}
                      dispatch={dispatch}
                    />

                    {/* SUB DESIGN */}
                    <OptionSubDesign
                      subDesignData={optionsData?.subDesign}
                      state={state}
                      dispatch={dispatch}
                    />

                    {/* MODEL */}
                    <OptionModel
                      modelData={optionsData?.models}
                      state={state}
                      dispatch={dispatch}
                    />

                    {/* SHADE */}
                    <OptionShade
                      shadeData={optionsData?.shades}
                      state={state}
                      dispatch={dispatch}
                    />
                  </div>
                </details>

                {/* ================= FRAMES ================= */}

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
                    {/* FRAME */}
                    <OptionFrame
                      frameData={optionsData?.frames}
                      state={state}
                      dispatch={dispatch}
                    />

                    {/* ADJUST WALL */}
                    <AdjustWall wallData={state?.wall}
                      dispatch={dispatch} />
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

                {/* ================= THRESHOLD ================= */}

                <details className="group/item mt-2 overflow-hidden rounded-xl bg-white shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                    <span className="text-[16px] font-medium">Threshold</span>

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

                {/* ================= ORIENTATION ================= */}

                <details className="group/item mt-2 overflow-hidden rounded-xl bg-white shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                    <span className="text-[16px] font-medium">Orientation</span>

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

            {/* =================================================
              JAMB OPTIONS
          ================================================= */}

            <details className="group mt-4 overflow-hidden rounded-2xl bg-white shadow-[0_5px_20px_rgba(0,0,0,0.08)]">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-5">
                <div>
                  <h2 className="text-[17px] font-semibold">Jamb Options</h2>

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

            {/* =================================================
              ARCHITRAVE OPTIONS
          ================================================= */}

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

            {/* =================================================
              THICKNESS OPTIONS
          ================================================= */}

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

            {/* Extra bottom space so content doesn't hide behind Save */}
            <div className="h-24" />
          </div>

          {/* ===================================================
            SAVE BUTTON - LEFT SIDE ONLY
        =================================================== */}
          <div className="shrink-0 border-t border-black/5 bg-amber-50 p-3">
            <button
              type="button"
              className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[#198754] text-[16px] font-semibold text-white shadow-lg shadow-green-900/15 transition hover:bg-[#157347] active:scale-[0.99]"
            >
              Save
            </button>
          </div>
        </aside>

        {/* =======================================================
          RIGHT SIDE - ONLY DOOR CANVAS
      ======================================================= */}
        <section className="relative min-w-0 min-h-0 bg-gray-100">
          <div className="absolute inset-0">
            <DoorCanvas state={state} dispatch={dispatch} />
          </div>
        </section>
      </div>
    </main>
  );
}
