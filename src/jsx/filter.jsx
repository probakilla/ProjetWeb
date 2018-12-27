import React, { Component } from "react";
import { TextInput } from "./input";

class Filters extends Component {
  constructor() {
    super();
    this.state = {
      labelFrom: "Depuis...",
      labelTo: "Jusqu'à..."
    };
  }

  render() {
    return (
      <form>
        <TextInput id="since-date" type="number" labelText="Depuis..." />
        <hr></hr>
        <div className="row bot-spacing">
          <div className="col">
            <label htmlFor="from-date">{this.state.labelFrom}</label>
            <input id="from-date" type="number" className="form-control" />
          </div>
          <div className="col">
            <label htmlFor="to-date">{this.state.labelTo}</label>
            <input id="to-date" type="number" className="form-control" />
          </div>
        </div>
        <hr></hr>
        <TextInput id="team-filter" type="text" labelText="Filtre d'équipe" />
        <hr></hr>
        <label htmlFor="continent-filter">
          Continent
        </label>

        <select id="continent-filter" className="custom-select">
          <option value>Europe</option>
          <option value>Asie</option>
          <option value>Amérique du nord</option>
          <option value>Amérique du sud</option>
          <option value>Afrique</option>
          <option value>Océanie</option>
          <option value>Antartique</option>
        </select>
      </form>
    );
  }
}

export default Filters;
