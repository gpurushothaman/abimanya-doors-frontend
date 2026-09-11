// components/client/door-customization/components/quotation/architrave/architraveQuotation.js

import {
  calculateArchitrave,
  getArchitraveWidth,
} from "./architraveFormula";


import {
  getArchitraveRateFromState,
} from "./architravePricing";


/* =========================================================
   NUMBER HELPER
========================================================= */

function toNumber(
  value,
  fallback = 0
) {
  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value
      : fallback;
  }


  const cleaned =
    String(
      value ?? ""
    )
      .replace(/,/g, "")
      .replace(/₹/g, "")
      .trim();


  if (!cleaned) {
    return fallback;
  }


  const number =
    Number(
      cleaned
    );


  return Number.isFinite(number)
    ? number
    : fallback;
}


/* =========================================================
   MONEY FORMAT
========================================================= */

function formatMoney(
  value
) {
  return toNumber(
    value
  ).toFixed(3);
}


/* =========================================================
   RESOLVE ARCHITRAVE WIDTH
========================================================= */

/*
|--------------------------------------------------------------------------
| IMPORTANT FIX
|--------------------------------------------------------------------------
|
| Current selected value is:
|
| "S60"
|
| not:
|
| {
|   architraveName: "S60"
| }
|
| So we MUST support direct string.
|--------------------------------------------------------------------------
*/

function resolveArchitraveWidth(
  architrave
) {
  /*
  |--------------------------------------------------------------------------
  | DIRECT STRING / NUMBER
  |--------------------------------------------------------------------------
  */

  if (
    typeof architrave ===
      "string" ||
    typeof architrave ===
      "number"
  ) {
    return getArchitraveWidth(
      architrave
    );
  }


  /*
  |--------------------------------------------------------------------------
  | NULL
  |--------------------------------------------------------------------------
  */

  if (!architrave) {
    return 0;
  }


  /*
  |--------------------------------------------------------------------------
  | OBJECT
  |--------------------------------------------------------------------------
  */

  const candidates = [

    architrave?.architraveValue,

    architrave?.architraveName,

    architrave?.architraveWidth,

    architrave?.width,

    architrave?.size,

    architrave?.value,

    architrave?.name,
  ];


  for (
    const candidate of candidates
  ) {
    const width =
      getArchitraveWidth(
        candidate
      );


    if (
      [30, 40, 60].includes(
        width
      )
    ) {
      return width;
    }
  }


  return 0;
}


/* =========================================================
   ARCHITRAVE NAME
========================================================= */

function getArchitraveName(
  architrave,
  width
) {
  /*
  |--------------------------------------------------------------------------
  | STRING
  |--------------------------------------------------------------------------
  */

  if (
    typeof architrave ===
      "string" ||
    typeof architrave ===
      "number"
  ) {
    return String(
      architrave
    ).trim();
  }


  /*
  |--------------------------------------------------------------------------
  | OBJECT
  |--------------------------------------------------------------------------
  */

  if (
    architrave?.architraveName
  ) {
    return String(
      architrave.architraveName
    ).trim();
  }


  if (
    architrave?.architraveValue
  ) {
    return String(
      architrave.architraveValue
    ).trim();
  }


  if (
    architrave?.name
  ) {
    return String(
      architrave.name
    ).trim();
  }


  if (
    architrave?.value
  ) {
    return String(
      architrave.value
    ).trim();
  }


  /*
  |--------------------------------------------------------------------------
  | FALLBACK
  |--------------------------------------------------------------------------
  */

  return width
    ? `S${width}`
    : "";
}


/* =========================================================
   BUILD SINGLE ARCHITRAVE
========================================================= */

