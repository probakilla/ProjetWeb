import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/connection.css";

class FormUser extends Component {
  static get propTypes() {
    return {
      buttons: PropTypes.element,
      forms: PropTypes.element,
      cardTitle: PropTypes.string
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      buttons: props.buttons,
      forms: props.forms,
      cardTitle: props.cardTitle
    };
  }

  render() {
    return (
      <div className="container">
        <div className="card top-space">
          <div className="card-body">
            <h5 className="card-title center-text">{this.state.cardTitle}</h5>
            {this.state.forms}
            {this.state.buttons}
          </div>
        </div>
      </div>
    );
  }
}

export { FormUser };
