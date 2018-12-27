import React from "react";
import display from "./jsx/display";
import HomeNavbar from "./jsx/navbar";
import WorldMap from "./jsx/map";
import Button from "./jsx/button";
import { ConnectionInputs, RegisterInput } from "./jsx/input";
import Form from "./jsx/form";
import Filters from "./jsx/filter";
import "./css/button.css";
import "./css/filter.css";
import "./css/connection.css";

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
  <div className="d-flex">
      <Button text="Retour" action={goBackHome} style="btn btn-danger" />
      <Button text="Envoi" action={connect} style="btn btn-primary ml-auto" />
  </div>
);

display(
  <HomeNavbar brandName="Page d'accueil" rightBtn={registerButtons} />,
  "navbar-container"
);

display(<WorldMap />, "map-col");

display(
  <Form
    buttons={FormButtons}
    forms={<ConnectionInputs />}
    cardTitle="Connexion"
  />,
  "connection-col"
);

display(
  <Form
    buttons={FormButtons}
    forms={<RegisterInput />}
    cardTitle="Enregistrement"
  />,
  "register-col"
);

display(
  <Form forms={<Filters />} cardTitle="Filters" style="text-white bg-dark" />,
  "filters-col"
);
