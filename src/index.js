import React from "react";
import display from "./jsx/display";
import HomeNavbar from "./jsx/navbar";
import WorldMap from "./jsx/map";
import BrandButton from "./jsx/button";


function sayHi() {
    alert("Hi !")
}

display(
  <HomeNavbar
    brandName="Page d'accueil"
    rightBtn={<BrandButton text="bonjour" action={sayHi}/>}
  />,
  "navbar-container"
);

display(<WorldMap />, "map-col");
