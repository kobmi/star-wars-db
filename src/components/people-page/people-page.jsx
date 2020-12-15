import React, { Component } from "react";

import ItemList from "../item-list";
import ItemDetails, { Record } from "../item-details";
import RowBlock from "../row-block";
import ErrorBoundry from "../error-boundry";

import "./people-page.css";

import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends Component {
    swapi = new SwapiService();
    state = {
        selectedPerson: null,
    };

    onPersonSelected = (id) => {
        this.setState({ selectedPerson: id });
    };

    render() {
        const { getPerson, getPersonImage, getAllPeople } = this.swapi;
        const { selectedPerson } = this.state;
        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={getAllPeople}
                renderItem={(item) =>
                    `${item.name} (${item.gender} ${item.birthYear})`
                }
            />
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails
                    itemId={selectedPerson}
                    getData={getPerson}
                    getImageUrl={getPersonImage}
                >
                    <Record field="gender" label="Gender" />
                    <Record field="birthYear" label="Birth Year" />
                    <Record field="eyeColor" label="Eye Color" />
                </ItemDetails>
            </ErrorBoundry>
        );
        return <RowBlock left={itemList} right={personDetails} />;
    }
}
