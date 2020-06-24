import React from "react";
import thunk from "redux-thunk";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router";
import App from "../App";
import About from "../About";
import configureMockStore from "redux-mock-store";
import Navbar from "../Common/Navbar";
import AlertModal from "../AlertModal";
import Dashboard from "../Dashboard/Dashboard";
import Home from "../Home";
import { Provider } from "react-redux";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Homepage Render", () => {
  let store, wrapper;

  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("Renders the connected app", () => {
    let initialState = {
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

  it("Checks Common Component", () => {
    expect(wrapper.find(Navbar)).toBeTruthy();
    expect(wrapper.find(AlertModal)).toBeTruthy();
  });

  it("Checks About Route", () => {
    let initialState = {
      alert: {
        show: false,
        msg: "Test Display Alert",
        status: 0,
      },
    };
    store = mockStore(initialState);
    let routeWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/about"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(routeWrapper.find(About)).toHaveLength(1);
  });

  it("Checks Dashboard Route", () => {
    let initialState = {
      user: {
        _id: "",
        areas: {},
        devices: {},
        sensors: {},
        name: "",
        email: "",
        token: "",
      },
      area: {
        _id: "",
        devices: {},
        sensors: {},
        name: "",
      },
      device: {
        _id: "",
        device_id: "",
        name: "",
        history: {},
      },
      sensor: {
        _id: "",
        device_id: "",
        name: "",
        conditions: {},
        readings: {},
      },
      alert: {
        show: false,
        msg: "",
        status: 0,
      },
    };
    store = mockStore(initialState);
    let routeWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/dashboard"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(routeWrapper.find(Dashboard)).toHaveLength(1);
  });

  it("Checks Home Route", () => {
    let initialState = {
      area: {
        _id: "",
        devices: {},
        sensors: {},
        name: "",
      },
      device: {
        _id: "",
        device_id: "",
        name: "",
        history: {},
      },
      sensor: {
        _id: "",
        device_id: "",
        name: "",
        conditions: {},
        readings: {},
      },
      alert: {
        show: false,
        msg: "",
        status: 0,
      },
    };
    store = mockStore(initialState);
    let routeWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(routeWrapper.find(Home)).toHaveLength(1);
  });
});
