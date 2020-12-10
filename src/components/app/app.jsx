import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";

import "./app.css";
import PeoplePage from "../people-page";

class App extends Component {
  state = {
    showRandomPlanet: true,
    hasError: false,
  };

  componentDidCatch() {
    console.log("didCatch");
    this.setState({ hasError: true });
  }
  toogleShowRandomPlanet = () => {
    this.setState((prevState) => {
      return {
        showRandomPlanet: !prevState.showRandomPlanet,
      };
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    const { showPlanet } = this.state;
    const buttonTitle = showPlanet
      ? "Hide Random planet"
      : "Show Random Planet";
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    return (
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
          <PeoplePage />
          <PeoplePage />
        </div>
      </div>
    );
  }
}

export default App;
