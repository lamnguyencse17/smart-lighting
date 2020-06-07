import { GET_SENSOR } from "../actions/types";

const initialState = {
  _id: "",
  device_id: "",
  name: "",
  conditions: {},
  readings: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SENSOR:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
