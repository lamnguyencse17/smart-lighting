import { SET_ERROR, CLOSE_ERROR } from "./types";

export const setError = (msg) => (dispatch) => {
  dispatch({ type: SET_ERROR, payload: msg });
};

export const closeError = () => (dispatch) => {
  dispatch({ type: CLOSE_ERROR });
};
