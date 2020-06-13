import React, { Component } from "react";
import { TextField } from '@material-ui/core';

class DeviceModal extends Component {
  render() {
    return(            
      <div className="root">
        <form  noValidate>
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
        </form>
      </div>);
  }
}

export default DeviceModal;
