import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  static get propTypes() {
    return {
      text: PropTypes.string,
      action: PropTypes.func,
      style: PropTypes.string
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      action: props.action,
      style: props.style
    };
    this.handleClick = this.handleClick.bind(this);
  }

    handleClick() {
        this.state.action()
    }

  render() {
    return (
      <button
        className={this.state.style}
        onClick={this.handleClick}
      >
        {this.state.text}
      </button>
    );
  }
}

export default Button;
