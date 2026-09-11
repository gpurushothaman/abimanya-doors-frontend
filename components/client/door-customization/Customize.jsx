"use client";

import {
  useReducer,
  useEffect,
  useMemo,
  useState,
} from "react";


/* =========================================================
   REDUCER
========================================================= */

import {
  rootReducer,
  initialState,
  storeData,
} from "./components/state-handling/root";


/* =========================================================
   UI COMPONENTS
========================================================= */

import OptionLocation from "./components/OptionLocation";
import OptionDesign from "./components/OptionDesign";
import OptionSubDesign from "./components/OptionSubDesign";
import OptionModel from "./components/OptionModel";
import OptionShade from "./components/OptionShade";

import OptionFrame from "./components/OptionFrame";
import AdjustWall from "./components/AdjustWall";

import OptionFrameType from "./components/OptionFrameType";
import OptionFrameTypeOption from "./components/OptionFrameTypeOption";
import OptionFrameSection from "./components/OptionFrameSection";

import OptionThreshold from "./components/OptionThreshold";
import OptionDoorThickness from "./components/OptionDoorThickness";

import OptionJambLocation from "./components/OptionJambLocation";
import OptionOrientation from "./components/OptionOrientation";

import OptionFrontArchitrave from "./components/OptionFrontArchitrave";
import OptionBackArchitrave from "./components/OptionBackArchitrave";


/* =========================================================
   TOOLS
========================================================= */

import DoorCanvas from "./components/tools/DoorCanvas";


/* =========================================================
   QUOTATION CALCULATIONS
========================================================= */

import {
  buildDoorShutterQuotationFromState,
} from "./components/quotation/door-shutter/doorShutterQuotation";

import {
  buildDoorFrameQuotationFromState,
} from "./components/quotation/door-frame/doorFrameQuotation";

import {
  buildArchitraveQuotationFromState,
} from "./components/quotation/architrave/architraveQuotation";


/* =========================================================
   QUOTATION MODAL
========================================================= */

import QuotationModal from "./components/quotation/QuotationModal";


/* =========================================================
   QUOTATION MOCK DATA

   IMPORTANT:
   We intentionally use namespace import.

   This avoids the previous error:
   "quotationMockData is not exported"

   No named export is assumed here.
========================================================= */

import * as quotationMockDataModule from "./components/quotation/quotationMockData";


/* =========================================================
   RESOLVE QUOTATION MOCK DATA
========================================================= */

function resolveQuotationMockData(module) {
  if (!module) {
    return null;
  }


  /* -------------------------------------------------------
     Default export
  ------------------------------------------------------- */

  if (
    module.default &&
    typeof module.default === "object"
  ) {
    return module.default;
  }


  /* -------------------------------------------------------
     Common export names
  ------------------------------------------------------- */

  if (
    module.quotationMockData &&
    typeof module.quotationMockData === "object"
  ) {
    return module.quotationMockData;
  }


  if (
    module.QUOTE_MOCK_DATA &&
    typeof module.QUOTE_MOCK_DATA === "object"
  ) {
    return module.QUOTE_MOCK_DATA;
  }


  /* -------------------------------------------------------
     Fallback:
     find first object export that looks like quotation
  ------------------------------------------------------- */

  const possibleValues =
    Object.values(module);


  const quotationObject =
    possibleValues.find(
      (value) => {
        if (
          !value ||
          typeof value !== "object" ||
          Array.isArray(value)
        ) {
          return false;
        }


        return Boolean(
          value.customer ||
          value.items ||
          value.configuration ||
          value.commercial ||
          value.quoteNumber
        );
      }
    );


  return quotationObject || null;
}


