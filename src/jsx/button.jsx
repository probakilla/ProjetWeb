import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/connection.css"

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
    this.state.action();
  }

  render() {
    return (
      <button className={this.state.style} onClick={this.handleClick}>
        {this.state.text}
      </button>
    );
  }
}

class SubmitButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <input className="btn btn-primary top-space" type="submit" value="Envoi" />;
  }
}

class ReturnToIndexButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    location.href = "index.html";
  }

  render() {
    return (
      <button className="btn btn-danger" onClick={this.handleClick}>
        Retour
      </button>
    );
  }
}

export { SubmitButton, Button, ReturnToIndexButton };
