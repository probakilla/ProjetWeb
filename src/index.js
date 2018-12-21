import React from "react";
import display from "./jsx/display";
import HomeNavbar from "./jsx/navbar";
import WorldMap from "./jsx/map";
import BrandButton from "./jsx/button";
import ConnectionForm from "./jsx/form"

function redirectionConnection() {
  location.href = "connection.html";
}

display(
  <HomeNavbar
    brandName="Page d'accueil"
    rightBtn={<BrandButton text="bonjour" action={redirectionConnection} />}
  />,
  "navbar-container"
);

display(<WorldMap />, "map-col");

display(<ConnectionForm />, "form-col")