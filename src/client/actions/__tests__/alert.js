import { SET_ALERT, CLOSE_ALERT } from "../types";
import { setAlert, closeAlert } from "../alert";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Test alert function", () => {
  it("should set new state to alert", () => {
    const msg = "test msg";
    const status = 0;
    const expectedActions = [
      {
        type: SET_ALERT,
        payload: {
          msg,
          status,
        },
      },
    ];
    const store = mockStore({ todos: [] });
    store.dispatch(setAlert(msg, status));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should reset alert state", () => {
    const expectedActions = [
      {
        type: CLOSE_ALERT,
      },
    ];
    const store = mockStore({ todos: [] });
    store.dispatch(closeAlert());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
