export default class SwapiService {
    _apiBase = "https://swapi.dev/api";
    _imgBase = "https://starwars-visualguide.com/assets/img";

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    getAllPeople = async () => {
        const res = await this.getResource(`/people/`);
        return res.results.map((item) => this._transformPerson(item));
    };

    getPerson = async (id) => {
        const res = await this.getResource(`/people/${id}/`);
        return this._transformPerson(res);
    };

    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`);
        return res.results.map((item) => this._transformPlanet(item));
    };

    getPlanet = async (id) => {
        const res = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(res);
    };

    getAllStarships = async () => {
        const res = await this.getResource(`/starships/?page=2`);
        return res.results.map((item) => this._transformStarship(item));
    };

    getStarship = async (id) => {
        const res = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(res);
    };

    getPlanetImage = ({ id }) => {
        return `${this._imgBase}/planets/${id}.jpg`;
    };
    getStarshipImage = ({ id }) => {
        return `${this._imgBase}/starships/${id}.jpg`;
    };
    getPersonImage = ({ id }) => {
        return `${this._imgBase}/characters/${id}.jpg`;
    };

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }
    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter,
        };
    };
    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity,
        };
    };
    _transformPerson(person) {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color,
        };
    }
}
