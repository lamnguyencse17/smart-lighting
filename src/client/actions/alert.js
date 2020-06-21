import { SET_ALERT, CLOSE_ALERT } from "./types";

export const setAlert = (msg) => (dispatch) => {
  dispatch({ type: SET_ALERT, payload: {msg} });
};

export const closeAlert = () => (dispatch) => {
  dispatch({ type: CLOSE_ALERT });
};
