// components/client/door-customization/components/quotation/architrave/architraveFormula.js

/*
|--------------------------------------------------------------------------
| ARCHITRAVE FORMULA
|--------------------------------------------------------------------------
|
| S30:
|   2(H + 15) + (W + 15)
|
| S40:
|   2(H + 25) + (W + 25)
|
| S60:
|   2(H + 45) + (W + 45)
|
| MM -> RFT
| RFT = MM / 304.8
|--------------------------------------------------------------------------
*/

const MM_PER_FOOT = 304.8;


/* =========================================================
   NUMBER HELPER
========================================================= */

export function toNumber(
  value,
  fallback = 0
) {
  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value
      : fallback;
  }


  const cleaned = String(
    value ?? ""
  )
    .replace(/,/g, "")
    .replace(/₹/g, "")
    .trim();


  if (!cleaned) {
    return fallback;
  }


  const number = Number(
    cleaned
  );


  return Number.isFinite(number)
    ? number
    : fallback;
}


/* =========================================================
   GET ARCHITRAVE WIDTH
========================================================= */

/*
   Handles:

   "S30"
   "S40"
   "S60"

   "30"
   "40"
   "60"

   "30mm"
   "40mm"
   "60mm"

   Object values also handled by caller.
*/

export function getArchitraveWidth(
  value
) {
  const text = String(
    value ?? ""
  )
    .trim()
    .toLowerCase();


  if (!text) {
    return 0;
  }


  /*
  |--------------------------------------------------------------------------
  | IMPORTANT:
  | Check 30 / 40 / 60 from selected string
  |--------------------------------------------------------------------------
  */

  if (
    /\b30\b/.test(text) ||
    text.includes("s30")
  ) {
    return 30;
  }


  if (
    /\b40\b/.test(text) ||
    text.includes("s40")
  ) {
    return 40;
  }


  if (
    /\b60\b/.test(text) ||
    text.includes("s60")
  ) {
    return 60;
  }


  return 0;
}


/* =========================================================
   FORMULA BY WIDTH
========================================================= */

export function getArchitraveFormulaByWidth(
  width
) {
  const numericWidth =
    getArchitraveWidth(
      width
    );


  switch (
    numericWidth
  ) {
    case 30:
      return {
        width: 30,

        sideOffset: 15,

        formula:
          "2(H + 15) + (W + 15)",
      };


    case 40:
      return {
        width: 40,

        sideOffset: 25,

        formula:
          "2(H + 25) + (W + 25)",
      };


    case 60:
      return {
        width: 60,

        sideOffset: 45,

        formula:
          "2(H + 45) + (W + 45)",
      };


    default:
      return {
        width: 0,

        sideOffset: 0,

        formula: "",
      };
  }
}


/* =========================================================
   CALCULATE ARCHITRAVE MM
========================================================= */

export function calculateArchitraveMM({
  wallHeight,
  wallWidth,
  architraveWidth,
}) {
  const H =
    toNumber(
      wallHeight
    );


  const W =
    toNumber(
      wallWidth
    );


  const formulaData =
    getArchitraveFormulaByWidth(
      architraveWidth
    );


  const width =
    formulaData.width;


  const offset =
    formulaData.sideOffset;


  /*
  |--------------------------------------------------------------------------
  | INVALID INPUT
  |--------------------------------------------------------------------------
  */

  if (
    H <= 0 ||
    W <= 0 ||
    width <= 0
  ) {
    return {
      wallHeight: H,

      wallWidth: W,

      architraveWidth:
        width,

      sideOffset:
        offset,

      formula:
        formulaData.formula,

      totalMM: 0,

      geometryReady:
        false,
    };
  }


  /*
  |--------------------------------------------------------------------------
  | FORMULA
  |--------------------------------------------------------------------------
  |
  | 30:
  | 2(H + 15) + (W + 15)
  |
  | 40:
  | 2(H + 25) + (W + 25)
  |
  | 60:
  | 2(H + 45) + (W + 45)
  |
  |--------------------------------------------------------------------------
  */

  const totalMM =
    2 * (H + offset) +
    (W + offset);


  return {
    wallHeight:
      H,

    wallWidth:
      W,

    architraveWidth:
      width,

    sideOffset:
      offset,

    formula:
      formulaData.formula,

    totalMM,

    geometryReady:
      true,
  };
}


/* =========================================================
   MM -> RFT
========================================================= */

export function calculateArchitraveRFT(
  totalMM
) {
  const mm =
    toNumber(
      totalMM
    );


  if (mm <= 0) {
    return 0;
  }


  return (
    mm /
    MM_PER_FOOT
  );
}


/* =========================================================
   FINAL CALCULATION
========================================================= */

export function calculateArchitrave({
  wallHeight,
  wallWidth,
  architraveWidth,
}) {
  const mmCalculation =
    calculateArchitraveMM({
      wallHeight,

      wallWidth,

      architraveWidth,
    });


  const totalRFT =
    calculateArchitraveRFT(
      mmCalculation.totalMM
    );


  /*
  |--------------------------------------------------------------------------
  | 5 DECIMAL RFT
  |--------------------------------------------------------------------------
  */

  const roundedRFT =
    Number(
      totalRFT.toFixed(5)
    );


  return {
    ...mmCalculation,

    totalRFT:
      roundedRFT,

    mmPerFoot:
      MM_PER_FOOT,
  };
}