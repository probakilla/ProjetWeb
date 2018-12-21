import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/navbar.css";

class HomeNavbar extends Component {
  static get propTypes() {
    return {
      brandName: PropTypes.string,
      rightBtn: PropTypes.element
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      brand: props.brandName,
      navBtn: props.rightBtn
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light nav-margin">
        <a className="navbar-brand" href="#">
          {this.props.brandName}
        </a>
        <span className="navbar-text ml-auto">{this.state.navBtn}</span>
      </nav>
    );
  }
}

export default HomeNavbar;
