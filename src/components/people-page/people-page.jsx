import React, { Component } from "react";

import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import "./people-page.css";
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends Component {
    swapi = new SwapiService();
    state = {
        selectedPerson: null,
        hasError: false,
    };

    componentDidCatch() {
        debugger;
        this.setState({ hasError: true });
    }
    onPersonSelected = (id) => {
        this.setState({ selectedPerson: id });
    };
    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }
        return (
            <div>
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapi.getAllPeople}
                            renderItem={(item) =>
                                `${item.name} (${item.gender} ${item.birthYear})`
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails itemId={this.state.selectedPerson} />
                    </div>
                </div>
            </div>
        );
    }
}
