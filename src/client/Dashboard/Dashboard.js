import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SensorView from "./SensorView";

// Logged in home in Mockup
class Dashboard extends Component {
  render() {
    return (
      <>
        <Route exact path={`${this.props.match.path}/`}>
          <h1>Dashboard</h1>
        </Route>
        <Route
          path={`${this.props.match.path}/sensor/:name`}
          component={SensorView}
        />
      </>
    );
  }
}

export default Dashboard;
