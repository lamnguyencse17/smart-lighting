import { SET_ERROR, CLOSE_ERROR } from "../actions/types";

const initialState = {
  show: false,
  msg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        show: true,
        msg: action.payload,
      };
    case CLOSE_ERROR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
