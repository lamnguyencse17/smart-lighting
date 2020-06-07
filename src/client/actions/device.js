import { GET_DEVICE } from "./types";
import axios from "axios";

export const getDevice = (deviceId) => (dispatch) => {
  axios
    .get(`http://localhost:3000/api/models/devices/${deviceId}`)
    .then((result, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.data);
        dispatch({ type: GET_DEVICE, payload: result.data });
      }
    });
};
