import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";
import { SwapiServiceProvider } from "../swapi-service-context";

import "./app.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { StarshipDetails } from "../sw-components";

export default class App extends Component {
    state = {
        swapiService: new SwapiService(),
        // showRandomPlanet: true,
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            const Service =
                swapiService instanceof SwapiService
                    ? DummySwapiService
                    : SwapiService;
            return {
                swapiService: new Service(),
            };
        });
    };

    render() {
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="container">
                            <div className="stardb-app">
                                <Header
                                    onServiceChange={this.onServiceChange}
                                />
                                <RandomPlanet />
                                <Route
                                    path="/"
                                    exact
                                    render={() => <h2>Welcome to StarDB</h2>}
                                />
                                <Route
                                    path="/people/:id?"
                                    component={PeoplePage}
                                />
                                <Route
                                    path="/planets/"
                                    component={PlanetsPage}
                                    exact
                                />
                                <Route
                                    path="/starships"
                                    exact
                                    component={StarshipsPage}
                                />
                                <Route
                                    path="/starships/:id"
                                    render={({ match, history, location }) => {
                                        const { id } = match.params;

                                        return <StarshipDetails itemId={id} />;
                                    }}
                                />
                            </div>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
