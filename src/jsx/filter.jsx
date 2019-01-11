import React, { Component } from "react";
import RequestsHal from "../js/requestsHal";
import Main from "../index";
import UserSession from "../js/userSession";
import "../css/filter.css";
import {
  SingleInputForm,
  DoubleInputForm,
  SingleSelectInputForm
} from "./input";

const SINCE_ID = "since-date";
const FROM_ID = "from-date";
const TO_ID = "to-date";
const COUNTY_ID = "country-filter";
const LAB_ID = "lab-filter";
const MAX_DATE = new Date().getFullYear();

function getInputValue(id) {
  return document.getElementById(id).value;
}
class Filters extends Component {
  constructor() {
    super();
    this.state = {
      txtHeader: "Filtres",
      minDate: null
    };
    this.timeSlotFilter = this.timeSlotFilter.bind(this);
    this.render = this.render.bind(this);
  }

  componentDidMount = async function() {
    if (UserSession.exists()) {
      let minDate = await RequestsHal.fetchMinCollabDateLab(
        UserSession.getLabs()
      );
      this.setState({ minDate: minDate });
    }
  };

  doubleDateCheck() {
    let minDate = this.state.minDate;
    const from = getInputValue(FROM_ID);
    const to = getInputValue(TO_ID);
    const from_input = document.getElementById(FROM_ID);
    const to_input = document.getElementById(TO_ID);
    if (to === from && from > minDate) {
      from_input.value = to - 1;
    } else if (to === from && to < MAX_DATE) {
      to_input.value = from + 1;
    } else if (to < from && to - 1 >= minDate) {
      from_input.value = to - 1;
    } else if (to < from && from + 1 <= MAX_DATE) {
      to_input.value = from + 1;
    }
  }

  labFilter = async function() {
    if (!UserSession.exists()) {
      alert("Veuillez vous connecter");
      return;
    }
    let labName = getInputValue(LAB_ID);
    if (labName === "") {
      alert("Veuillez entrez une valeur avant de confirmer le filtre");
      return;
    }
    if (!(await RequestsHal.checkLabExists(labName))) {
      alert("Le laboratoire entré n'éxiste pas");
      return;
    }
    let labArray = await RequestsHal.fetchCollabBetweenLab(
      UserSession.getLabs(),
      labName
    );
    Main.updateMap(labArray);
  };

  sinceFilter = async function() {
    if (!UserSession.exists()) {
      alert("Veuillez vous connecter");
      return;
    }
    let since = getInputValue(SINCE_ID);
    if (since === "") {
      alert("Veuillez entrez une valeur avant de confirmer le filtre");
      return;
    }
    let labArray = await RequestsHal.fetchCollabsByDate(
      UserSession.getLabs(),
      since
    );
    Main.updateMap(labArray);
  };

  timeSlotFilter = async function() {
    if (!UserSession.exists()) {
      alert("Veuillez vous connecter");
      return;
    }
    const from = getInputValue(FROM_ID);
    const to = getInputValue(TO_ID);
    if (from === "" || to == "") {
      alert("Veuillez entrez une valeur avant de confirmer le filtre");
      return;
    }
    let labArray = await RequestsHal.fetchCollabsByDate(
      UserSession.getLabs(),
      from,
      to
    );
    Main.updateMap(labArray);
  };

  countryFilter = async function() {
    if (!UserSession.exists()) {
      alert("Veuillez vous connecter");
      return;
    }
    let country = getInputValue(COUNTY_ID);
    if (country === "") {
      alert("Veuillez entrez une valeur avant de confirmer le filtre");
      return;
    }
    let labArray = await RequestsHal.fetchCollabByCountry(
      UserSession.getLabs(),
      country
    );
    Main.updateMap(labArray);
  };

  render() {
    let minDate = this.state.minDate;
    let sinceInput = [];
    let doubleInput = [];
    if (minDate != null) {
      sinceInput.push(
        <SingleInputForm
          id={SINCE_ID}
          type="number"
          label="Depuis"
          onClick={this.sinceFilter}
          min={minDate}
          max={MAX_DATE}
        />
      );
      doubleInput.push(
        <DoubleInputForm
          idFrom={FROM_ID}
          idTo={TO_ID}
          label="Plage d'année"
          onClick={this.timeSlotFilter}
          min={minDate}
          max={MAX_DATE}
          onChange={this.doubleDateCheck}
        />
      );
    }
    return (
      <div className="container">
        <div className="card bg-dark text-white">
          <div className="card-body">
            <div className="card-header">
              {UserSession.exists()
                ? this.state.txtHeader
                : "Connexion requise"}
            </div>
            {UserSession.exists() ? (
              <div>
                {sinceInput}
                <hr />
                <SingleInputForm
                  id={LAB_ID}
                  type="text"
                  label="Laboratoire"
                  onClick={this.labFilter}
                  defaultValue={
                    UserSession.exists()
                      ? UserSession.getLabs()
                      : "Aucun laboratoire séléctionné"
                  }
                />
                <hr />
                {doubleInput}
                <hr />
                <SingleSelectInputForm
                  id={COUNTY_ID}
                  label="Filtre de pays"
                  onClick={this.countryFilter}
                />
              </div>
            ) : (
              <p className="container connection-text">
                Filtres non disponibles hors connexion
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;
