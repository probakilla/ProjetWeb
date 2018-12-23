import React, { Component } from "react";
import Button from "./button";
import TextInput from "./input";
import "../css/connection.css";

class ConnectionForm extends Component {
  constructor() {
    super();
    this.state = {
      cardTitle: "Connexion",
      unameForm: "Nom d'utilisateur",
      passwordForm: "Mot de passe",
      submitBtnText: "Envoi",
      cancelBtnText: "Retour"
    };
  }

  goBackHome() {
    location.href = "index.html";
  }

  connect() {
    alert("Not implemented yet!");
  }

  render() {
    return (
      <div className="container">
        <div className="card top-space">
          <div className="card-body">
            <h5 className="card-title center-text">{this.state.cardTitle}</h5>
            <TextInput
              id="input-username"
              type="text"
              labelText={this.state.unameForm}
              placeholder="..."
            />
            <TextInput
              id="input-password"
              type="password"
              labelText={this.state.passwordForm}
              placeholder="..."
            />
            <Button
              text={this.state.submitBtnText}
              action={this.connect}
              style="btn btn-primary"
            />
            <Button
              text={this.state.cancelBtnText}
              action={this.goBackHome}
              style="btn btn-danger left-spacing"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectionForm;
