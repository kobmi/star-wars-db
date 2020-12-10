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
        const { getData } = this.props;
        getData().then((itemList) => {
            this.setState({ itemList, loading: false });
        });
    }

    renderItems = (arr) => {
        return arr.map((item) => {
            const { id } = item;
            const label = this.props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                >
                    {label}
                </li>
            );
        });
    };

    render() {
        const { itemList, loading } = this.state;
        const content = (
            <ul className="item-list list-group">
                {this.renderItems(itemList)}
            </ul>
        );
        return loading ? <Spinner /> : content;
    }
}
