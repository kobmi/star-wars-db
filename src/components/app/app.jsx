import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";

import "./app.css";

class App extends Component {
  state = {
    showRandomPlanet: true,
  };

  toogleShowRandomPlanet = () => {
    this.setState((prevState) => {
      return {
        showRandomPlanet: !prevState.showRandomPlanet,
      };
    });
  };
  render() {
    const showPlanet = this.state.showRandomPlanet;
    const buttonTitle = showPlanet
      ? "Hide Random planet"
      : "Show Random Planet";
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    return (
      <div className="app">
        <Header />
        {planet}
        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toogleShowRandomPlanet}
        >
          {buttonTitle}
        </button>
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList />
          </div>
          <div className="col-md-6">
            <PersonDetails />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
