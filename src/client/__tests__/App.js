import React from "react";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import App from "../App";
import configureMockStore from "redux-mock-store";
import { render } from "@testing-library/react";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Homepage Render", () => {
  let store, wrapper;

  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("Renders the connected app", () => {
    const initialState = {
      alert: {
        show: true,
        msg: "Test Display Alert",
        status: 0,
      },
    };
    store = mockStore(initialState);
    wrapper = shallow(<App store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});
