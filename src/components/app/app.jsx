import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";

import "./app.css";
import PeoplePage from "../people-page";

class App extends Component {
    swapi = new SwapiService();
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
                    <div className="row mb2">
                        <div className="col-md-6">
                            <ItemList
                                onItemSelected={this.onPersonSelected}
                                getData={this.swapi.getAllPlanets}
                                renderItem={(item) => item.name}
                            />
                        </div>
                        <div className="col-md-6">
                            <PersonDetails itemId={this.state.selectedPerson} />
                        </div>
                    </div>
                    <div className="row mb2">
                        <div className="col-md-6">
                            <ItemList
                                onItemSelected={this.onPersonSelected}
                                getData={this.swapi.getAllStarships}
                                renderItem={(item) => item.name}
                            />
                        </div>
                        <div className="col-md-6">
                            <PersonDetails itemId={this.state.selectedPerson} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
