import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <div className="logo-text">
            <Link to="/">Smart Lighting</Link>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Start</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Navbar;
