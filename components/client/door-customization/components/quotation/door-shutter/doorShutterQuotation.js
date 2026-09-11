import { calculateDoorShutter, } from "./doorShutterFormula";
import { DOOR_SHUTTER_RATES, getDoorShutterRate, } from "./doorShutterPricing";

function getStateValue(source, keys = []) {
  if (source === null || source === undefined) {
    return "";
  }
  if (
    typeof source === "string" ||
    typeof source === "number" ||
    typeof source === "boolean"
  ) {
    return source;
  }
  for (const key of keys) {
    const value = source?.[key];
    if (
      value !== null &&
      value !== undefined &&
      value !== ""
    ) {
      return value;
    }
  }
  return "";
}
export function buildDoorShutterQuotation({ design, subDesign, model, shade, thickness, frameSection, wallHeight, wallWidth, threshold, quantity = 1, pricing = DOOR_SHUTTER_RATES, }) {
  const calculation = calculateDoorShutter({ wallHeight, wallWidth, frameSection, threshold, });
  const rate = getDoorShutterRate({ pricing, design, subDesign, thickness, shade, });
  const doorQuantity = Math.max(Number(quantity) || 0, 0);
  const totalSFT = calculation.effectiveSFT * doorQuantity;
  const amount = totalSFT * rate;

  return {
    type: "door-shutter",
    configuration: {
      design, subDesign, model, shade, thickness, frameSection,
      wallHeight: calculation.wallHeight,
      wallWidth: calculation.wallWidth,
      threshold,
      quantity: doorQuantity,
    },
    calculation: {
      frameSectionThickness: calculation.frameSectionThickness,
      frameSectionDimensions: calculation.frameSectionDimensions,
      finishedHeight: calculation.finishedHeight,
      finishedWidth: calculation.finishedWidth,
      effectiveSFT: calculation.effectiveSFT,
      totalSFT,
    },
    pricing: { rate, unit: "SFT", amount, },
    quotationItem: {
      id: "door-shutter", description: "Door Shutter",
      quantity: totalSFT, unit: "SFT", rate, amount,
      priceConfigured: rate > 0,
    },
  };
}
export function buildDoorShutterQuotationFromState(state, { quantity = 1, pricing = DOOR_SHUTTER_RATES, } = {}) {
  const design = getStateValue(state?.design, ["designValue", "value", "itmValue", "name", "designName",]);
  const subDesign = getStateValue(state?.subDesign, ["subDesignValue", "value", "itmValue", "name", "subDesignName",]);
  const model = getStateValue(state?.model, ["modelValue", "value", "itmValue", "name", "modelName",]);
  const shade = getStateValue(state?.shade, ["shadeValue", "value", "itmValue", "name", "shadeName",]);
  const thickness = getStateValue(state?.doorThickness, ["DoorThicknessValue", "doorThicknessValue", "thicknessValue", "value", "itmValue", "name",]);
  const frameSection = getStateValue(state?.frameSection, ["frameSectionValue", "value", "itmValue", "frameSectionName", "name", "itmName",]);
  const threshold = getStateValue(state?.threshold, ["thresholdValue", "value", "itmValue", "thresholdName", "name", "itmName",]);
  const wallHeight = state?.wall?.height ?? 0;
  const wallWidth = state?.wall?.width ?? 0;
  return buildDoorShutterQuotation({ design, subDesign, model, shade, thickness, frameSection, wallHeight, wallWidth, threshold, quantity, pricing, });
}