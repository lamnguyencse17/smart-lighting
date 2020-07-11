import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";

export class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }
  ButtonStyle = withStyles({
    root: {
      float: "right",
      backgroundColor: "#373737",
      color: "#fff",
    },
  })(Button);
  handleDelete = () => {
    this.setState({ ...this.state, clicked: true });
  };
  handleConfirm = () => {
    let { conditionId } = this.props;
    this.setState({ ...this.state, clicked: false });
    axios.delete("http://localhost:3000/api/models/conditions", {
      data: {
        id: conditionId,
      },
    });
    this.props.removeCondition();
  };
  handleDeny = () => {
    this.setState({ ...this.state, clicked: false });
  };
  render() {
    return (
      <>
        {!this.state.clicked && (
          <this.ButtonStyle onClick={this.handleDelete}>X</this.ButtonStyle>
        )}
        {this.state.clicked && (
          <div>
            <div className="sensor-trigger-delete-confirm">Are you sure?</div>
            <ButtonGroup disableElevation variant="contained">
              <this.ButtonStyle onClick={this.handleConfirm}>
                Yes
              </this.ButtonStyle>
              <this.ButtonStyle onClick={this.handleDeny}>No</this.ButtonStyle>
            </ButtonGroup>
          </div>
        )}
      </>
    );
  }
}

export default DeleteButton;
