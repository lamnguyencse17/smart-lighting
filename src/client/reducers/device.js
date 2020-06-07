import { GET_DEVICE } from "../actions/types";

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
    default:
      return state;
  }
}
