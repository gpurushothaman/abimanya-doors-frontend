import {
    STORE_DATA,
    SELECTED_LOCATION,
    SELECTED_DESIGN,
    SELECTED_SUBDESIGN,
    SELECTED_MODEL,
    SELECTED_SHADE
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