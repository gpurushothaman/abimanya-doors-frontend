export const DOOR_SHUTTER_RATES = {
  laminate: {
    flute: {
      DT_32: { cost: 792 },
      DT_35: { cost: 792 },
      DT_38: { cost: 842 },
      DT_40: { cost: 865 },
      DT_45: { cost: 922 },
      DT_50: { cost: 1001 },
    },
    elite: {
      DT_32: { cost: 723 },
      DT_35: { cost: 723 },
      DT_38: { cost: 773 },
      DT_40: { cost: 796 },
      DT_45: { cost: 853 },
      DT_50: { cost: 932 },
    },
    titan: {
      DT_32: { cost: 804 },
      DT_35: { cost: 804 },
      DT_38: { cost: 853 },
      DT_40: { cost: 876 },
      DT_45: { cost: 934 },
      DT_50: { cost: 1012 },
    },
    plantina: {
      DT_32: { cost: 873 },
      DT_35: { cost: 873 },
      DT_38: { cost: 922 },
      DT_40: { cost: 945 },
      DT_45: { cost: 1003 },
      DT_50: { cost: 1081 },
    },
  },
  veneer: {
    luxe: {
      DT_32: { cost: 0 },
      DT_35: { cost: 0 },
      DT_38: { cost: 0 },
      DT_40: { cost: 1380 },
      DT_45: { cost: 1438 },
      DT_50: { cost: 1516 },
      DT_55: { cost: 1573 },

      goldenTeak: {
        DT_32: { cost: 0 },
        DT_35: { cost: 0 },
        DT_38: { cost: 0 },
        DT_40: { cost: 1551 },
        DT_45: { cost: 1609 },
        DT_50: { cost: 1687 },
        DT_55: { cost: 1745 },
      },
    },

    emporium: {
      DT_32: { cost: 0 },
      DT_35: { cost: 0 },
      DT_38: { cost: 0 },
      DT_40: { cost: 1540 },
      DT_45: { cost: 1597 },
      DT_50: { cost: 1676 },
      DT_55: { cost: 1733 },

      goldenTeak: {
        DT_32: { cost: 0 },
        DT_35: { cost: 0 },
        DT_38: { cost: 0 },
        DT_40: { cost: 1714 },
        DT_45: { cost: 1771 },
        DT_50: { cost: 1849 },
        DT_55: { cost: 1907 },
      },
    },
  },
};


function normalizeLookupKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

function findMatchingKey(object, value) {
  if (!object || value === null || value === undefined) {
    return null;
  }
  const target = normalizeLookupKey(value);
  if (!target) {
    return null;
  }
  const key = Object.keys(object).find((item) => normalizeLookupKey(item) === target);
  return key || null;
}

export function normalizeDoorThickness(thickness) {
  if (
    thickness === null ||
    thickness === undefined
  ) {
    return "";
  }
  let value = String(thickness)
    .trim()
    .toUpperCase();
  if (!value) {
    return "";
  }
  value = value.replace(/MM/g, "");
  value = value
    .replace(/^DT[\s_-]*/i, "")
    .trim();
  const match = value.match(/\d+(?:\.\d+)?/);
  if (!match) {
    return "";
  }
  const numberValue = Number(match[0]);
  if (!Number.isFinite(numberValue)) {
    return "";
  }
  return `DT_${numberValue}`;
}

export function getDoorShutterRate({ pricing = DOOR_SHUTTER_RATES, design, subDesign, thickness, shade, }) {
  if (!pricing) {
    return 0;
  }
  const designKey = findMatchingKey(pricing, design);
  if (!designKey) {
    return 0;
  }
  const designData = pricing[designKey];
  const subDesignKey = findMatchingKey(designData, subDesign);
  if (!subDesignKey) {
    return 0;
  }
  const subDesignData = designData[subDesignKey];
  const normalizedThickness = normalizeDoorThickness(thickness);
  if (!normalizedThickness) {
    return 0;
  }
  if (
    shade !== null &&
    shade !== undefined &&
    String(shade).trim() !== ""
  ) {
    const shadeKey = findMatchingKey(subDesignData, shade);
    if (shadeKey) {
      const shadeData = subDesignData[shadeKey];
      const shadeRate = shadeData?.[normalizedThickness]?.cost;
      if (
        shadeRate !== null &&
        shadeRate !== undefined
      ) {
        return Number(shadeRate) || 0;
      }
    }
  }

  const normalRate = subDesignData?.[normalizedThickness]?.cost;
  return Number(normalRate || 0);
}