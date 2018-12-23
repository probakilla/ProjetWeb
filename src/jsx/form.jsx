import React, { Component } from "react";
import Button from "./button";
import "../css/connection.css";

function goBackHome() {
  location.href = "index.html";
}

function connect() {
  alert("Not implemented yet!");
}

class ConnectionForm extends Component {
  constructor() {
    super();
    this.state = {
      cardTitle: "Connexion",
      unameForm: "Nom d'utilisateur",
      passwordForm: "Mot de passe",
      submitBtnText: "Envoyer"
    };
  }

  render() {
    return (
      <div className="container">
        <div className="card top-space">
          <div className="card-body">
            <h5 className="card-title center-text">{this.state.cardTitle}</h5>
            <div className="form-group">
              <label htmlFor="input-username">{this.state.unameForm}</label>
              <input
                id="input-username"
                type="text"
                className="form-control"
                placeholder="..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="input-password">{this.state.passwordForm}</label>
              <input
                id="input-password"
                type="password"
                className="form-control"
                placeholder="..."
              />
            </div>
            <Button text="Envoi" action={connect} style="btn btn-primary" />
            <Button
              text="Retour"
              action={goBackHome}
              style="btn btn-danger left-spacing"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectionForm;
