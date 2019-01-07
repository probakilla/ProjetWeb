import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import UserSession from "../js/userSession";
import "../css/map.css";

const latIndex = 0;
const lngIndex = 1;
const labNameIndex = 2;

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
  }

  updateArray(array){
    let that = this;
    that.setState({labArray : array})
  } 

  clearMarker = () => {
    this.setState({labArray : []})
  }

  onMarkerClick = (e) => {
    alert(this.state.labArray[e.target.options.id][labNameIndex]);
  }

  render() {
    let listMarker = [];
    const iconMarkup = renderToStaticMarkup(
      <i className=" fa fa-map-marker-alt fa-3x" />
    );
    const customMarkerIcon = divIcon({
      html: iconMarkup,
      iconSize: [32, 32],
      iconAnchor: [16,32]
    });
    for (let i = 0; i < this.state.labArray.length; ++i)
    {
      if (UserSession.getLabs() == this.state.labArray[i][labNameIndex])
      {
        listMarker.push(<Marker key={i} id={i} position={[this.state.labArray[i][latIndex], this.state.labArray[i][lngIndex]]} icon={customMarkerIcon} onclick={this.onMarkerClick}>
        <Popup>
        {this.state.labArray[i][labNameIndex]}
        </Popup>
      </Marker>)
      }
      else {
        listMarker.push(<Marker key={i} id={i} position={[this.state.labArray[i][latIndex], this.state.labArray[i][lngIndex]]} onclick={this.onMarkerClick}>
          <Popup>
          {this.state.labArray[i][labNameIndex]}
          </Popup>
        </Marker>)
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