function buildSingleArchitraveQuotation({
  side,
  architrave,
  state,
}) {
  /*
  |--------------------------------------------------------------------------
  | NOT SELECTED
  |--------------------------------------------------------------------------
  */

  if (
    architrave === null ||
    architrave === undefined ||
    architrave === ""
  ) {
    return null;
  }


  /*
  |--------------------------------------------------------------------------
  | WIDTH
  |--------------------------------------------------------------------------
  */

  const width =
    resolveArchitraveWidth(
      architrave
    );


  /*
  |--------------------------------------------------------------------------
  | NAME
  |--------------------------------------------------------------------------
  */

  const architraveName =
    getArchitraveName(
      architrave,
      width
    );


  /*
  |--------------------------------------------------------------------------
  | CALCULATION
  |--------------------------------------------------------------------------
  */

  const calculation =
    calculateArchitrave({
      wallHeight:
        state?.wall?.height ??
        0,

      wallWidth:
        state?.wall?.width ??
        0,

      architraveWidth:
        width,
    });


  /*
  |--------------------------------------------------------------------------
  | PRICING
  |--------------------------------------------------------------------------
  */

  const pricing =
    getArchitraveRateFromState(
      state,
      width
    );


  /*
  |--------------------------------------------------------------------------
  | RFT
  |--------------------------------------------------------------------------
  */

  const rft =
    Number(
      toNumber(
        calculation?.totalRFT
      ).toFixed(5)
    );


  /*
  |--------------------------------------------------------------------------
  | RATE
  |--------------------------------------------------------------------------
  */

  const rate =
    toNumber(
      pricing?.rate
    );


  /*
  |--------------------------------------------------------------------------
  | AMOUNT
  |--------------------------------------------------------------------------
  */

  const amount =
    rft * rate;


  /*
  |--------------------------------------------------------------------------
  | SIDE
  |--------------------------------------------------------------------------
  */

  const isFront =
    side === "front";


  const label =
    isFront
      ? "Architrave Front"
      : "Architrave Back";


  /*
  |--------------------------------------------------------------------------
  | DESCRIPTION
  |--------------------------------------------------------------------------
  */

  const description =
    width > 0
      ? `${label} (S${width})`
      : label;


  /*
  |--------------------------------------------------------------------------
  | DEBUG
  |--------------------------------------------------------------------------
  */

  console.log(
    "ARCHITRAVE FINAL CALCULATION:",
    {
      side,

      architrave,

      architraveName,

      width,

      material:
        pricing?.material,

      rate,

      priceConfigured:
        pricing?.priceConfigured,

      formula:
        calculation?.formula,

      totalMM:
        calculation?.totalMM,

      rft,

      amount,
    }
  );


  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {

    type:
      "architrave",

    side,

    label,

    name:
      description,

    description,


    /*
    |--------------------------------------------------------------------------
    | AMOUNT
    |--------------------------------------------------------------------------
    */

    amount,


    /*
    |--------------------------------------------------------------------------
    | RATE
    |--------------------------------------------------------------------------
    */

    rate,


    /*
    |--------------------------------------------------------------------------
    | RFT
    |--------------------------------------------------------------------------
    */

    rft,


    /*
    |--------------------------------------------------------------------------
    | WIDTH
    |--------------------------------------------------------------------------
    */

    width,


    /*
    |--------------------------------------------------------------------------
    | NAME
    |--------------------------------------------------------------------------
    */

    architraveName,


    /*
    |--------------------------------------------------------------------------
    | CONFIGURATION
    |--------------------------------------------------------------------------
    */

    configuration: {

      side,

      label,

      architraveName,

      architraveValue:
        typeof architrave ===
        "string"
          ? architrave
          : (
              architrave
                ?.architraveValue ||
              ""
            ),

      width,

      material:
        pricing?.material ||
        "",

      wallHeight:
        calculation?.wallHeight ||
        0,

      wallWidth:
        calculation?.wallWidth ||
        0,
    },


    /*
    |--------------------------------------------------------------------------
    | CALCULATION
    |--------------------------------------------------------------------------
    */

    calculation: {

      formula:
        calculation?.formula ||
        "",

      totalMM:
        calculation?.totalMM ||
        0,

      totalRFT:
        rft,

      wallHeight:
        calculation?.wallHeight ||
        0,

      wallWidth:
        calculation?.wallWidth ||
        0,

      architraveWidth:
        width,

      sideOffset:
        calculation?.sideOffset ||
        0,

      mmPerFoot:
        calculation?.mmPerFoot ||
        304.8,
    },


    /*
    |--------------------------------------------------------------------------
    | PRICING
    |--------------------------------------------------------------------------
    */

    pricing: {

      material:
        pricing?.material ||
        "",

      materialKey:
        pricing?.materialKey ||
        "",

      width,

      rate,

      unit:
        "RFT",

      priceConfigured:
        pricing?.priceConfigured ??
        false,
    },


    /*
    |--------------------------------------------------------------------------
    | QUOTATION ITEM
    |--------------------------------------------------------------------------
    */

    quotationItem: {

      itemName:
        label,

      description,

      /*
      IMPORTANT:
      Actual RFT, NOT quantity 1
      */

      quantity:
        rft,

      unit:
        "RFT",

      rate,

      amount,

      priceConfigured:
        pricing?.priceConfigured ??
        false,

      badge:
        pricing?.priceConfigured
          ? `₹ ${formatMoney(
              rate
            )}/RFT`
          : "Price Not Configured",
    },


    /*
    |--------------------------------------------------------------------------
    | DISPLAY
    |--------------------------------------------------------------------------
    */

    display: {

      description,

      quantity:
        rft.toFixed(5),

      rate:
        rate.toFixed(3),

      amount:
        formatMoney(
          amount
        ),

      material:
        pricing?.material ||
        "-",

      width:
        width
          ? `${width} mm`
          : "-",

      priceConfigured:
        pricing?.priceConfigured ??
        false,
    },
  };
}


/* =========================================================
   BUILD COMPLETE ARCHITRAVE QUOTATION
========================================================= */

export function buildArchitraveQuotationFromState(
  state
) {
  /*
  |--------------------------------------------------------------------------
  | FRONT
  |--------------------------------------------------------------------------
  */

  const front =
    buildSingleArchitraveQuotation({
      side:
        "front",

      architrave:
        state?.frontArchitrave,

      state,
    });


  /*
  |--------------------------------------------------------------------------
  | BACK
  |--------------------------------------------------------------------------
  */

  const back =
    buildSingleArchitraveQuotation({
      side:
        "back",

      architrave:
        state?.backArchitrave,

      state,
    });


  /*
  |--------------------------------------------------------------------------
  | TOTAL
  |--------------------------------------------------------------------------
  */

  const totalAmount =
    toNumber(
      front?.amount
    ) +
    toNumber(
      back?.amount
    );


  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {

    front,

    back,

    hasFront:
      Boolean(front),

    hasBack:
      Boolean(back),

    totalAmount,

    items: [

      ...(front
        ? [
            front.quotationItem,
          ]
        : []),

      ...(back
        ? [
            back.quotationItem,
          ]
        : []),

    ],
  };
}