import { LOGIN_SUCCESS, LOGOUT } from "../constants/authConstants";

export const login = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      user,
    },
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return {
    type: LOGOUT,
  };
};