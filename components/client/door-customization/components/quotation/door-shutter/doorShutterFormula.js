const MM_PER_FOOT = 304.8;

export function toNumber(value, fallback = 0) {
  const number = Number(
    String(value ?? "")
      .replace(/,/g, "")
      .trim()
  );
  return Number.isFinite(number) ? number : fallback;
}

export function isThresholdEnabled(value) {
  const text = String(value ?? "")
    .trim()
    .toLowerCase();
  return (text === "yes" || text === "true" || text === "1" || text.includes("yes"));
}

function getFrameSectionCandidates(frameSection) {
  if (
    frameSection === null ||
    frameSection === undefined
  ) {
    return [];
  }
  if (
    typeof frameSection === "string" ||
    typeof frameSection === "number"
  ) {
    return [String(frameSection)];
  }
  if (typeof frameSection === "object") {
    return [frameSection?.frameSectionName, frameSection?.name, frameSection?.frameSectionValue, frameSection?.value, frameSection?.itmName, frameSection?.itmValue,].filter(
      (value) =>
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ""
    );
  }
  return [];
}

export function parseFrameSectionDimensions(frameSection) {
  const candidates = getFrameSectionCandidates(frameSection);
  for (const candidate of candidates) {
    const text = String(candidate)
      .trim();
    const directMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:x|×|\*)\s*(\d+(?:\.\d+)?)/i);
    if (directMatch) {
      const firstDimension = toNumber(directMatch[1]);
      const secondDimension = toNumber(directMatch[2]);
      return { found: true, rawValue: text, firstDimension, secondDimension, thickness: secondDimension, };
    }
    const numericValues = text.match(/\d+(?:\.\d+)?/g);
    if (numericValues?.length >= 2) {
      const firstDimension = toNumber(numericValues[numericValues.length - 2]);
      const secondDimension = toNumber(numericValues[numericValues.length - 1]);
      return { found: true, rawValue: text, firstDimension, secondDimension, thickness: secondDimension, };
    }
  }
  return { found: false, rawValue: "", firstDimension: 0, secondDimension: 0, thickness: 0, };
}

export function getFrameSectionThickness(frameSection) {
  const parsed = parseFrameSectionDimensions(frameSection);
  return parsed.thickness;
}

export function calculateFinishedDoorHeight({ wallHeight, frameSectionThickness, threshold, }) {
  const H = toNumber(wallHeight);
  const S = toNumber(frameSectionThickness);
  if (isThresholdEnabled(threshold)) {
    return H - 2 * S + 18;
  }
  return H - S + 4;
}

export function calculateFinishedDoorWidth({ wallWidth, frameSectionThickness, }) {
  const W = toNumber(wallWidth);
  const S = toNumber(frameSectionThickness);
  return W - 2 * S + 18;
}

export function calculateEffectiveSFT({ finishedHeight, finishedWidth, }) {
  const H = toNumber(finishedHeight);
  const W = toNumber(finishedWidth);
  if (H <= 0 || W <= 0) {
    return 0;
  }
  const heightFeet = H / MM_PER_FOOT;
  const widthFeet = W / MM_PER_FOOT;
  return heightFeet * widthFeet;
}

export function calculateDoorShutter({ wallHeight, wallWidth, frameSection, threshold, }) {
  const parsedFrameSection = parseFrameSectionDimensions(frameSection);
  const frameSectionThickness = parsedFrameSection.thickness;
  const finishedHeight = calculateFinishedDoorHeight({ wallHeight, frameSectionThickness, threshold, });
  const finishedWidth = calculateFinishedDoorWidth({ wallWidth, frameSectionThickness, });
  const effectiveSFT = calculateEffectiveSFT({ finishedHeight, finishedWidth, });
  return {
    wallHeight: toNumber(wallHeight),
    wallWidth: toNumber(wallWidth),
    frameSection,
    frameSectionDimensions: {
      found: parsedFrameSection.found,
      rawValue: parsedFrameSection.rawValue,
      firstDimension: parsedFrameSection.firstDimension,
      secondDimension: parsedFrameSection.secondDimension,
    },
    frameSectionThickness,
    threshold,
    finishedHeight,
    finishedWidth,
    effectiveSFT,
  };
}