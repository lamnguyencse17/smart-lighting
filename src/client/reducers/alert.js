import { SET_ALERT, CLOSE_ALERT } from "../actions/types";

const initialState = {
  show: false,
  msg: "",
  status: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        show: true,
        msg: action.payload.msg,
        status: action.payload.status,
      };
    case CLOSE_ALERT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
