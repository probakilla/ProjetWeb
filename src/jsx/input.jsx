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
      labelText: props.labelText,
      placeholder: props.placeholder
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
          placeholder={this.state.placeholder}
        />
      </div>
    );
  }
}

export default TextInput;