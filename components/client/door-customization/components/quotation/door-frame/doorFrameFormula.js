// components/client/door-customization/components/quotation/door-frame/doorFrameFormula.js

/*
|--------------------------------------------------------------------------
| MILLIMETERS PER FOOT
|--------------------------------------------------------------------------
*/

const MM_PER_FOOT = 304.8;


/*
|--------------------------------------------------------------------------
| NUMBER HELPER
|--------------------------------------------------------------------------
*/

export function toNumber(
  value,
  fallback = 0
) {
  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value
      : fallback;
  }


  const cleaned = String(value ?? "")
    .replace(/,/g, "")
    .replace(/₹/g, "")
    .trim();


  if (cleaned === "") {
    return fallback;
  }


  const number = Number(
    cleaned
  );


  return Number.isFinite(number)
    ? number
    : fallback;
}


/*
|--------------------------------------------------------------------------
| THRESHOLD CHECK
|--------------------------------------------------------------------------
|
| Supports:
|
| "Yes"
| "yes"
| true
| 1
| "1"
|
|--------------------------------------------------------------------------
*/

export function isThresholdEnabled(
  value
) {
  const text = String(
    value ?? ""
  )
    .trim()
    .toLowerCase();


  return (
    text === "yes" ||
    text === "true" ||
    text === "1" ||
    text.includes("yes")
  );
}


/*
|--------------------------------------------------------------------------
| CALCULATE MM
|--------------------------------------------------------------------------
|
| Threshold YES:
|
| 2H + 2W
|
| Threshold NO:
|
| 2H + W
|
|--------------------------------------------------------------------------
*/

export function calculateDoorFrameMM({
  wallHeight,
  wallWidth,
  threshold,
}) {
  const H =
    toNumber(
      wallHeight
    );


  const W =
    toNumber(
      wallWidth
    );


  const hasThreshold =
    isThresholdEnabled(
      threshold
    );


  const totalMM =
    hasThreshold
      ? 2 * H + 2 * W
      : 2 * H + W;


  return {
    wallHeight:
      H,

    wallWidth:
      W,

    threshold,

    hasThreshold,

    formula:
      hasThreshold
        ? "2H + 2W"
        : "2H + W",

    totalMM,
  };
}


/*
|--------------------------------------------------------------------------
| MM -> RFT
|--------------------------------------------------------------------------
*/

export function calculateDoorFrameRFT(
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
    mm / MM_PER_FOOT
  );
}


/*
|--------------------------------------------------------------------------
| FINAL DOOR FRAME CALCULATION
|--------------------------------------------------------------------------
*/

export function calculateDoorFrame({
  wallHeight,
  wallWidth,
  threshold,
}) {
  const mmCalculation =
    calculateDoorFrameMM({
      wallHeight,
      wallWidth,
      threshold,
    });


  const totalRFT =
    calculateDoorFrameRFT(
      mmCalculation.totalMM
    );


  const geometryReady =
    mmCalculation.wallHeight > 0 &&
    mmCalculation.wallWidth > 0 &&
    String(
      mmCalculation.threshold ?? ""
    ).trim() !== "";


  return {
    ...mmCalculation,

    totalRFT:
      geometryReady
        ? totalRFT
        : 0,

    geometryReady,

    mmPerFoot:
      MM_PER_FOOT,
  };
}