// components/client/door-customization/components/quotation/door-frame/doorFramePricing.js

/*
|--------------------------------------------------------------------------
| DOOR FRAME PRICING
|--------------------------------------------------------------------------
|
| Pricing is based on:
|
| Frame Type
|    +
| Frame Type Option
|    +
| Frame Section
|
| Example:
|
| Solid Wood
|    +
| African Teak
|    +
| 90 x 60
|
| => Solid African Teak
| => 90x60
| => ₹773 / RFT
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| PRICING TABLE
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Blank / unavailable rates are intentionally stored as 0.
|
|--------------------------------------------------------------------------
*/

export const DOOR_FRAME_PRICING = {
  "solid african teak": {
    "90x45": 0,
    "90x50": 0,
    "90x60": 773,

    "115x45": 0,
    "115x50": 0,
    "115x60": 952,

    "150x45": 0,
    "150x50": 1053,
    "150x60": 1194,
  },

  mahogany: {
    "90x45": 0,
    "90x50": 570,
    "90x60": 0,

    "115x45": 0,
    "115x50": 662,
    "115x60": 752,

    "150x45": 0,
    "150x50": 784,
    "150x60": 0,
  },

  "steam beech": {
    "90x45": 610,
    "90x50": 0,
    "90x60": 0,

    "115x45": 736,
    "115x50": 0,
    "115x60": 0,

    "150x45": 842,
    "150x50": 0,
    "150x60": 0,
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
| NORMALIZE FRAME SECTION
|--------------------------------------------------------------------------
|
| Examples:
|
| "90 x 60"         => "90x60"
| "90x60"           => "90x60"
| "90 X 60"         => "90x60"
| "SAT_3a_90_60_F"  => "90x60"
|
|--------------------------------------------------------------------------
*/

export function normalizeFrameSection(value) {
  const text = String(value ?? "")
    .trim()
    .toLowerCase();

  if (!text) {
    return "";
  }


  /*
  |--------------------------------------------------------------------------
  | Direct format
  |--------------------------------------------------------------------------
  */

  const directMatch = text.match(
    /(\d{2,3})\s*[x*]\s*(\d{2,3})/i
  );

  if (directMatch) {
    return `${directMatch[1]}x${directMatch[2]}`;
  }


  /*
  |--------------------------------------------------------------------------
  | Underscore / hyphen format
  |--------------------------------------------------------------------------
  |
  | Example:
  | SAT_3a_90_60_F
  |
  |--------------------------------------------------------------------------
  */

  const separatedMatch = text.match(
    /(\d{2,3})[_-](\d{2,3})/
  );

  if (separatedMatch) {
    return `${separatedMatch[1]}x${separatedMatch[2]}`;
  }


  /*
  |--------------------------------------------------------------------------
  | Extract numbers as fallback
  |--------------------------------------------------------------------------
  */

  const numbers = text.match(/\d+/g);

  if (numbers && numbers.length >= 2) {
    return `${numbers[numbers.length - 2]}x${
      numbers[numbers.length - 1]
    }`;
  }


  return "";
}


/*
|--------------------------------------------------------------------------
| GET FRAME MATERIAL
|--------------------------------------------------------------------------
|
| Actual state:
|
| frameType:
|   "Solid Wood"
|
| frameTypeOption:
|   "African Teak"
|
| Required pricing material:
|   "Solid African Teak"
|
|--------------------------------------------------------------------------
*/

export function getDoorFrameMaterial({
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

  if (!optionName && !optionValue) {
    return "";
  }

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
  */

  if (
    combined.includes("mahogany") ||
    combined.includes("mahagony")
  ) {
    return "Mahogany";
  }


  /*
  |--------------------------------------------------------------------------
  | STEAM BEECH
  |--------------------------------------------------------------------------
  */

  if (
    combined.includes("steam beech") ||
    combined.includes("steambeech")
  ) {
    return "Steam Beech";
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
| GET DOOR FRAME RATE
|--------------------------------------------------------------------------
*/

export function getDoorFrameRate({
  frameType,
  frameTypeOption,
  frameSection,
}) {
  /*
  |--------------------------------------------------------------------------
  | MATERIAL
  |--------------------------------------------------------------------------
  */

  const material = getDoorFrameMaterial({
    frameType,
    frameTypeOption,
  });


 /*
|--------------------------------------------------------------------------
| NORMALIZED MATERIAL KEY
|--------------------------------------------------------------------------
*/

const normalizedMaterialKey = normalizeText(
  material
);


/*
|--------------------------------------------------------------------------
| MATERIAL ALIASES
|--------------------------------------------------------------------------
*/

const materialAliases = {
  "solid steam beech": "steam beech",
  "steambeech": "steam beech",

  "mahagony hardwood": "mahogany",
  "mahagony": "mahogany",
  "mahogany hardwood": "mahogany",
};


/*
|--------------------------------------------------------------------------
| FINAL MATERIAL KEY
|--------------------------------------------------------------------------
*/

const materialKey =
  materialAliases[normalizedMaterialKey] ||
  normalizedMaterialKey;


/*
|--------------------------------------------------------------------------
| SECTION
|--------------------------------------------------------------------------
*/

const section = normalizeFrameSection(
  frameSection?.frameSectionName ??
    frameSection?.frameSectionValue
);


/*
|--------------------------------------------------------------------------
| PRICING OBJECT
|--------------------------------------------------------------------------
*/

const materialPricing =
  DOOR_FRAME_PRICING[materialKey] ?? null; /*
  |--------------------------------------------------------------------------
  | IMPORTANT
  |--------------------------------------------------------------------------
  |
  | hasOwnProperty is used instead of:
  |
  | rate > 0
  |
  | because 0 is a valid configured price
  |
  |--------------------------------------------------------------------------
  */

  const priceConfigured = Boolean(
    materialPricing &&
      Object.prototype.hasOwnProperty.call(
        materialPricing,
        section
      )
  );


  /*
  |--------------------------------------------------------------------------
  | RATE
  |--------------------------------------------------------------------------
  */

  const rate = priceConfigured
    ? Number(materialPricing[section] ?? 0)
    : 0;


  /*
  |--------------------------------------------------------------------------
  | DEBUG
  |--------------------------------------------------------------------------
  */

  console.log(
    "DOOR FRAME PRICING LOOKUP:",
    {
      frameType,
      frameTypeOption,
      frameSection,

      material,
      materialKey,

      section,

      priceConfigured,
      rate,
    }
  );


  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {
    material,
    materialKey,
    section,

    rate,

    priceConfigured,
  };
}


/*
|--------------------------------------------------------------------------
| STATE BASED RATE LOOKUP
|--------------------------------------------------------------------------
*/

export function getDoorFrameRateFromState(
  state
) {
  return getDoorFrameRate({
    frameType: state?.frameType,

    frameTypeOption:
      state?.frameTypeOption,

    frameSection:
      state?.frameSection,
  });
}