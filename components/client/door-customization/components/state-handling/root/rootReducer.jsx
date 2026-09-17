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
  ADJUST_WALL_THICKNESS,
  SELECTED_FRAME_TYPE,
  SELECTED_FRAME_TYPE_OPTION,
  SELECTED_FRAME_SECTION,
  SELECTED_THRESHOLD,
  SELECTED_DOOR_THICKNESS,
  SELECTED_JAMB_LOCATION,
  SELECTED_DOOR_ORIENTATION,
  SELECTED_DOOR_FRONT_ARCHITRAVE,
  SELECTED_DOOR_BACK_ARCHITRAVE
} from "./initialConstants";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_DATA:
      return {
        ...state,
        storeData: action?.payload?.responseData?.allOptionData,
        design : action?.payload?.responseData?.initialDesign,
        subDesign : action?.payload?.responseData?.initialSubDesign,
        model : action?.payload?.responseData?.initialModel,
        selectedPreviousModel : action?.payload?.responseData?.selectedPreviousModel,
        frame : action?.payload?.responseData?.initialFrame,
        frameType : action?.payload?.responseData?.initialFrameType,
        frameTypeOption : action?.payload?.responseData?.initialFrameTypeOption,
        frameSection : action?.payload?.responseData?.initialFrameSection,
        orientation : action?.payload?.responseData?.initialOrientation,
        threshold : action?.payload?.responseData?.initialThreshold,
        jambLocation : action?.payload?.responseData?.initialJambLocation,
        frontArchitrave : action?.payload?.responseData?.initialFrontArchitrave,
        backArchitrave : action?.payload?.responseData?.initialBackArchitrave,
        doorThickness : action?.payload?.responseData?.initialDoorthickness,
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
        selectedPreviousModel:
          state?.model && state?.model?.modelPath ? state?.model : "default",
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

    case SELECTED_FRAME_TYPE:
      return {
        ...state,
        frameType: action?.payload,
      };

    case SELECTED_FRAME_TYPE_OPTION:
      return {
        ...state,
        frameTypeOption: action?.payload,
      };

    case SELECTED_FRAME_SECTION:
      return {
        ...state,
        frameSection: action?.payload,
        selectedPreviousFrameSection:
          state?.frameSection && state?.frameSection?.frameSectionValue
            ? state?.frameSection
            : action?.payload,
      };

    case SELECTED_THRESHOLD:
      return {
        ...state,
        threshold: action?.payload,
      };

    case SELECTED_DOOR_THICKNESS:
      return {
        ...state,
        doorThickness: action?.payload,
        selectedDoorThickness:
          state?.doorThickness && state?.doorThickness?.DoorThicknessValue
            ? state?.doorThickness
            : action?.payload,
      };

    case SELECTED_JAMB_LOCATION:
      return {
        ...state,
        jambLocation: action?.payload,
        selectedJambLocation:
          state?.jambLocation && state?.jambLocation?.jambLocationValue
            ? state?.jambLocation
            : action?.payload,
      };

    case SELECTED_DOOR_FRONT_ARCHITRAVE:
      return {
        ...state,
        frontArchitrave: action?.payload
      };

    case SELECTED_DOOR_BACK_ARCHITRAVE:
      return {
        ...state,
        backArchitrave: action?.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
