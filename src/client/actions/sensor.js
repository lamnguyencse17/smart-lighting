import { GET_SENSOR, SET_ALERT, REMOVE_CONDITION } from "./types";
import axios from "axios";

export const getSensor = (sensorId) => (dispatch) => {
  axios
    .get(`http://localhost:3000/api/models/sensors/${sensorId}`)
    .then((result, err) => {
      if (err) {
        console.log(err);
        dispatch({
          type: SET_ALERT,
          payload: {
            status: 0,
            msg:
              "Cannot find the sensor you are looking for. Please try again later",
          },
        });
      } else {
        dispatch({ type: GET_SENSOR, payload: result.data });
      }
    });
};
export const removeCondition = (conditionId) => (dispatch) => {
  dispatch({ type: REMOVE_CONDITION, payload: conditionId });
};
