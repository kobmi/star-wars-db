import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";

import "./app.css";

class App extends Component {
    state = {
        showRandomPlanet: true,
        selectedItem: null,
    };

    toogleShowRandomPlanet = () => {
        this.setState((prevState) => {
            return {
                showRandomPlanet: !prevState.showRandomPlanet,
            };
        });
    };

    onItemSelected = (id) => {
        this.setState({ selectedItem: id });
    };

    render() {
        const { showPlanet, selectedItem } = this.state;
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
                        <ItemList onItemSelected={this.onItemSelected} />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails itemId={selectedItem} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
