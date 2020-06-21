import React from "react";
import { shallow } from "enzyme";
import DeviceView from "../DeviceView";
describe("DeviceView Render", () => {
  it("renders without crashing", () => {
    shallow(<DeviceView />);
  });
});
