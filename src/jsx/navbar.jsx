import React, { Component } from "react";
import "../css/navbar.css";

class HomeNavbar extends Component {
  constructor() {
    super();
    this.state = {
      brand: "HELLO THERE",
      nav_text: "GENERAL KENOBI"
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light nav-margin">
        <a className="navbar-brand" href="#">
          {this.state.brand}
        </a>
        <span className="navbar-text ml-auto">{this.state.nav_text}</span>
      </nav>
    );
  }
}

export default HomeNavbar;
