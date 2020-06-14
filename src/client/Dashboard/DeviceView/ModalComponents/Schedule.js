import React, { Component } from "react";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: "",
    };
  }

  handleChange = (e) => {
    this.setState({ schedule: e.target.value });
    this.props.action(e.target.value);
  };

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

  classes = this.useStyles;

  render() {
    return (
      <form className={this.classes.container} noValidate>
        <TextField
          id="datetime-local"
          label="Choose Time"
          type="datetime-local"
          onChange={this.handleChange}
          className={this.classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  }
}

export default Schedule;
