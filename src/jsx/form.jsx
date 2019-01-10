import React, { Component } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { TextInput } from "./input";
import { SubmitButton, ReturnToIndexButton, ValidButton } from "./button";
import UserSession from "../js/userSession";
import request from "../js/requests";
import Display from "./display";
import "../css/connection.css";
import "../css/modal.css";

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

  badLab(message) {
    let labInput = document.getElementById("labs-input");
    labInput.classList.add("is-invalid");
    let invalidField = document.getElementById("labs-input-invalid");
    invalidField.innerHTML = message;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let data = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      labs: this.state.labs
    });
    const correct = await request.sendUser(data);
    switch (correct) {
      case request.INCRIPTION_OK:
        this.setState({
          showModal: true,
          modalMsg: "Inscription réussie ! Bienvenue " + this.state.username
        });
        break;
      case request.BAD_PASSWORD:
        this.badRegister("Nom d'utilisateur déjà utilisé");
        break;
      case request.BAD_LAB:
        this.badLab("Le laboratoire entré n'existe pas");
        break;
    }
  }

  async handleConnection(event) {
    event.preventDefault();
    const params = "/" + this.state.username + "&" + this.state.password;
    const response = await request.userConnect(params);
    if (response !== null) {
      UserSession.connectUser(response.username, response.labs);
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

Display(<Form register={true} />, "register-col");
Display(<Form register={false} />, "connection-col");

export default Form;
