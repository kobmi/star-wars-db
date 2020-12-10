import React, { Component } from "react";

import "./person-details.css";
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button";
export default class PersonDetails extends Component {
  swapi = new SwapiService();
  state = {
    item: null,
  };

  componentDidMount() {
    this.updatePerson();
    console.log("mount item");
  }
  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }
    this.swapi.getPerson(itemId).then((item) => {
      this.setState({ item });
    });
  }

  render() {
    if (!this.state.item) {
      return <span>Please select item</span>;
    }
    const { birthYear, eyeColor, gender, name, id } = this.state.item;
    return (
      <div className="person-details card">
        <img
          className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="character"
        />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}
