import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

class Toggler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
    };
  }

  handleChange = (e) => {
    this.setState({ ...this.state, isOn: !this.state.isOn });
    this.props.action(this.state.isOn);
  };

  render() {
    return (
      <div className="device-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={this.state.isOn}
            onChange={this.handleChange}
          ></input>
          <span className="slider round"></span>
        </label>
      </div>
    );
  }
}

export default Toggler;
