import React from "react"
import display from "./jsx/display"
import HomeNavbar from "./jsx/navbar"
import WorldMap from "./jsx/map";

display(<HomeNavbar brandName="Page d'accueil"/>, "navbar-container");
display(<WorldMap />, "map-col")