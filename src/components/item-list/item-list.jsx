import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

import "./item-list.css";

export default class ItemList extends Component {
    swapi = new SwapiService();
    state = {
        itemList: [],
        loading: true,
    };

    componentDidMount() {
        this.swapi.getAllPeople().then((itemList) => {
            this.setState({ itemList, loading: false });
        });
    }

    render() {
        const { itemList, loading } = this.state;
        const { onItemSelected } = this.props;
        const items = itemList.map(({ id, name }) => (
            <li
                key={id}
                className="list-group-item"
                onClick={() => onItemSelected(id)}
            >
                {name}
            </li>
        ));
        const content = <ul className="item-list list-group">{items}</ul>;
        return loading ? <Spinner /> : content;
    }
}
