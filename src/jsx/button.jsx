import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/connection.css";

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
    return (
      <input
        className="btn btn-primary top-space"
        type="submit"
        value="Envoi"
      />
    );
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

class RegisterButtons extends Component {
  constructor(props) {
    super(props);
  }

  regirectionRegister() {
    location.href = "register.html";
  }

  redirectionConnection() {
    location.href = "connection.html";
  }

  render() {
    return (
      <div className="container">
        <Button
          text="Connexion"
          action={this.redirectionConnection}
          style="btn btn-link white-link"
        />
        <Button
          text="Enregistrement"
          action={this.regirectionRegister}
          style="btn btn-link white-link"
        />
      </div>
    );
  }
}

class LogOutButton extends Component {
  static get propTypes() {
    return {
      action: PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      action: props.action
    };
  }

  render() {
    return (
      <Button
        text="Déconnexion"
        action={this.state.action}
        style="btn btn-link white-link"
      />
    );
  }
}

class ValidButton extends Component {
  constructor(props) {
    super(props);
  }

  goHome() {
    location.href = "index.html";
  }

  render() {
    return (
      <button className="btn btn-success" onClick={this.goHome}>
        Ok
      </button>
    );
  }
}

export {
  SubmitButton,
  Button,
  ReturnToIndexButton,
  RegisterButtons,
  LogOutButton,
  ValidButton
};
