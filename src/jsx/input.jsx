import React, { Component } from "react";
import PropTypes from "prop-types";

class TextInput extends Component {
  static get propTypes() {
    return {
      id: PropTypes.string,
      type: PropTypes.string,
      name: PropTypes.string,
      onChange: PropTypes.func,
      labelText: PropTypes.string,
      placeholder: PropTypes.string
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      inputType: props.type,
      onChange: props.onChange,
      labelText: props.labelText
    };
  }

  render() {
    return (
      <div className="col-auto">
        <label htmlFor={this.state.id}>{this.state.labelText}</label>
        <input
          id={this.state.id}
          type={this.state.inputType}
          name={this.state.name}
          className="form-control"
          onChange={this.state.onChange}
        />
      </div>
    );
  }
}

export { TextInput };
