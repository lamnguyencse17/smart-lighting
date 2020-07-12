import { GET_DEVICE, ADJUST_DEVICE, SET_ALERT } from "./types";
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
    .get(
      `https://smart-lighting-backend.herokuapp.com/api/models/devices/${deviceId}`
    )
    .then((result, err) => {
      if (err) {
        console.log(err);
        dispatch({
          type: SET_ALERT,
          payload: {
            status: 0,
            msg:
              "Cannot find the devices you are looking for. Please try again later",
          },
        });
      } else {
        dispatch({ type: GET_DEVICE, payload: result.data });
      }
    });
};

export const adjustDevice = (device_id, value) => (dispatch) => {
  let isOn = false;
  if (value > 0) {
    isOn = true;
  }
  axios
    .post(
      "https://smart-lighting-backend.herokuapp.com/api/actions/sendCommand",
      {
        device_id,
        value,
        isOn,
      }
    )
    .then((result, err) => {
      if (err) {
        console.log(err);
        dispatch({
          type: SET_ALERT,
          payload: {
            status: 0,
            msg:
              "There was an error in trying to complete your action. Please try again later",
          },
        });
      } else {
        let data = {
          ...result.data,
          history: arrayToObject(result.data.history),
        };
        dispatch({ type: ADJUST_DEVICE, payload: data });
      }
    });
};
