import React, { Component } from "react";
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
    this.countryFilter = this.contryFilter.bind(this);
  }

  sinceFilter() {
    alert(getInputValue(SINCE_ID));
  }

  timeSlotFilter() {
    const from = getInputValue(FROM_ID);
    const to = getInputValue(TO_ID);
    alert(from + " " + to);
  }

  contryFilter() {
    alert(getInputValue(COUNTY_ID));
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
              label="Plage horaire"
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
