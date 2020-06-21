import { SET_ALERT, CLOSE_ALERT } from "./types";

export const setAlert = (msg, status) => (dispatch) => {
  dispatch({ type: SET_ALERT, payload: { msg, status } });
};

export const closeAlert = () => (dispatch) => {
  dispatch({ type: CLOSE_ALERT });
};
