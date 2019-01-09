import React, { Component } from "react";
import { Button } from "./button";
import UserSession from "../js/userSession";
import "../css/infoPannel.css";

const labNameIndex = 0;
const titleIndex = 0;
const releasedDateIndex = 1;
const collaboratorsIndex = 2;
let selectedLabArrayInfo;

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
      </div>
    );
  }
}

class InfoData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let infoLab = []
    infoLab.push(
      <div className="container">
      <strong>
        Collaborations entre: {UserSession.getLabs()} et {selectedLabArrayInfo[labNameIndex]}:
      </strong>
    </div>)
    for (let i = 1; i < selectedLabArrayInfo.length; ++i)
    {
      let stringCollaborators = "";
      for (let j = 0; j < selectedLabArrayInfo[i][collaboratorsIndex].length; ++j)
      {
        stringCollaborators += "[" + selectedLabArrayInfo[i][collaboratorsIndex][j] + "] ";
      }
      infoLab.push(
        <div key={i} className="container">
        <p className="collab-info">
          Nom de l&apos;article : {selectedLabArrayInfo[i][titleIndex]} <br />
          Date de sortie : {selectedLabArrayInfo[i][releasedDateIndex]} <br />
          Collaborateurs : {stringCollaborators}
        </p>
      </div>
      )
    }
    return (infoLab);
  }
}

class InfoPannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infotext: "Veuillez vous connecter",
      txtHeader: "Informations",
      data: <SessionData />,
      resetButton: []
    };
    this.deselection = this.deselection.bind(this);
    this.updateInfoPannel = this.updateInfoPannel.bind(this);
  }

  deselection() {
    this.setState({data: <SessionData />, resetButton: []})
  }

  updateInfoPannel(data){
    selectedLabArrayInfo = data
    this.setState({data: <InfoData />, resetButton: <Button
      text="Réinitialiser la sélection"
      style="btn btn-block btn-danger btn-cancel"
      action={this.deselection}
    />})
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
              {this.state.resetButton}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPannel;
