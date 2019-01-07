import React, { Component } from "react";
import { Button } from "./button";
import UserSession from "../js/userSession";
import "../css/infoPannel.css";

const titleIndex = 0
const releasedDateIndex = 1
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
        <p>Votre équipe : {UserSession.getTeams()}</p>
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
      infoLab.push(
        <div key={i} className="container">
        <p className="collab-info">
          Nom de l&apos;article : {selectInfoArray[i][titleIndex]} <br />
          Date de sortie : {selectInfoArray[i][releasedDateIndex]}
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
  }

  deselection() {
    alert("Not inmplemented yet !");
  }

  updateInfoPannel(data){
    let that = this;
    selectInfoArray = data
    that.setState({data: <InfoData />})
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
