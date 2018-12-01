import React, { Component } from "react";
import ReactDOM from "react-dom";

class HelloWorld extends Component {
  constructor() {
    super();
    this.state = {
      text: "loul"
    };

    this.render = this.render.bind(this)
  }
  render() {
    return <div id="hello_world" value="Hello World!">{this.text}</div>;
  }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<HelloWorld />, wrapper) : false;

export default HelloWorld;
