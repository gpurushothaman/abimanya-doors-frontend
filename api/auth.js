// Thiyaguu Update the full new (Auth.js) file

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const loginAdmin = async (data) => {
  const response = await api.post(ENDPOINTS.LOGIN, data);
  return response.data;
};