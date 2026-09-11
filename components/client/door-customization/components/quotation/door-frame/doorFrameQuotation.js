// components/client/door-customization/components/quotation/door-frame/doorFrameQuotation.js

import { calculateDoorFrame } from "./doorFrameFormula";

import {
  getDoorFrameRateFromState,
} from "./doorFramePricing";


/* =========================================================
   NUMBER HELPER
========================================================= */

function toNumber(value, fallback = 0) {
  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value
      : fallback;
  }

  const cleaned = String(value ?? "")
    .replace(/,/g, "")
    .replace(/₹/g, "")
    .trim();

  if (!cleaned) {
    return fallback;
  }

  const number = Number(cleaned);

  return Number.isFinite(number)
    ? number
    : fallback;
}


/* =========================================================
   MONEY FORMAT
========================================================= */

function formatMoney(value) {
  return toNumber(value).toFixed(3);
}


/* =========================================================
   BUILD DOOR FRAME QUOTATION
========================================================= */

export function buildDoorFrameQuotationFromState(
  state,
  options = {}
) {
  /* =======================================================
     QUANTITY
  ======================================================= */

  const quantity = Math.max(
    1,
    toNumber(options?.quantity, 1)
  );


  /* =======================================================
     SELECTED FRAME
  ======================================================= */

  const frame =
    state?.frame ?? null;


  /* =======================================================
     SELECTED FRAME TYPE
  ======================================================= */

  const frameType =
    state?.frameType ?? null;


  /* =======================================================
     SELECTED FRAME TYPE OPTION
  ======================================================= */

  const frameTypeOption =
    state?.frameTypeOption ?? null;


  /* =======================================================
     SELECTED FRAME SECTION
  ======================================================= */

  const frameSection =
    state?.frameSection ?? null;


  /* =======================================================
     WALL
  ======================================================= */

  const wallHeight =
    state?.wall?.height ?? 0;

  const wallWidth =
    state?.wall?.width ?? 0;


  /* =======================================================
     THRESHOLD

     Actual state is:

     {
       thresholdName: "Yes",
       thresholdValue: "Yes"
     }

     Formula expects:
     "Yes" / "No"
  ======================================================= */

  const threshold =
    state?.threshold?.thresholdValue ??
    state?.threshold?.thresholdName ??
    state?.threshold ??
    "";


  /* =======================================================
     DEBUG STATE
  ======================================================= */

  console.log(
    "DOOR FRAME STATE FROM QUOTATION"
  );

  console.log(
    "state.frame:",
    frame
  );

  console.log(
    "state.frameType:",
    frameType
  );

  console.log(
    "state.frameTypeOption:",
    frameTypeOption
  );

  console.log(
    "state.frameSection:",
    frameSection
  );

  console.log(
    "state.wall:",
    state?.wall
  );

  console.log(
    "state.threshold:",
    state?.threshold
  );

  console.log(
    "normalized threshold:",
    threshold
  );


  /* =======================================================
     CALCULATE FRAME LENGTH
  ======================================================= */

  const calculation =
    calculateDoorFrame({
      wallHeight,
      wallWidth,
      threshold,
    });


  /* =======================================================
     GET FRAME PRICING
  ======================================================= */

  const pricing =
    getDoorFrameRateFromState(
      state
    );


  /* =======================================================
     ROUND RFT

     6000 / 304.8
     = 19.685039...

     Display:
     19.685
  ======================================================= */

  const roundedRFT =
    Number(
      toNumber(
        calculation?.totalRFT
      ).toFixed(3)
    );


  /* =======================================================
     RATE
  ======================================================= */

  const rate =
    toNumber(
      pricing?.rate
    );


  /* =======================================================
     AMOUNT

     19.685 × 773
     = 15216.505
  ======================================================= */

  const unitAmount =
    roundedRFT * rate;


  const totalAmount =
    unitAmount * quantity;


  /* =======================================================
     PRICE CONFIGURED
  ======================================================= */

  const priceConfigured =
    pricing?.priceConfigured === true;


  /* =======================================================
     FINAL DEBUG
  ======================================================= */

  console.log(
    "DOOR FRAME FINAL CALCULATION"
  );

  console.log(
    "Material:",
    pricing?.material
  );

  console.log(
    "Section:",
    pricing?.section
  );

  console.log(
    "Rate:",
    rate
  );

  console.log(
    "Price Configured:",
    priceConfigured
  );

  console.log(
    "Formula:",
    calculation?.formula
  );

  console.log(
    "Total MM:",
    calculation?.totalMM
  );

  console.log(
    "RFT:",
    roundedRFT
  );

  console.log(
    "Amount:",
    totalAmount
  );


  /* =======================================================
     CONFIGURATION

     IMPORTANT:
     QuotationModal expects:

     doorFrameQuotation.configuration
  ======================================================= */

  const configuration = {

    /* -------------------------------------------------------
       FRAME
    ------------------------------------------------------- */

    frameName:
      frame?.frameName || "",

    frameValue:
      frame?.frameValue || "",


    /* -------------------------------------------------------
       FRAME TYPE
    ------------------------------------------------------- */

    frameTypeName:
      frameType?.frameTypeName || "",

    frameTypeValue:
      frameType?.frameTypeValue || "",


    /* -------------------------------------------------------
       FRAME TYPE OPTION
    ------------------------------------------------------- */

    frameTypeOptionName:
      frameTypeOption?.frameTypeOptionName || "",

    frameTypeOptionValue:
      frameTypeOption?.frameTypeOptionValue || "",


    /* -------------------------------------------------------
       FRAME SECTION
    ------------------------------------------------------- */

    frameSectionName:
      frameSection?.frameSectionName || "",

    frameSectionValue:
      frameSection?.frameSectionValue || "",


    /* -------------------------------------------------------
       FINAL BUSINESS MATERIAL

       Solid Wood + African Teak
       =>
       Solid African Teak
    ------------------------------------------------------- */

    frameMaterial:
      pricing?.material || "",


    /* -------------------------------------------------------
       FINAL BUSINESS SECTION
    ------------------------------------------------------- */

    frameSectionSize:
      pricing?.section || "",


    /* -------------------------------------------------------
       WALL
    ------------------------------------------------------- */

    wallHeight:
      calculation?.wallHeight || 0,

    wallWidth:
      calculation?.wallWidth || 0,


    /* -------------------------------------------------------
       THRESHOLD
    ------------------------------------------------------- */

    threshold:
      threshold || "",


    /* -------------------------------------------------------
       QUANTITY
    ------------------------------------------------------- */

    quantity,
  };


  /* =======================================================
     QUOTATION ITEM

     IMPORTANT:

     OLD UI:
       description = Wooden Frame

     SFT/RFT column:
       19.68504 RFT

     Badge:
       ₹ 773.000/RFT

     Amount:
       ₹ 15,216.505
  ======================================================= */

  const quotationItem = {

    itemName:
      "Wooden Frame",

    /*
    IMPORTANT:
    Do NOT put material + section here.
    */

    description:
      "Wooden Frame",

    /*
    IMPORTANT:
    Store actual calculated RFT here.
    */

    quantity:
      roundedRFT,

    unit:
      "RFT",

    rate,

    rft:
      roundedRFT,

    amount:
      totalAmount,

    priceConfigured,

    badge:
      priceConfigured
        ? `₹ ${formatMoney(rate)}/RFT`
        : "Price Not Configured",
  };


  /* =======================================================
     RETURN FINAL QUOTATION OBJECT
  ======================================================= */

  return {

    /* -------------------------------------------------------
       BASIC
    ------------------------------------------------------- */

    type:
      "door-frame",

    name:
      "Wooden Frame",

    quantity,


    /* -------------------------------------------------------
       AMOUNT
    ------------------------------------------------------- */

    amount:
      totalAmount,

    unitAmount:
      unitAmount,

    unitRate:
      rate,

    rate,


    /* -------------------------------------------------------
       RFT
    ------------------------------------------------------- */

    rft:
      roundedRFT,

    totalRFT:
      roundedRFT,


    /* -------------------------------------------------------
       MATERIAL
    ------------------------------------------------------- */

    material:
      pricing?.material || "",

    section:
      pricing?.section || "",


    /* -------------------------------------------------------
       CONFIGURATION
    ------------------------------------------------------- */

    configuration,


    /* -------------------------------------------------------
       CALCULATION
    ------------------------------------------------------- */

    calculation: {

      formula:
        calculation?.formula || "",

      totalMM:
        calculation?.totalMM || 0,

      totalRFT:
        roundedRFT,

      wallHeight:
        calculation?.wallHeight || 0,

      wallWidth:
        calculation?.wallWidth || 0,

      threshold:
        threshold || "",

      hasThreshold:
        calculation?.hasThreshold ?? false,

      mmPerFoot:
        calculation?.mmPerFoot || 304.8,
    },


    /* -------------------------------------------------------
       PRICING
    ------------------------------------------------------- */

    pricing: {

      material:
        pricing?.material || "",

      materialKey:
        pricing?.materialKey || "",

      section:
        pricing?.section || "",

      rate,

      unit:
        "RFT",

      priceConfigured,
    },


    /* -------------------------------------------------------
       IMPORTANT:
       QuotationModal uses quotationItem
    ------------------------------------------------------- */

    quotationItem,


    /* -------------------------------------------------------
       BACKWARD COMPATIBILITY
    ------------------------------------------------------- */

    item:
      quotationItem,


    /* -------------------------------------------------------
       DISPLAY
    ------------------------------------------------------- */

    display: {

      material:
        pricing?.material || "-",

      section:
        pricing?.section || "-",

      rft:
        roundedRFT.toFixed(3),

      rate:
        rate.toFixed(3),

      amount:
        formatMoney(totalAmount),

      priceConfigured,
    },
  };
}