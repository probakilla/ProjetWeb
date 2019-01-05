import React, { Component } from "react";
import { RegisterButtons, LogOutButton } from "./button";
import "../css/navbar.css";

class HomeNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brand: "Page d'acceuil"
    };
  }

  sessionExists() {
    return sessionStorage.getItem("username") !== null;
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-margin">
        <a className="navbar-brand" href="#">
          {this.sessionExists()
            ? sessionStorage.getItem("username")
            : this.state.brand}
        </a>
        <span className="navbar-text ml-auto">
          {this.sessionExists() ? <LogOutButton /> : <RegisterButtons />}
        </span>
      </nav>
    );
  }
}

export default HomeNavbar;
