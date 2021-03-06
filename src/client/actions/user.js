import { GET_USER } from "./types";
import axios from "axios";

export const getUser = (email) => (dispatch) => {
  if (!localStorage.getItem("_id")) {
    axios
      .get(`http://localhost:3000/api/models/users?email=${email}`)
      .then((result, err) => {
        if (err) {
          console.log(err);
          dispatch({
            type: SET_ALERT,
            payload: {
              status: 0,
              msg:
                "Your username/password is incorrect. Please try again later",
            },
          });
        } else {
          dispatch({ type: GET_USER, payload: result.data });
        }
      });
  }
};
