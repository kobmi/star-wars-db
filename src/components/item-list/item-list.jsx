import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

import "./item-list.css";

export default class ItemList extends Component {
  swapi = new SwapiService();
  state = {
    itemList: [],
  };

  componentDidMount() {
    this.swapi.getAllPeople().then((itemList) => {
      this.setState({ itemList });
    });
  }

  render() {
    const { itemList } = this.state;
    const items = itemList.map(({ id, name }) => (
      <li key={id} className="list-group-item">
        {name}
      </li>
    ));
    return <ul className="item-list list-group">{items}</ul>;
  }
}
