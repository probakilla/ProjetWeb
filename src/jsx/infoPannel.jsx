import React, { Component } from "react";
import { Button } from "./button";
import UserSession from "../js/userSession";
import "../css/infoPannel.css";

class SessionData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <p>
          Votre laboratoire : {UserSession.getLabs()} <br />
        </p>
        <p>Votre équipe : {UserSession.getTeams()}</p>
      </div>
    );
  }
}

class InfoPannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infotext: "Veuillez vous connecter",
      txtHeader: "Informations",
      data: <SessionData />
    };
  }

  deselection() {
    alert("Not inmplemented yet !");
  }

  render() {
    return (
      <div className="container-fluid top-space">
        <div className="card bg-dark text-white">
          <div className="card-body">
            <div className="card-header">{this.state.txtHeader}</div>
            <span className="info-text">
              {UserSession.exists() ? this.state.data : this.state.infotext}
            </span>
            <br />
            <Button
              text="Réinitialiser sélection"
              style="btn btn-block btn-danger btn-cancel"
              action={this.deselection}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPannel;
