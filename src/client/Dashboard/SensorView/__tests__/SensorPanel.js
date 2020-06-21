import React from "react";
import { shallow, mount } from "enzyme";
import SensorPanel from "../SensorPanel";
import SensorModal from "../SensorModal";

describe("SensorPanel Render", () => {
  it("renders without crashing", () => {
    shallow(
      <SensorPanel readings={{}} latestReadings={{ date: Date.now() }} />
    );
  });

  it("Checks for essential components", () => {
    let wrapper = shallow(
      <SensorPanel readings={{}} latestReadings={{ date: Date.now() }} />
    );
    expect(wrapper.find(SensorModal)).toBeTruthy();
  });
});
