import React, { Component } from "react";
import ReactModal from "react-modal";
import { RegisterButtons, LogOutButton, ValidButton } from "./button";
import "../css/navbar.css";
import "../css/modal.css";

class HomeNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Page d'accueil",
      goodbye: "",
      showModal: false
    };
    this.logOut = this.logOut.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  sessionExists() {
    return sessionStorage.getItem("username") !== null;
  }

  showModal() {
    this.setState({
      goodbye: "A bientot " + sessionStorage.getItem("username") + "!"
    });
    sessionStorage.clear();
    this.setState({ showModal: true });
  }

  logOut() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-margin">
        <ReactModal
          className="modal-content center-home deconection-modal"
          isOpen={this.state.showModal}
          ariaHideApp={false}
        >
          <p>{this.state.goodbye}</p> <br />{" "}
          {<ValidButton action={this.logOut} />}
        </ReactModal>
        <a className="navbar-brand" href="#">
          {this.sessionExists()
            ? sessionStorage.getItem("username")
            : this.state.brand}
        </a>
        <span className="navbar-text ml-auto">
          {this.sessionExists() ? (
            <LogOutButton action={this.showModal} />
          ) : (
            <RegisterButtons />
          )}
        </span>
      </nav>
    );
  }
}

export default HomeNavbar;
