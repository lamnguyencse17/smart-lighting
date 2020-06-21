import React from "react";
import thunk from "redux-thunk";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import SensorModal from "../SensorModal";
import ConditionSelector from "../ModalComponent/ConditionSelecter";
import SensorSelector from "../ModalComponent/SensorSelector";
import DeviceSelector from "../ModalComponent/DeviceSelector";
import AreaSelector from "../ModalComponent/AreaSelector";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("SensorModal Render", () => {
  let store, wrapper;

  beforeEach(() => {
    const initialState = {
      alert: {},
      user: { areas: {}, devices: {}, sensors: {} },
    };
    store = mockStore(initialState);
    wrapper = shallow(
      <Router>
        <SensorModal store={store} />
      </Router>
    );
  });
  it("renders without crashing", () => {
    shallow(<SensorModal />);
  });

  it("Renders the connected app", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("Checks for essential components", () => {
    expect(wrapper.find(ConditionSelector)).toBeTruthy();
    expect(wrapper.find(SensorSelector)).toBeTruthy();
    expect(wrapper.find(DeviceSelector)).toBeTruthy();
    expect(wrapper.find(AreaSelector)).toBeTruthy();
  });
});
