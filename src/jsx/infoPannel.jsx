import React, { Component } from "react";
import { Button } from "./button";
import UserSession from "../js/userSession";
import "../css/infoPannel.css";

const titleIndex = 0
const releasedDateIndex = 1
const collaboratorsIndex = 2
let selectInfoArray

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
        Collaborations entre: {UserSession.getLabs()} et {selectInfoArray[0]}:
      </strong>
    </div>)
    for (let i = 1; i < selectInfoArray.length; ++i)
    {
      let stringCollaborators = "";
      for (let j = 0; j < selectInfoArray[i][releasedDateIndex+1].length; ++j)
      {
        stringCollaborators += "[" + selectInfoArray[i][collaboratorsIndex][j] + "] ";
      }
      infoLab.push(
        <div key={i} className="container">
        <p className="collab-info">
          Nom de l&apos;article : {selectInfoArray[i][titleIndex]} <br />
          Date de sortie : {selectInfoArray[i][releasedDateIndex]} <br />
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
      data: <SessionData />
    };
    this.deselection = this.deselection.bind(this);
    this.updateInfoPannel = this.updateInfoPannel.bind(this);
  }

  deselection() {
    this.setState({data: <SessionData />})
  }

  updateInfoPannel(data){
    selectInfoArray = data
    this.setState({data: <InfoData />})
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
              text="Réinitialiser le filtre"
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
