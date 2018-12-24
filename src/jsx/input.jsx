import React, { Component } from "react";
import PropTypes from "prop-types";

class TextInput extends Component {
  static get propTypes() {
    return {
      id: PropTypes.string,
      type: PropTypes.string,
      labelText: PropTypes.string,
      placeholder: PropTypes.string
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      inputType: props.type,
      labelText: props.labelText
    };
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.state.id}>{this.state.labelText}</label>
        <input
          id={this.state.id}
          type={this.state.inputType}
          className="form-control"
        />
      </div>
    );
  }
}

class ConnectionInputs extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form>
        <TextInput
          id="connection-username"
          type="text"
          labelText="Nom d'utilisateur"
        />
        <TextInput
          id="connection-password"
          type="password"
          labelText="Mot de passe"
        />
      </form>
    );
  }
}

class RegisterInput extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form>
        <TextInput
          id="register-username"
          type="text"
          labelText="Nom d'utilisateur"
        />
        <TextInput
          id="register-password"
          type="password"
          labelText="Mot de passe"
        />
        <TextInput id="register-lab" type="text" labelText="Nom du laboratoire" />
        <TextInput
          id="register-team"
          type="text"
          labelText="Nom de l'équipe de recherche"
        />
      </form>
    );
  }
}

export { TextInput, ConnectionInputs, RegisterInput };
