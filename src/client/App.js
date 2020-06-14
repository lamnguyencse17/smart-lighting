import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Common/Navbar";
import About from "./About"

export default class App extends Component {
  constructor() {
    super();
  }
  componentWillUnmount() {}
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route path="/about" render={(props) => <About {...props} />} />
          <Route
            path="/dashboard"
            render={(props) => <Dashboard {...props} />}
          />
        </Switch>
      </>
    );
  }
}
