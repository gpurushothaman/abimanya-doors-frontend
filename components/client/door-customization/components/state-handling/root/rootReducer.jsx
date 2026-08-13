import initialState from "./initialState";
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
  ADJUST_WALL_WIDTH,
  ADJUST_WALL_THICKNESS
} from "./initialConstants";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_DATA:
      return {
        ...state,
        storeData: action?.payload?.responseData,
      };

    case SELECTED_LOCATION:
      return {
        ...state,
        location: action?.payload,
      };

    case SELECTED_DESIGN:
      return {
        ...state,
        design: action?.payload,
      };

    case SELECTED_SUBDESIGN:
      return {
        ...state,
        subDesign: action?.payload,
      };

    case SELECTED_MODEL:
      return {
        ...state,
        model: action?.payload,
      };

    case SELECTED_SHADE:
      return {
        ...state,
        shade: action?.payload,
      };

    case SET_CANVAS_THEME:
      return {
        ...state,
        smartMenuAction: {
          ...state.smartMenuAction,
          canvasBackgroundThemeStatus:
            action.payload.canvasBackgroundThemeStatus,
          canvasBackgroundTheme: action.payload.canvasBackgroundTheme,
        },
      };

    case VISIBLE_DOOR_ONLY:
      return {
        ...state,
        smartMenuAction: {
          ...state.smartMenuAction,
          doorOnlyStatus: action.payload,
        },
      };

    case SELECTED_FRAME:
      return {
        ...state,
        frame: action?.payload,
      };

    case ADJUST_WALL_HEIGHT:
      return {
        ...state,
        wall: {
          ...state.wall,
          height: action.payload.height,
          blendHeight: action.payload.blendHeight,
        },
      };

    case ADJUST_WALL_WIDTH:
      return {
        ...state,
        wall: {
          ...state.wall,
          width: action.payload.width,
          blendWidth: action.payload.blendWidth,
        },
      };

    case ADJUST_WALL_THICKNESS:
      return {
        ...state,
        wall: {
          ...state.wall,
          thickness: action.payload.thickness,
          blendThickness: action.payload.blendThickness,
        },
      };

    default:
      return state;
  }
};

export default rootReducer;
