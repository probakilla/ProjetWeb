import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "./button";
import "../css/infoPannel.css";

class InfoPannel extends Component {
  static get propTypes() {
    return {
      infotext: PropTypes.string
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      infotext: props.infotext,
      txtHeader : "Informations"
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
            <span className="info-text">{this.state.infotext}</span>
            <br />
            <Button
              text="Déselection"
              style="btn btn-danger btn-cancel"
              action={this.deselection}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPannel;
