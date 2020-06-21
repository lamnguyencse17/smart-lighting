import React from "react";
import { shallow } from "enzyme";
import SensorView from "../SensorView";
describe("SensorView Render", () => {
  it("renders without crashing", () => {
    shallow(<SensorView />);
  });
});
