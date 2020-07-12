import { GET_AREA, SET_ALERT } from "./types";
import axios from "axios";

export const getArea = (areaId) => (dispatch) => {
  axios
    .get(
      `https://smart-lighting-backend.herokuapp.com/api/models/areas/${areaId}`
    )
    .then((result, err) => {
      if (err) {
        console.log(err);
        dispatch({
          type: SET_ALERT,
          payload: {
            status: 0,
            msg: "Request To Server Failed. Please try again later",
          },
        });
      } else {
        dispatch({ type: GET_AREA, payload: result.data });
      }
    });
};
