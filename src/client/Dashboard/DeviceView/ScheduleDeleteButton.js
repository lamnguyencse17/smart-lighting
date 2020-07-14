import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";

export class ScheduleDeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }
  ButtonStyle = withStyles({
    root: {
      backgroundColor: "#373737",
      color: "#fff",
      width: "5rem",
    },
  })(Button);
  ButtonSureStyle = withStyles({
    root: {
      backgroundColor: "#7beced",
      color: "#373737",
      width: "5rem",
    },
  })(Button);
  ButtonUndoStyle = withStyles({
    root: {
      backgroundColor: "#ff85a7",
      color: "#373737",
      width: "5rem",
    },
  })(Button);
  handleDelete = () => {
    this.setState({ ...this.state, clicked: true });
  };
  handleConfirm = () => {
    let { scheduleId } = this.props;
    this.setState({ ...this.state, clicked: false });
    axios.delete("https://smart-lighting-backend.herokuapp.com/api/models/schedules", {
      data: {
        id: scheduleId,
      },
    });
  };
  handleDeny = () => {
    this.setState({ ...this.state, clicked: false });
  };
  render() {
    return (
      <>
        {!this.state.clicked && (
          <this.ButtonStyle onClick={this.handleDelete}>Delete</this.ButtonStyle>
        )}
        {this.state.clicked && (
          <div className="schedule-delete-confirm-container">
            <ButtonGroup disableElevation variant="contained">
              <this.ButtonSureStyle onClick={this.handleConfirm}>
                Sure
              </this.ButtonSureStyle>
              <this.ButtonUndoStyle onClick={this.handleDeny}>Undo</this.ButtonUndoStyle>
            </ButtonGroup>
          </div>
        )}
      </>
    );
  }
}

export default ScheduleDeleteButton;
