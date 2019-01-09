import React, { Component } from "react";
import RequestsHal from "../js/requestsHal";
import Main from "../index";
import UserSession from "../js/userSession";
import {
  SingleInputForm,
  DoubleInputForm,
  SingleSelectInputForm
} from "./input";

const SINCE_ID = "since-date";
const FROM_ID = "from-date";
const TO_ID = "to-date";
const COUNTY_ID = "country-filter";

function getInputValue(id) {
  return document.getElementById(id).value;
}
class Filters extends Component {
  constructor() {
    super();
    this.state = {
      labelFrom: "Depuis...",
      labelTo: "Jusqu'à...",
      txtHeader: "Filtres"
    };
    this.sinceFilter = this.sinceFilter.bind(this);
    this.timeSlotFilter = this.timeSlotFilter.bind(this);
    this.countryFilter = this.countryFilter.bind(this);
  }

  sinceFilter = async function() {
    if (!UserSession.exists())
    {
      alert("Veuillez vous connecter");
      return;
    }
    let since = getInputValue(SINCE_ID);
    if (since === "")
    {
      alert("Veuillez entrez une valeur avant de confirmer le filtre");
      return;
    }
    let labArray = await RequestsHal.fetchCollabsByDate(UserSession.getLabs(), since);
    Main.updateMap(labArray);
  }

  timeSlotFilter = async function() {
    if (!UserSession.exists())
    {
      alert("Veuillez vous connecter");
      return;
    }
    const from = getInputValue(FROM_ID);
    const to = getInputValue(TO_ID);
    if (from === "" || to == "")
    {
      alert("Veuillez entrez une valeur avant de confirmer le filtre");
      return;
    }
    let labArray = await RequestsHal.fetchCollabsByDate(UserSession.getLabs(), from, to);
    Main.updateMap(labArray);
  }

  countryFilter = async function () {
    if (!UserSession.exists())
    {
      alert("Veuillez vous connecter");
      return;
    }
    let labArray = await RequestsHal.fetchCollabByCountry(UserSession.getLabs(), getInputValue(COUNTY_ID));
    Main.updateMap(labArray);
  }

  render() {
    return (
      <div className="container">
        <div className="card bg-dark text-white">
          <div className="card-body">
            <div className="card-header">{this.state.txtHeader}</div>
            <SingleInputForm
              id={SINCE_ID}
              type="number"
              label="Depuis"
              onClick={this.sinceFilter}
            />
            <hr />
            <DoubleInputForm
              idFrom={FROM_ID}
              idTo={TO_ID}
              label="Plage d'année"
              onClick={this.timeSlotFilter}
            />
            <hr />
            <SingleSelectInputForm
              id={COUNTY_ID}
              label="Filtre de pays"
              onClick={this.countryFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;
