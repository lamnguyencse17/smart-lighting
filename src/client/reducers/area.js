import { GET_AREA } from "../actions/types";

const initialState = {
  _id: "",
  devices: {},
  sensors: {},
  name: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AREA:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
