import React, { Component } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { TextInput } from "./input";
import { SubmitButton, ReturnToIndexButton, ValidButton } from "./button";
import "../css/connection.css";
import "../css/modal.css";
import UserSession from "../js/userSession";

const request = require("../js/requests");
require("babel-polyfill");

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
      showModal: false,
      modalMsg: "",
      register: props.register
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConnecion = this.handleConnection.bind(this);
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

  async handleSubmit(event) {
    event.preventDefault();
    let data = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      teams: this.state.teams,
      labs: this.state.labs
    });
    const correct = await request.sendUser(data);
    if (correct) {
      this.setState({
        showModal: true,
        modalMsg: "Inscription réussie ! Bienvenue " + this.state.username
      });
    } else {
      this.badRegister("Nom d'utilisateur déjà utilisé");
    }
  }

  async handleConnection(event) {
    event.preventDefault();
    const params = "/" + this.state.username + "&" + this.state.password;
    const response = await request.userConnect(params);
    if (response !== null) {
      UserSession.connectUser(
        response.username,
        response.teams,
        response.labs
      );
      this.setState({
        showModal: true,
        modalMsg:
          "Connexion réussie ! Content de vous revoir " + this.state.username
      });
    } else {
      const message = "Nom ou mot de passe invalide";
      this.badLogin(message, message);
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <ReactModal
          className="modal-content center valid-modal"
          isOpen={this.state.showModal}
          ariaHideApp={false}
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
