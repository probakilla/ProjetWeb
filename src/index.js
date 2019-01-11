import React from "react";
import Display from "./jsx/display";
import HomeNavbar from "./jsx/navbar";
import WorldMap from "./jsx/map";
import Filters from "./jsx/filter";
import InfoPannel from "./jsx/infoPannel";
import Form from "./jsx/form";
import RequestsHal from "./js/requestsHal";
import UserSession from "./js/userSession";
import "./css/button.css";
import "./css/filter.css";
import "./css/connection.css";
import "./css/map.css";

require("babel-polyfill");

// Display all lab in the WorldMap
const dispMarker = async function() {
  const labArray = await RequestsHal.fetchLabCollab(UserSession.getLabs());
  updateMap(labArray);
};

const updateInfoPannel = function(array) {
  infopannel.updateInfoPannel(array);
};

const updateMap = function(labArray) {
  worldmap.updateArray(labArray);
};

// Will contain a reference to the WorldMap
let worldmap;
let infopannel;

Display(<HomeNavbar />, "navbar-container");

Display(<WorldMap ref={c => (worldmap = c)} />, "map-col");

UserSession.exists() ? dispMarker() : null;

Display(<Form register={true} />, "register-col");
Display(<Form register={false} />, "connection-col");

Display(<Filters />, "filters-col");
Display(<InfoPannel ref={c => (infopannel = c)} />, "info-pannel");

export default {
  updateInfoPannel: updateInfoPannel,
  updateMap: updateMap
};
