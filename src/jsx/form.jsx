import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput } from "./input";
import ReactModal from "react-modal";
import { SubmitButton, ReturnToIndexButton, ValidButton } from "./button";
const HttpCodes = require("../server/httpCodes.js");
import "../css/connection.css";
import "../css/modal.css";

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
      showModal: false,
      modalMsg: "",
      register: props.register
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConnecion = this.handleConnection.bind(this);
  }

  checkCorrectCode(request, code) {
    return request.readyState === 4 && request.status === code;
  }

  badRegister(message) {
    let unameInput = document.getElementById("username-input");
    unameInput.classList.add("is-invalid");
    let invalidField = document.getElementById("username-input-invalid");
    invalidField.innerHTML = message;
  }

  badLogin(usernameMessage, passwordMessage) {
    this.badRegister(usernameMessage);
    let pswdInput = document.getElementById("password-input");
    pswdInput.classList.add("is-invalid");
    let invalidField = document.getElementById("password-input-invalid");
    invalidField.innerHTML = passwordMessage;
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
      if (this.checkCorrectCode(request, HttpCodes.CREATED)) {
        this.setState({
          showModal: true,
          modalMsg: "Inscription réussie ! Bienvenue " + this.state.username
        });
      } else if (this.checkCorrectCode(request, HttpCodes.BAD_REQUEST)) {
        this.badRegister("Nom d'utilisateur déjà utilisé");
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
      if (this.checkCorrectCode(request, HttpCodes.ACCEPTED)) {
        sessionStorage.setItem("username", this.state.username);
        this.setState({
          showModal: true,
          modalMsg:
            "Connexion réussie ! Content de vous revoir " + this.state.username
        });
      } else {
        const message = "Nom ou mot de passe invalide";
        this.badLogin(message, message);
      }
    };
    request.send(null);
  }

  render() {
    return (
      <div className="container-fluid">
        <ReactModal
          className="modal-content center valid-modal"
          isOpen={this.state.showModal}
        >
          <p>{this.state.modalMsg}</p>
          {<ValidButton />}
        </ReactModal>
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

export default Form;
