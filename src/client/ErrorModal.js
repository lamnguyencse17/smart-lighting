import React, { Component } from "react";
import Alert from '@material-ui/lab/Alert';

export default class ErrorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message: this.props.message,
          show: this.props.show,
        };
    }
    handleClose = () => {
        this.setState({...this.state, show: false});
    }
    render(){
        let {message,show} = this.state;
        return (
            <>
            {show &&
                <Alert onClose={() => {this.handleClose()}} variant="filled" severity="error">
                {message}
                </Alert>
            }
            </>
        );
    }
}
