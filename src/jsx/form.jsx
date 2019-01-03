import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types";
import { TextInput } from "./input";
import { SubmitButton, ReturnToIndexButton } from "./button";
import "../css/connection.css";
import display from "./display";
import Message from "./jumbotron";

class Form extends Component {
  static get propTypes() {
    return {
      buttons: PropTypes.element,
      forms: PropTypes.element,
      style: PropTypes.string,
      cardTitle: PropTypes.string
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      buttons: props.buttons,
      forms: props.forms,
      style: props.style,
      cardTitle: props.cardTitle
    };
    this.render = this.render.bind(this);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className={"card top-space " + this.state.style}>
          <div className="card-body">
            <div className="card-header">{this.state.cardTitle}</div>
            {this.state.forms}
            {this.state.buttons}
          </div>
        </div>
      </div>
    );
  }
}

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      teams: "",
      labs: "",
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  setRedirect() {
    alert("click");
    this.setState({
      redirect: true
    })
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="message.html" />
    }
  }

  handleSubmit(event) {
    let name = "Bienvenue " + this.state.username;
    display(
      <Message
        header={name}
        text=""
      />,
      "message-col"
    );
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    const url = "http://localhost:4444/user";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    let data = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      teams: this.state.teams,
      labs: this.state.labs
    });
    xhr.send(data);
    location.href = "index.html";
  }

  render() {
    const redirect = false;
    if (redirect === true) {
      return <Redirect to="http://localhost:8080/index.html" />
    }
    return (
      <div className="container-fluid">
        {this.renderRedirect()}
        <div className="card top-space">
          <div className="card-body">
            <div className="card-header">Connexion</div>
            <form onSubmit={this.handleSubmit}>
              <TextInput
                labelText="Nom d'utilisateur"
                id="username-input"
                type="text"
                name="username"
                onChange={this.handleChange}
              />
              <TextInput
                labelText="Mot de passe"
                id="password-input"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              <TextInput
                labelText="Laboratoire"
                id="labs-input"
                type="text"
                name="labs"
                onChange={this.handleChange}
              />
              <TextInput
                labelText="Equipe"
                id="teams-input"
                type="text"
                name="teams"
                onChange={this.handleChange}
              />
              <SubmitButton />
            </form>
            <hr />
            <div className="col text-center">
              <ReturnToIndexButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

display(<FormRegister />, "register-col");

export default Form;
