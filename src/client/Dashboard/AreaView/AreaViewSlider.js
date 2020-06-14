import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { debounce } from "lodash";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { adjustDevice } from "../../actions/device";

class AreaViewSlider extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  handleSliderDebounce = debounce(
    (value) => this.props.adjustDevice(this.props.device_id, value),
    3000
  );

  handleChange = (e, newValue) => {
    this.props.setSliderValue(newValue);
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
        value={this.props.deviceIntensity}
        onChange={this.handleChange}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ adjustDevice }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(AreaViewSlider));
