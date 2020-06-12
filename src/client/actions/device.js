import { GET_DEVICE, TOGGLE_DEVICE } from "./types";
import axios from "axios";

const arrayToObject = (arr) => {
  let result = {};
  arr.forEach((element) => {
    let { _id, ...newItem } = element;
    result[element._id] = newItem;
  });
  return result;
};

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

export const toggleDevice = (device_id, value) => (dispatch) => {
  axios
    .post("http://localhost:3000/api/actions/sendCommand", {
      device_id,
      value,
    })
    .then((result, err) => {
      if (err) {
        console.log(err);
      } else {
        let data = {
          ...result.data,
          history: arrayToObject(result.data.history),
        };
        dispatch({ type: TOGGLE_DEVICE, payload: data });
      }
    });
};
