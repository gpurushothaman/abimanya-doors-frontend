import {
    STORE_DATA
} from "./initialConstants";

export const storeData = (data) => ({
  type: STORE_DATA,
  payload: {responseData : data}
});

