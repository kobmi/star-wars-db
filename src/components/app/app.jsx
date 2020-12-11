import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";

import ErrorButton from "../error-button";
import ErrorBoundry from "../error-boundry";

import SwapiService from "../../services/swapi-service";

import "./app.css";

class App extends Component {
  swapi = new SwapiService();
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
    const { showPlanet } = this.state;
    const buttonTitle = showPlanet
      ? "Hide Random planet"
      : "Show Random Planet";
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    return (
      <ErrorBoundry>
        <div className="container">
          <div className="stardb-app">
            <Header />
            {planet}
            <div className="row mb2 button-row">
              <button
                className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toogleShowRandomPlanet}
              >
                {buttonTitle}
              </button>
              <ErrorButton />
            </div>
            <PeoplePage />
          </div>
        </div>
      </ErrorBoundry>
    );
  }
}

export default App;
