import React from "react";
import { shallow } from "enzyme";
import Dashboard from "../Dashboard";
describe("Dashboard Render", () => {
  it("renders without crashing", () => {
    shallow(<Dashboard />);
  });
});
