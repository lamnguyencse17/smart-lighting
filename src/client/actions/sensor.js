import { GET_SENSOR } from "./types";
import axios from "axios";

export const getArea = (sensorId) => (dispatch) => {
  axios
    .get(`http://localhost:3000/api/models/sensors/${sensorId}`)
    .then((result, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.data);
        dispatch({ type: GET_SENSOR, payload: result.data });
      }
    });
};
