import { GET_USER } from "../actions/types";

const initialState = JSON.parse(localStorage.getItem("user")) || {
  _id: "",
  areas: {},
  devices: {},
  sensors: {},
  name: "",
  email: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
