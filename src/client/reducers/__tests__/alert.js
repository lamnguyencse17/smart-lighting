import alert from "../alert";
import { SET_ALERT, CLOSE_ALERT } from "../../actions/types";

describe("alert reducer", () => {
  it("should return the initial state", () => {
    expect(alert(undefined, {})).toEqual({
      show: false,
      msg: "",
      status: 0,
    });
  });

  it("should set alert", () => {
    expect(
      alert([], {
        type: SET_ALERT,
        payload: {
          msg: "Set alert test",
          status: 0,
        },
      })
    ).toEqual({
      msg: "Set alert test",
      status: 0,
      show: true,
    });
  });
  it("should close alert", () => {
    expect(
      alert([], {
        type: CLOSE_ALERT,
      })
    ).toEqual({
      show: false,
      msg: "",
      status: 0,
    });
  });
});
