import { GET_AREA } from "./types";
import axios from "axios";

export const getArea = (areaId) => (dispatch) => {
  axios
    .get(`http://localhost:3000/api/models/areas/${areaId}`)
    .then((result, err) => {
      if (err) {
        console.log(err);
      } else {
        dispatch({ type: GET_AREA, payload: result.data });
      }
    });
};
