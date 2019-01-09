import React from "react";
import display from "./jsx/display";
import HomeNavbar from "./jsx/navbar";
import WorldMap from "./jsx/map";
import Filters from "./jsx/filter";
import InfoPannel from "./jsx/infoPannel";
import Form from "./jsx/form";
import requestsHal from "./js/requestsHal";
import UserSession from "./js/userSession";
import "./css/button.css";
import "./css/filter.css";
import "./css/connection.css";
import "./css/map.css";


require("babel-polyfill");

// Display all lab in the WorldMap
const dispMarker = async function() {
  const labArray = await requestsHal.fetchLabCollab(UserSession.getLabs());
  updateMap(labArray)
};

const updateInfoPannel = function(array){
  infopannel.updateInfoPannel(array);
}

const updateMap = function(labArray) {
  worldmap.updateArray(labArray);
}

// Will contain a reference to the WorldMap
let worldmap;
let infopannel;

display(<HomeNavbar />, "navbar-container");

display(<WorldMap ref={c => (worldmap = c)} />, "map-col");

dispMarker();

display(<Form register={true} />, "register-col");
display(<Form register={false} />, "connection-col");

display(<Filters />, "filters-col");
display(<InfoPannel ref={c => (infopannel = c)} />, "info-pannel");

export default {
  updateInfoPannel: updateInfoPannel,
  updateMap: updateMap
}