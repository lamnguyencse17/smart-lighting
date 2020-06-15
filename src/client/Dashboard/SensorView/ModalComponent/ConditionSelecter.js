import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import { MenuItem } from "@material-ui/core";

export default class ConditionSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      condition: "",
    };
  }

  handleConditionChange = (e) => {
    this.setState({ condition: e.target.value });
    this.props.conditionAction(e.target.value);
  };

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.valueAction(e.target.value);
  };

  BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(2),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 14,
      padding: "5px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: ["Arial", "Roboto", '"Helvetica Neue"', "sans-serif"].join(
        ","
      ),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }))(InputBase);

  useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  classes = this.useStyles;
  render() {
    return (
      <div className="device-toggle">
        <FormControl
          className={this.classes.margin}
          style={{ minWidth: 200, minHeight: 8, marginRight: 5 }}
        >
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Condition:
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={this.state.condition}
            onChange={this.handleConditionChange}
            displayEmpty
            className={this.classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={">"}>Greater Than</MenuItem>
            <MenuItem value={">="}>Greater Than or Equal</MenuItem>
            <MenuItem value={"="}>Equal</MenuItem>
            <MenuItem value={"<="}>Less Than or Equal</MenuItem>
            <MenuItem value={"<"}>Less Than</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ minWidth: 60, maxHeight: 9 }}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Value:
          </InputLabel>
          <this.BootstrapInput
            id="textbox"
            value={this.state.value}
            onChange={this.handleValueChange}
          />
        </FormControl>
      </div>
    );
  }
}