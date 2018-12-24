import React from "react";
import display from "./jsx/display";
import HomeNavbar from "./jsx/navbar";
import WorldMap from "./jsx/map";
import Button from "./jsx/button";
import { ConnectionInputs, InformationInputs } from "./jsx/input";
import { FormUser } from "./jsx/form";
import "./css/button.css";

function redirectionConnection() {
  location.href = "connection.html";
}

function regirectionRegister() {
  location.href = "register.html";
}

function goBackHome() {
  location.href = "index.html";
}

function connect() {
  alert("Not implemented yet!");
}

const registerButtons = (
  <div className="container">
    <Button
      text="Connection"
      action={redirectionConnection}
      style="btn btn-link white-link"
    />
    <Button
      text="Enregistrement"
      action={regirectionRegister}
      style="btn btn-link white-link"
    />
  </div>
);

const FormButtons = (
  <div className="container">
    <Button text="Envoi" action={connect} style="btn btn-primary" />
    <Button
      text="Retour"
      action={goBackHome}
      style="btn btn-danger left-spacing"
    />
  </div>
);

display(
  <HomeNavbar brandName="Page d'accueil" rightBtn={registerButtons} />,
  "navbar-container"
);

display(<WorldMap />, "map-col");

display(
  <FormUser
    buttons={FormButtons}
    forms={<ConnectionInputs />}
    cardTitle="Connexion"
  />,
  "connection-col"
);

display(
  <FormUser
    buttons={FormButtons}
    forms={<InformationInputs />}
    cardTitle="Enregistrement"
  />,
  "register-col"
);
