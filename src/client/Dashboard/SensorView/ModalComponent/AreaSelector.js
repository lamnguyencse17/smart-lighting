import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

export default class AreaSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: "",
    };
  }

  handleChange = (e) => {
    this.setState({ ...this.state, area: e.target.value });
    this.props.changeArea(e.target.value);
  };

  useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  classes = this.useStyles;
  render() {
    return (
      <FormControl
        className={this.classes.margin}
        style={{ minWidth: 180, marginRight: 5 }}
      >
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Area
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={this.state.area}
          onChange={this.handleChange}
          displayEmpty
          className={this.classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Object.keys(this.props.areas).map((id) => {
            <MenuItem value={this.props.areas[id]._id} key={id}>
              {this.props.areas[id].name}
            </MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  }
}
