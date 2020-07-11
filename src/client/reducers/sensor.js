import { GET_SENSOR, REMOVE_CONDITION } from "../actions/types";

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
    case REMOVE_CONDITION:
      let newConditions = { ...state.conditions };
      delete newConditions[action.payload];
      return {
        ...state,
        conditions: newConditions,
      };
    default:
      return state;
  }
}
