// components/client/door-customization/components/quotation/architrave/architravePricing.js

/*
|--------------------------------------------------------------------------
| ARCHITRAVE PRICING
|--------------------------------------------------------------------------
|
| Final canonical materials:
|
| solid african teak
| mahagony hardwood
| solid steam beech
|
|--------------------------------------------------------------------------
*/

export const ARCHITRAVE_PRICING = {
  "solid african teak": {
    "30": 90,
    "40": 115,
    "60": 161,
  },

  "mahagony hardwood": {
    "30": 60,
    "40": 76,
    "60": 104,
  },

  "solid steam beech": {
    "30": 64,
    "40": 85,
    "60": 113,
  },
};


/*
|--------------------------------------------------------------------------
| NORMALIZE TEXT
|--------------------------------------------------------------------------
*/

export function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}


/*
|--------------------------------------------------------------------------
| CANONICAL MATERIAL
|--------------------------------------------------------------------------
|
| Whatever backend/UI sends,
| convert it into one pricing key.
|--------------------------------------------------------------------------
*/

export function getArchitraveMaterial({
  frameType,
  frameTypeOption,
}) {
  const frameTypeName = normalizeText(
    frameType?.frameTypeName
  );

  const optionName = normalizeText(
    frameTypeOption?.frameTypeOptionName
  );

  const optionValue = normalizeText(
    frameTypeOption?.frameTypeOptionValue
  );

  const combined = `${optionName} ${optionValue}`.trim();

  /*
  |--------------------------------------------------------------------------
  | AFRICAN TEAK
  |--------------------------------------------------------------------------
  */

  if (
    frameTypeName.includes("solid wood") &&
    (
      optionName.includes("african teak") ||
      optionValue.includes("african teak")
    )
  ) {
    return "Solid African Teak";
  }


  /*
  |--------------------------------------------------------------------------
  | MAHOGANY
  |--------------------------------------------------------------------------
  |
  | Handles:
  | Mahogany
  | Mahagony
  | Mahogany Hardwood
  | Mahagony Hardwood
  |--------------------------------------------------------------------------
  */

  if (
    combined.includes("mahogany") ||
    combined.includes("mahagony")
  ) {
    return "Mahagony Hardwood";
  }


  /*
  |--------------------------------------------------------------------------
  | STEAM BEECH
  |--------------------------------------------------------------------------
  |
  | Handles:
  | Steam Beech
  | SteamBeech
  | Solid Steam Beech
  |--------------------------------------------------------------------------
  */

  if (
    combined.includes("steam beech") ||
    combined.includes("steambeech")
  ) {
    return "Solid Steam Beech";
  }


  /*
  |--------------------------------------------------------------------------
  | FALLBACK
  |--------------------------------------------------------------------------
  */

  return String(
    frameTypeOption?.frameTypeOptionName ||
    frameTypeOption?.frameTypeOptionValue ||
    ""
  ).trim();
}


/*
|--------------------------------------------------------------------------
| WIDTH NORMALIZER
|--------------------------------------------------------------------------
*/

export function normalizeArchitraveWidth(value) {
  const text = String(value ?? "")
    .trim()
    .toLowerCase();

  if (!text) {
    return "";
  }

  if (text.includes("60")) {
    return "60";
  }

  if (text.includes("40")) {
    return "40";
  }

  if (text.includes("30")) {
    return "30";
  }

  return text.replace(/^s/i, "");
}


/*
|--------------------------------------------------------------------------
| GET RATE
|--------------------------------------------------------------------------
*/

export function getArchitraveRate({
  frameType,
  frameTypeOption,
  architraveWidth,
}) {
  const material = getArchitraveMaterial({
    frameType,
    frameTypeOption,
  });

  const materialKey = normalizeText(material);

  const widthKey = normalizeArchitraveWidth(
    architraveWidth
  );

  const materialPricing =
    ARCHITRAVE_PRICING[materialKey] || null;

  const priceConfigured = Boolean(
    materialPricing &&
    Object.prototype.hasOwnProperty.call(
      materialPricing,
      widthKey
    )
  );

  const rate = priceConfigured
    ? Number(materialPricing[widthKey] ?? 0)
    : 0;


  /*
  |--------------------------------------------------------------------------
  | DEBUG
  |--------------------------------------------------------------------------
  */

  console.log(
    "ARCHITRAVE PRICING LOOKUP:",
    {
      frameTypeName:
        frameType?.frameTypeName,

      frameTypeOptionName:
        frameTypeOption?.frameTypeOptionName,

      frameTypeOptionValue:
        frameTypeOption?.frameTypeOptionValue,

      material,

      materialKey,

      architraveWidth,

      widthKey,

      priceConfigured,

      rate,
    }
  );


  return {
    material,
    materialKey,

    width:
      Number(widthKey) || 0,

    rate,

    priceConfigured,
  };
}


/*
|--------------------------------------------------------------------------
| STATE BASED LOOKUP
|--------------------------------------------------------------------------
*/

export function getArchitraveRateFromState(
  state,
  architraveWidth
) {
  return getArchitraveRate({
    frameType: state?.frameType,
    frameTypeOption: state?.frameTypeOption,
    architraveWidth,
  });
}