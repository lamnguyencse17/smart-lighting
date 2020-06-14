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
    this.setState({ area: e.target.value });
    this.props.action(e.target.value);
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
          <MenuItem value={1}>Area 1</MenuItem>
          <MenuItem value={2}>Area 2</MenuItem>
          <MenuItem value={3}>Area 3</MenuItem>
        </Select>
      </FormControl>
    );
  }
}
