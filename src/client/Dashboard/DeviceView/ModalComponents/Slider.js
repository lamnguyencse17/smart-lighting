import React, { Component } from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

class IntensitySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (e, newValue) => {
    this.setState({ ...this.state, value: newValue });
    this.props.action(newValue);
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

  ButtonStyle = withStyles({
    root: {
      backgroundColor: "#7beced",
      margin: "20px",
    },
  })(Button);

  useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  render() {
    return (
      <this.PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        max={255}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default IntensitySlider;
