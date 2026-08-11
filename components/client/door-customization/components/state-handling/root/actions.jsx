import {
    STORE_DATA,
    SELECTED_LOCATION,
    SELECTED_DESIGN,
    SELECTED_SUBDESIGN,
    SELECTED_MODEL,
    SELECTED_SHADE,
    SET_CANVAS_THEME,
    VISIBLE_DOOR_ONLY,
    SELECTED_FRAME,
    ADJUST_WALL_HEIGHT,
    ADJUST_WALL_WIDTH
} from "./initialConstants";

//Store - Initial fetched data from api
export const storeData = (data) => ({
  type: STORE_DATA,
  payload: {responseData : data}
});

//Store - Selected door location
export const storeLocation = (location) => ({
  type: SELECTED_LOCATION,
  payload: location
});

//Store - Selected door design
export const storeDesign = (design) => ({
  type: SELECTED_DESIGN,
  payload: design
});

//Store - Selected door sub design
export const storeSubDesign = (subDesign) => ({
  type: SELECTED_SUBDESIGN,
  payload: subDesign
});

//Store - Selected model
export const storeModel = (model) => ({
  type: SELECTED_MODEL,
  payload: model
});

//Store - Selected shade
export const storeShade = (shade) => ({
  type: SELECTED_SHADE,
  payload: shade
});

//Store - Canvas theme
export const storeCanvasTheme = (canvasTheme) => ({
  type: SET_CANVAS_THEME,
  payload: canvasTheme
});

//Store - Visible door only status
export const storeDoorOnlyStatus = (doorStatus) => ({
  type: VISIBLE_DOOR_ONLY,
  payload: doorStatus
});

//Store - frame
export const storeFrame = (frame) => ({
  type: SELECTED_FRAME,
  payload: frame
});

//Store - Adjust wall height
export const storeAdjustWallHeight = (wallHeight) => ({
  type: ADJUST_WALL_HEIGHT,
  payload: wallHeight
});

//Store - Adjust wall width
export const storeAdjustWallWidth = (wallWidth) => ({
  type: ADJUST_WALL_WIDTH,
  payload: wallWidth
});