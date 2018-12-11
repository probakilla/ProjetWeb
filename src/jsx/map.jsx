import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer } from "react-leaflet";
import "../css/map.css"


class WorldMap extends Component {
  constructor() {
    super();
    this.state = {
      latlng: {
        lat: 44.870670,
        lng: -0.639310
      },
      zoom: 2,
      length: 4
    };
  }
  render() {
    return (
      <div id="main-wrap">
        <Map center={this.state.latlng} 
            length={this.state.length} 
            zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }
}

const wrapper = document.getElementById("map-col");
wrapper ? ReactDOM.render(<WorldMap />, wrapper) : false;

export default WorldMap;
