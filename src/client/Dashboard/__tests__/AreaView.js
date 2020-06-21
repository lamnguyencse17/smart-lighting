import React from "react";
import { shallow } from "enzyme";
import AreaView from "../AreaView";
describe("AreaView Render", () => {
  it("renders without crashing", () => {
    shallow(<AreaView />);
  });
});
