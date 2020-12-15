import React from "react";

import ItemList from "../item-list";
import { withData } from "../hoc-helpers";
import SwapiService from "../../services/swapi-service";

const swapi = new SwapiService();
const { getAllPeople, getAllStarships, getAllPlanets } = swapi;

const withChildFunction = (Wrapped, func) => {
    return (props) => {
        return <Wrapped {...props}>{func}</Wrapped>;
    };
};

const renderName = ({ name }) => <span>{name}</span>;
const renderNameAndModel = ({ name, model }) => (
    <span>
        {name} ({model})
    </span>
);

const PersonList = withData(
    withChildFunction(ItemList, renderName),
    getAllPeople
);
const PlanetList = withData(
    withChildFunction(ItemList, renderName),
    getAllPlanets
);
const StarshipList = withData(
    withChildFunction(ItemList, renderNameAndModel),
    getAllStarships
);

export { PersonList, PlanetList, StarshipList };
