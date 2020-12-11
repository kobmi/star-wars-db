import React, { Component } from "react";

import ItemList from "../item-list";
import PersonDetails from "../person-details";
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
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapi.getAllPeople}
        renderItem={(item) => `${item.name} (${item.gender} ${item.birthYear})`}
      />
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails itemId={this.state.selectedPerson} />
      </ErrorBoundry>
    );
    return <RowBlock left={itemList} right={personDetails} />;
  }
}
