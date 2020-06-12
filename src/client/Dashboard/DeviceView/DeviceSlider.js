import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { debounce } from "lodash";

class DeviceSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceIntensity: 0,
    };
  }

  handleSliderDebounce = debounce((value) => console.log(value), 5000);

  handleChange = (e, newValue) => {
    this.setState({ deviceIntensity: newValue });
    this.handleSliderDebounce(newValue);
  };

  PrettoSlider = withStyles({
    root: {
      width: 300,
      color: "#ccc",
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#ff85a7",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  render() {
    return (
      <this.PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        max={255}
        value={this.state.deviceIntensity}
        onChange={this.handleChange}
      />
    );
  }
}

export default DeviceSlider;
