import initialState from "./initialState";
import {
    STORE_DATA
} from "./initialConstants";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_DATA:
      return {
        ...state,
        storeData: action?.payload?.responseData    
      };  

    default:
      return state;
  }
};

export default rootReducer;