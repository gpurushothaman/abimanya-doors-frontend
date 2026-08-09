import initialState from "./initialState";
import {
    STORE_DATA,
    SELECTED_LOCATION,
    SELECTED_DESIGN,
    SELECTED_SUBDESIGN,
    SELECTED_MODEL,
    SELECTED_SHADE
} from "./initialConstants";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_DATA:
      return {
        ...state,
        storeData: action?.payload?.responseData    
      };  

    case SELECTED_LOCATION:
      return {
        ...state,
        location: action?.payload    
      };  

    case SELECTED_DESIGN:
      return {
        ...state,
        design: action?.payload    
      }; 

    case SELECTED_SUBDESIGN:
      return {
        ...state,
        subDesign: action?.payload    
      };

    case SELECTED_MODEL:
      return {
        ...state,
        model: action?.payload    
      };

    case SELECTED_SHADE:
      return {
        ...state,
        shade: action?.payload    
      };
    
    default:
      return state;
  }
};

export default rootReducer;