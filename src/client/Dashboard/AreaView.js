import React, { Component } from "react";

class AreaView extends Component {
  render() {
    return (
      <div>
        <h1>Area {this.props.match.params.name}</h1>
      </div>
    );
  }
}

export default AreaView;
