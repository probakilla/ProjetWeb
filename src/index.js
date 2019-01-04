import React from "react";
import display from "./jsx/display";
import HomeNavbar from "./jsx/navbar";
import WorldMap from "./jsx/map";
import Form from "./jsx/form";
import Filters from "./jsx/filter";
import InfoPannel from "./jsx/infoPannel";
import Message from "./jsx/jumbotron";
import { Button } from "./jsx/button";
import "./css/button.css";
import "./css/filter.css";
import "./css/connection.css";
import fetchAllLabs from "./server/requestsHal.js"
require('babel-polyfill');

// Display all lab in the WorldMap
const dispMarker = async function() {
  const test = await fetchAllLabs();
  worldmap.updateArray(test);
}

// Will contain a reference to the WorldMap
let worldmap;

function redirectionConnection() {
  location.href = "connection.html";
}

function regirectionRegister() {
  location.href = "register.html";
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

const infoText = "Veuillez choisir un laboratoire.";

display(
  <HomeNavbar brandName="Page d'accueil" rightBtn={registerButtons} />,
  "navbar-container"
);

display(
  <Message
  header={"name ?"}
  text="Vous etes désormais enregistré sur ce site !"
/>, "message-col"
)

display(<WorldMap ref={(c) => worldmap = c}/>, "map-col");

dispMarker();

display(
  <Form forms={<Filters />} cardTitle="Filters" style="text-white bg-dark" />,
  "filters-col"
);

display(<InfoPannel infotext={infoText} />, "info-pannel");