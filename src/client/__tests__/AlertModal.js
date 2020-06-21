import React from "react";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import AlertModal from "../AlertModal";
import configureMockStore from "redux-mock-store";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("AlertModal Render", () => {
  let store, wrapper;

  beforeEach(() => {
    const initialState = {
      alert: {
        show: true,
        msg: "Test Display Alert",
        status: 0,
      },
    };
    store = mockStore(initialState);
    wrapper = shallow(
      <Router>
        <AlertModal store={store} />
      </Router>
    );
  });

  it("renders without crashing", () => {
    shallow(<AlertModal />);
  });

  it("Renders the connected app", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("Renders with Data", () => {
    let { queryAllByText } = render(wrapper);
    expect(queryAllByText(/Test Display Alert/i)).toBeTruthy();
  });
});
