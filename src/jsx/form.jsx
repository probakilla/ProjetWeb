import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/connection.css";

class Form extends Component {
  static get propTypes() {
    return {
      buttons: PropTypes.element,
      forms: PropTypes.element,
      style: PropTypes.string,
      cardTitle: PropTypes.string
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      buttons: props.buttons,
      forms: props.forms,
      style: props.style,
      cardTitle: props.cardTitle
    };
    this.render = this.render.bind(this);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className={"card top-space " + this.state.style}>
          <div className="card-body">
            <div className="card-header">{this.state.cardTitle}</div>
            {this.state.forms}
            {this.state.buttons}
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
