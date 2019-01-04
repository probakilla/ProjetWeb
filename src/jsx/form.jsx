import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput } from "./input";
import { SubmitButton, ReturnToIndexButton } from "./button";
import "../css/connection.css";
import display from "./display";

class FormUser extends Component {
  static get propTypes() {
    return {
      handleChange: PropTypes.func,
      handleSubmit: PropTypes.func,
      register: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      handleChange: props.handleChange,
      handleSubmit: props.handleSubmit,
      register: props.register,
      inputUsername: (
        <TextInput
          labelText="Nom d'utilisateur"
          id="username-input"
          type="text"
          name="username"
          onChange={props.handleChange}
        />
      ),
      inputPassword: (
        <TextInput
          labelText="Mot de passe"
          id="password-input"
          type="password"
          name="password"
          onChange={props.handleChange}
        />
      ),
      inputLabs: (
        <TextInput
          labelText="Laboratoire"
          id="labs-input"
          type="text"
          name="labs"
          onChange={props.handleChange}
        />
      ),
      inputTeams: (
        <TextInput
          labelText="Equipe"
          id="teams-input"
          type="text"
          name="teams"
          onChange={props.handleChange}
        />
      )
    };
    this.render = this.render.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.state.handleSubmit}>
        {this.state.inputUsername}
        {this.state.inputPassword}
        {this.state.register ? this.state.inputLabs : null}
        {this.state.register ? this.state.inputTeams : null}
        <SubmitButton />
      </form>
    );
  }
}

class Form extends Component {
  static get propTypes() {
    return {
      register: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      teams: "",
      labs: "",
      urlUser: "http://localhost:4444/user",
      register: props.register
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConnecion = this.handleConnection.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const request = new XMLHttpRequest();
    const url = this.state.urlUser;
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    let data = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      teams: this.state.teams,
      labs: this.state.labs
    });
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 201) {
        alert(request.responseText);
        location.href = "index.html";
      }
    };
    request.send(data);
  }

  handleConnection(event) {
    event.preventDefault();
    const request = new XMLHttpRequest();
    const url = this.state.urlUser;
    const params = "/" + this.state.username + "&" + this.state.password;
    request.open("GET", url + params, true);
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 202) {
        alert(request.responseText);
        location.href = "index.html";
      }
    };
    request.send(null);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="card top-space">
          <div className="card-body">
            <div className="card-header">Connexion</div>
            <FormUser
              handleChange={this.handleChange}
              handleSubmit={
                this.state.register ? this.handleSubmit : this.handleConnecion
              }
              register={this.state.register}
            />
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

display(<Form register={true} />, "register-col");
display(<Form register={false} />, "connection-col");

export default Form;
