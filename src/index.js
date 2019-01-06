import React from "react";
import display from "./jsx/display";
import HomeNavbar from "./jsx/navbar";
import WorldMap from "./jsx/map";
import Filters from "./jsx/filter";
import InfoPannel from "./jsx/infoPannel";
import Form from "./jsx/form";
import "./css/button.css";
import "./css/filter.css";
import "./css/connection.css";
import "./css/map.css";
import requestsHal from "./js/requestsHal";

require("babel-polyfill");

// Display all lab in the WorldMap
const dispMarker = async function() {
  const test = await requestsHal.fetchAllLabs();
  worldmap.updateArray(test);
};

// Will contain a reference to the WorldMap
let worldmap;


const infoText = "Veuillez choisir un laboratoire.";

display(<HomeNavbar />, "navbar-container");

display(<WorldMap ref={c => (worldmap = c)} />, "map-col");

dispMarker();

display(<Form register={true} />, "register-col");
display(<Form register={false} />, "connection-col");

display(<Filters />, "filters-col");
display(<InfoPannel infotext={infoText} />, "info-pannel");
