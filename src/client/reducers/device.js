import { GET_DEVICE, TOGGLE_DEVICE } from "../actions/types";

const initialState = {
  _id: "",
  device_id: "",
  name: "",
  history: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DEVICE:
      return {
        ...action.payload,
      };
    case TOGGLE_DEVICE:
      let newHistory = Object.assign(action.payload.history, state.history);
      return {
        ...state,
        history: newHistory,
      };
    default:
      return state;
  }
}
