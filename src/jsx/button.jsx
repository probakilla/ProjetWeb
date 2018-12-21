import React, { Component } from "react";
import PropTypes from "prop-types";

class BrandButton extends Component {
  static get propTypes() {
    return {
      text: PropTypes.string,
      action: PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      action: props.action
    };
    this.handleClick = this.handleClick.bind(this);
  }

    handleClick() {
        this.state.action()
    }

  render() {
    return (
      <button
        className="btn-link"
        onClick={this.handleClick}
      >
        {this.state.text}
      </button>
    );
  }
}

export default BrandButton;