const quotationMockData =
  resolveQuotationMockData(
    quotationMockDataModule
  );


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Customize({
  optionsData,
}) {
  /* =======================================================
     REDUCER
  ======================================================== */

  const [
    state,
    dispatch,
  ] = useReducer(
    rootReducer,
    initialState
  );


  /* =======================================================
     SIDEBAR
  ======================================================== */

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(false);


  /* =======================================================
     QUOTATION MODAL
  ======================================================== */

  const [
    isQuotationOpen,
    setIsQuotationOpen,
  ] = useState(false);


  /* =======================================================
     SAVED QUOTATIONS
  ======================================================== */

  const [
    savedDoorShutterQuotation,
    setSavedDoorShutterQuotation,
  ] = useState(null);


  const [
    savedDoorFrameQuotation,
    setSavedDoorFrameQuotation,
  ] = useState(null);


  const [
    savedArchitraveQuotation,
    setSavedArchitraveQuotation,
  ] = useState(null);


  /* =======================================================
     STORE OPTIONS DATA
  ======================================================== */

  useEffect(() => {
    if (optionsData) {
      dispatch(
        storeData(
          optionsData
        )
      );
    }
  }, [optionsData]);


  console.log(
    "wow:=",
    optionsData
  );


  /* =======================================================
     DOOR SHUTTER QUOTATION
  ======================================================== */

  const doorShutterQuotation =
    useMemo(() => {
      try {
        return buildDoorShutterQuotationFromState(
          state,
          {
            quantity: 1,
          }
        );
      } catch (error) {
        console.error(
          "DOOR SHUTTER QUOTATION ERROR:",
          error
        );

        return null;
      }
    }, [state]);


  /* =======================================================
     DOOR FRAME QUOTATION
  ======================================================== */

  const doorFrameQuotation =
    useMemo(() => {
      try {
        return buildDoorFrameQuotationFromState(
          state,
          {
            quantity: 1,
          }
        );
      } catch (error) {
        console.error(
          "DOOR FRAME QUOTATION ERROR:",
          error
        );

        return null;
      }
    }, [state]);


  /* =======================================================
     ARCHITRAVE QUOTATION
  ======================================================== */

  const architraveQuotation =
    useMemo(() => {
      try {
        return buildArchitraveQuotationFromState(
          state
        );
      } catch (error) {
        console.error(
          "ARCHITRAVE QUOTATION ERROR:",
          error
        );

        return {
          front: null,
          back: null,
          hasFront: false,
          hasBack: false,
          totalAmount: 0,
          items: [],
        };
      }
    }, [state]);


  /* =======================================================
     ARCHITRAVE DEBUG
  ======================================================== */

  console.log(
    "ARCHITRAVE QUOTATION FROM CUSTOMIZE:",
    architraveQuotation
  );


  console.log(
    "SAVED ARCHITRAVE:",
    savedArchitraveQuotation
  );


  console.log(
    "FRONT ITEM:",
    architraveQuotation
      ?.front
      ?.quotationItem
  );


  console.log(
    "BACK ITEM:",
    architraveQuotation
      ?.back
      ?.quotationItem
  );


  /* =======================================================
     OPEN QUOTATION
  ======================================================== */

  const handleOpenQuotation = () => {

    if (!quotationMockData) {
      console.error(
        "Quotation mock data was not found."
      );

      return;
    }


    /* -----------------------------------------------------
       Save current quotation snapshot
    ----------------------------------------------------- */

    setSavedDoorShutterQuotation(
      doorShutterQuotation
    );


    setSavedDoorFrameQuotation(
      doorFrameQuotation
    );


    setSavedArchitraveQuotation(
      architraveQuotation
    );


    /* -----------------------------------------------------
       Close sidebar
    ----------------------------------------------------- */

    setIsSidebarOpen(false);


    /* -----------------------------------------------------
       Open quotation
    ----------------------------------------------------- */

    setIsQuotationOpen(true);
  };


  /* =======================================================
     CLOSE QUOTATION
  ======================================================== */

  const handleCloseQuotation = () => {
    setIsQuotationOpen(false);
  };


  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#f3f4f6] text-[#202522]">


      {/* =====================================================
          FULL SCREEN DOOR CANVAS
      ====================================================== */}

      <section className="absolute inset-0 z-0 min-h-0 min-w-0 overflow-hidden">

        <DoorCanvas
          state={state}
          dispatch={dispatch}
        />

      </section>


      {/* =====================================================
          LEFT TOP BUTTON

          Only visible when sidebar closed
      ====================================================== */}

      {!isSidebarOpen && (

        <button
          type="button"
          onClick={() =>
            setIsSidebarOpen(true)
          }
          aria-label="Open customize options"
          className="
            fixed
            left-9
            top-18
            z-50
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-[#a8df63]
            text-white
            shadow-[0_5px_15px_rgba(90,160,30,0.25)]
            transition-all
            duration-200
            hover:scale-105
            hover:bg-[#48ad15]
            active:scale-95
          "
        >

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              d="M4 7h16"
            />

            <path
              strokeLinecap="round"
              d="M4 12h16"
            />

            <path
              strokeLinecap="round"
              d="M4 17h16"
            />

          </svg>

        </button>
      )}


      {/* =====================================================
          CUSTOMIZE SIDEBAR
      ====================================================== */}

      {isSidebarOpen && (

        <aside
          className="
            absolute
            left-0
            top-0
            z-40
            flex
            h-full
            w-[28%]
            min-h-0
            flex-col
            bg-amber-50
            shadow-[8px_0_30px_rgba(0,0,0,0.12)]
          "
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <header
            className="
              shrink-0
              px-8
              pb-4
              pt-18
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <h1 className="text-[25px] font-semibold tracking-[-0.4px]">
                  Customize Options
                </h1>

              </div>


              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setIsSidebarOpen(false)
                }
                aria-label="Close customize options"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  text-gray-600
                  transition
                  hover:bg-white/50
                  hover:text-gray-900
                "
              >

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-6 w-6"
                >

                  <path
                    strokeLinecap="round"
                    d="M6 6l12 12"
                  />

                  <path
                    strokeLinecap="round"
                    d="M18 6L6 18"
                  />

                </svg>

              </button>

            </div>

          </header>


          {/* =================================================
              SCROLLABLE OPTIONS
          ================================================== */}

          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              px-5
              pb-2
            "
          >

            {/* =================================================
                DOOR OPTIONS
            ================================================== */}

            <details
              open
              className="
                group
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-[0_5px_20px_rgba(0,0,0,0.08)]
              "
            >

              <summary
                className="
                  flex
                  cursor-pointer
                  list-none
                  items-center
                  justify-between
                  px-4
                  py-4
                "
              >

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
                  className="
                    h-6
                    w-6
                    text-gray-600
                    transition-transform
                    group-open:rotate-180
                  "
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6-6"
                  />

                </svg>

              </summary>


              <div
                className="
                  bg-[#fafafa]
                  px-3
                  pb-3
                "
              >

                {/* LOCATION */}

                <OptionLocation
                  locationData={
                    optionsData?.location
                  }
                  state={state}
                  dispatch={dispatch}
                />


                {/* DESIGNS */}

                <details
                  className="
                    group/item
                    mt-2
                    overflow-hidden
                    rounded-xl
                    bg-white
                    shadow-sm
                  "
                >

                  <summary
                    className="
                      flex
                      cursor-pointer
                      list-none
                      items-center
                      justify-between
                      px-5
                      py-4
                    "
                  >

                    <span className="text-[16px] font-medium">
                      Designs
                    </span>


                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="
                        h-5
                        w-5
                        text-gray-500
                        transition-transform
                        group-open/item:rotate-180
                      "
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />

                    </svg>

                  </summary>


                  <div
                    className="
                      space-y-4
                      border-t
                      border-gray-100
                      px-5
                      pb-5
                      pt-4
                    "
                  >

                    <OptionDesign
                      designData={
                        optionsData?.design
                      }
                      state={state}
                      dispatch={dispatch}
                    />


                    <OptionSubDesign
                      subDesignData={
                        optionsData?.subDesign
                      }
                      state={state}
                      dispatch={dispatch}
                    />


                    <OptionModel
                      modelData={
                        optionsData?.models
                      }
                      state={state}
                      dispatch={dispatch}
                    />


                    <OptionShade
                      shadeData={
                        optionsData?.shades
                      }
                      state={state}
                      dispatch={dispatch}
                    />

                  </div>

                </details>


                {/* FRAMES */}

                <details
                  className="
                    group/item
                    mt-2
                    overflow-hidden
                    rounded-xl
                    bg-white
                    shadow-sm
                  "
                >

                  <summary
                    className="
                      flex
                      cursor-pointer
                      list-none
                      items-center
                      justify-between
                      px-5
                      py-4
                    "
                  >

                    <span className="text-[16px] font-medium">
                      Frames
                    </span>


                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="
                        h-5
                        w-5
                        text-gray-500
                        transition-transform
                        group-open/item:rotate-180
                      "
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />

                    </svg>

                  </summary>


                  <div
                    className="
                      space-y-5
                      border-t
                      border-gray-100
                      px-5
                      pb-5
                      pt-4
                    "
                  >

                    <OptionFrame
                      frameData={
                        optionsData?.frames
                      }
                      state={state}
                      dispatch={dispatch}
                    />


                    <AdjustWall
                      wallData={
                        state?.wall
                      }
                      dispatch={dispatch}
                    />


                    <OptionFrameType
                      frameTypeData={
                        optionsData?.frameTypes
                      }
                      state={state}
                      dispatch={dispatch}
                    />


                    <OptionFrameTypeOption
                      frameTypeOptionData={
                        optionsData?.frameTypeOptions
                      }
                      state={state}
                      dispatch={dispatch}
                    />


                    <OptionFrameSection
                      frameSectionData={
                        optionsData?.frameSections
                      }
                      state={state}
                      dispatch={dispatch}
                    />

                  </div>

                </details>


                {/* THRESHOLD */}

                <details
                  className="
                    group/item
                    mt-2
                    overflow-hidden
                    rounded-xl
                    bg-white
                    shadow-sm
                  "
                >

                  <summary
                    className="
                      flex
                      cursor-pointer
                      list-none
                      items-center
                      justify-between
                      px-5
                      py-4
                    "
                  >

                    <span className="text-[16px] font-medium">
                      Threshold
                    </span>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="
                        h-5
                        w-5
                        text-gray-500
                        transition-transform
                        group-open/item:rotate-180
                      "
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />

                    </svg>

                  </summary>


                  <OptionThreshold
                    thresholdData={
                      optionsData?.doorThresholds
                    }
                    state={state}
                    dispatch={dispatch}
                  />

                </details>


                {/* ORIENTATION */}

                <details
                  className="
                    group/item
                    mt-2
                    overflow-hidden
                    rounded-xl
                    bg-white
                    shadow-sm
                  "
                >

                  <summary
                    className="
                      flex
                      cursor-pointer
                      list-none
                      items-center
                      justify-between
                      px-5
                      py-4
                    "
                  >

                    <span className="text-[16px] font-medium">
                      Orientation
                    </span>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="
                        h-5
                        w-5
                        text-gray-500
                        transition-transform
                        group-open/item:rotate-180
                      "
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />

                    </svg>

                  </summary>


                  <OptionOrientation
                    orientationData={
                      optionsData?.doorOrientationDatas
                    }
                    state={state}
                    dispatch={dispatch}
                  />

                </details>

              </div>

            </details>


            {/* =================================================
                JAMB OPTIONS
            ================================================== */}

            <details
              className="
                group
                mt-4
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-[0_5px_20px_rgba(0,0,0,0.08)]
              "
            >

              <summary
                className="
                  flex
                  cursor-pointer
                  list-none
                  items-center
                  justify-between
                  px-5
                  py-5
                "
              >

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
                  className="
                    h-6
                    w-6
                    text-gray-500
                    transition-transform
                    group-open:rotate-180
                  "
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />

                </svg>

              </summary>


              <OptionJambLocation
                locationData={
                  optionsData?.doorJambLocationDatas
                }
                state={state}
                dispatch={dispatch}
              />

            </details>


            {/* =================================================
                ARCHITRAVE OPTIONS
            ================================================== */}

            <details
              className="
                group
                mt-4
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-[0_5px_20px_rgba(0,0,0,0.08)]
              "
            >

              <summary
                className="
                  flex
                  cursor-pointer
                  list-none
                  items-center
                  justify-between
                  px-5
                  py-5
                "
              >

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
                  className="
                    h-6
                    w-6
                    text-gray-500
                    transition-transform
                    group-open:rotate-180
                  "
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />

                </svg>

              </summary>


              <div
                className="
                  space-y-4
                  border-t
                  border-gray-100
                  p-5
                "
              >

                <OptionFrontArchitrave
                  frontArchitraveData={
                    optionsData?.doorArchitraveDatas
                  }
                  state={state}
                  dispatch={dispatch}
                />


                <OptionBackArchitrave
                  frontArchitraveData={
                    optionsData?.doorArchitraveDatas
                  }
                  state={state}
                  dispatch={dispatch}
                />

              </div>

            </details>


            {/* =================================================
                THICKNESS OPTIONS
            ================================================== */}

            <details
              className="
                group
                mt-4
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-[0_5px_20px_rgba(0,0,0,0.08)]
              "
            >

              <summary
                className="
                  flex
                  cursor-pointer
                  list-none
                  items-center
                  justify-between
                  px-5
                  py-5
                "
              >

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
                  className="
                    h-6
                    w-6
                    text-gray-500
                    transition-transform
                    group-open:rotate-180
                  "
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />

                </svg>

              </summary>


              <div
                className="
                  space-y-4
                  border-t
                  border-gray-100
                  p-5
                "
              >

                <OptionDoorThickness
                  doorThicknessData={
                    optionsData?.doorThicknessDatas
                  }
                  state={state}
                  dispatch={dispatch}
                />

              </div>

            </details>


            <div className="h-24" />

          </div>


          {/* =================================================
              SAVE / QUOTATION BUTTON
          ================================================== */}

          <div
            className="
              shrink-0
              border-t
              border-black/5
              bg-amber-50
              p-3
            "
          >

            <button
              type="button"
              onClick={
                handleOpenQuotation
              }
              className="
                flex
                h-[52px]
                w-full
                items-center
                justify-center
                rounded-xl
                bg-[#48ad15]
                text-[16px]
                font-semibold
                text-white
                shadow-lg
                shadow-green-900/15
                transition
                hover:bg-[#157347]
                active:scale-[0.99]
              "
            >
              Save
            </button>

          </div>

        </aside>

      )}


      {/* =====================================================
          QUOTATION MODAL
      ====================================================== */}

      {isQuotationOpen && quotationMockData && (

        <QuotationModal

          quotation={
            quotationMockData
          }


          doorShutterQuotation={
            savedDoorShutterQuotation
          }


          doorFrameQuotation={
            savedDoorFrameQuotation
          }


          architraveQuotation={
            savedArchitraveQuotation
          }


          onClose={
            handleCloseQuotation
          }

        />

      )}

    </main>
  );
}