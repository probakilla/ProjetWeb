import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import UserSession from "../js/userSession";
import Main from "../index";
import RequestHal from "../js/requestsHal";
import PropTypes from "prop-types";
import "../css/map.css";
import display from "./display";

const latIndex = 0;
const lngIndex = 1;
const labNameIndex = 2;
const titleIndex = 0;
const releasedDateIndex = 1;
const collaboratorsIndex = 2;

class LabList extends Component {
  static get propTypes() {
    return {
      list: PropTypes.arrayOf(PropTypes.string)
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      list: props.list
    };
  }

  render() {
    return (
      <ul>
        {this.state.list.map(element => {
          return <li key={element.toString()}>{element}</li>;
        })}
      </ul>
    );
  }
}

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latlng: {
        lat: 44.87067,
        lng: -0.63931
      },
      zoom: 2,
      length: 4,
      labArray: []
    };
    this.updateArray = this.updateArray.bind(this);
    this.clearMarker = this.clearMarker.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.listLabs = this.listLabs.bind(this);
  }

  updateArray(array) {
    this.clearMarker();
    if (array.length === 0) alert("Recherche infructueuse");
    this.setState({ labArray: array });
    this.listLabs(array);
  }

  listLabs(array) {
    let labs = [];
    array.forEach(element => {
      let line = JSON.stringify(element).split(",");
      let lab = line[line.length - 1].replace('"]', "").replace('"', "");
      if (!labs.includes(lab)) labs.push(lab);
    });
    display(<LabList list={labs} />, "lab-list");
  }

  clearMarker() {
    this.setState({ labArray: [] });
  }

  onMarkerClick(e) {
    let array = [];
    let collabArray = RequestHal.getCollabInfoArray();
    array.push(this.state.labArray[e.target.options.id][labNameIndex]);
    for (let i = 0; i < collabArray.length; ++i) {
      for (let j = 0; j < collabArray[i][labNameIndex].length; ++j) {
        if (
          this.state.labArray[e.target.options.id][labNameIndex] ==
          collabArray[i][labNameIndex][j]
        ) {
          array.push([
            collabArray[i][titleIndex],
            collabArray[i][releasedDateIndex],
            collabArray[i][collaboratorsIndex]
          ]);
          // Avoid redundancy because sometime a lab is twice in the hal api
          break;
        }
      }
    }
    Main.updateInfoPannel(array);
  }

  render() {
    let listMarker = [];
    const iconMarkup = renderToStaticMarkup(
      <i className=" fa fa-map-marker-alt fa-3x" />
    );
    const customMarkerIcon = divIcon({
      html: iconMarkup,
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });
    for (let i = 0; i < this.state.labArray.length; ++i) {
      if (
        UserSession.getLabs().toUpperCase() ===
        this.state.labArray[i][labNameIndex].toUpperCase()
      ) {
        listMarker.push(
          <Marker
            key={i}
            id={i}
            position={[
              this.state.labArray[i][latIndex],
              this.state.labArray[i][lngIndex]
            ]}
            icon={customMarkerIcon}
            onclick={this.onMarkerClick}
          >
            <Popup>{this.state.labArray[i][labNameIndex]}</Popup>
          </Marker>
        );
      } else {
        listMarker.push(
          <Marker
            key={i}
            id={i}
            position={[
              this.state.labArray[i][latIndex],
              this.state.labArray[i][lngIndex]
            ]}
            onclick={this.onMarkerClick}
          >
            <Popup>{this.state.labArray[i][labNameIndex]}</Popup>
          </Marker>
        );
      }
    }
    return (
      <div id="main-wrap">
        <Map
          center={this.state.latlng}
          length={this.state.length}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {listMarker}
        </Map>
      </div>
    );
  }
}

export default WorldMap;
