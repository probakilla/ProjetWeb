import React, { Component } from "react";
import "../css/connection.css";

class ConnectionForm extends Component {
  constructor() {
    super();
    this.state = {
      cardTitle: "Connexion",
      unameForm: "Nom d'utilisateur",
      passwordForm: "Mot de passe",
      submitBtnText: "Envoyer",
      cancelBtnText: "Retour"
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
              <small id="username-help" className="form-text text-muted" />
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
            <button className="btn-primary">{this.state.submitBtnText}</button>
            <button className="btn-danger left-spacing">
              {this.state.cancelBtnText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectionForm;
