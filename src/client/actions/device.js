import { GET_DEVICE } from "./types";
import axios from "axios";

export const getDevice = (deviceId) => (dispatch) => {
  axios
    .get(`http://localhost:3000/api/models/devices/${deviceId}`)
    .then((result, err) => {
      if (err) {
        console.log(err);
      } else {
        dispatch({ type: GET_DEVICE, payload: result.data });
      }
    });
};

export const setDevice = (device_id, value) => (dispatch) => {
  axios
    .post(`http://localhost:3000/api/models/devices/${device_id}`, {
      body: {
        value,
      },
    })
    .then((result, err) => {
      if (err) {
        console.log(err);
      } else {
        dispatch({ type: SET_DEVICE, payload: result.data });
      }
    });
};
