import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getAllDoorCustomizeOptions = async(token) => api.get(ENDPOINTS.DOOR_CUSTOMIZE_OPTIONS, {
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

