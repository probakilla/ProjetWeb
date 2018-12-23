import React from "react";
import display from "./jsx/display";
import HomeNavbar from "./jsx/navbar";
import WorldMap from "./jsx/map";
import Button from "./jsx/button";
import ConnectionForm from "./jsx/form";
import "./css/button.css"

function redirectionConnection() {
  location.href = "connection.html";
}

display(
  <HomeNavbar
    brandName="Page d'accueil"
    rightBtn={
      <Button
        text="Connection"
        action={redirectionConnection}
        style="btn btn-link white-link"
      />
    }
  />,
  "navbar-container"
);

display(<WorldMap />, "map-col");
display(<ConnectionForm />, "form-col");