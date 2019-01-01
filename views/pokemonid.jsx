const React = require('react');

class Pokemonid extends React.Component {

    render() {

        let buttonUrl = "/" + this.props.params + "/edit"

        return(

            <div>
                <h2>Id: {this.props.foundPokemon.id}</h2>
                <h2>Num: {this.props.foundPokemon.num}</h2>
                <h2>Name: {this.props.foundPokemon.name}</h2>
                <img src={this.props.foundPokemon.img} />
                <h2>Height: {this.props.foundPokemon.height}</h2>
                <h2>Weight: {this.props.foundPokemon.weight}</h2>
                <h2>Candy: {this.props.foundPokemon.candy}</h2>
                <h2>Candy Count: {this.props.foundPokemon.candy_count}</h2>
                <h2>Egg: {this.props.foundPokemon.egg}</h2>
                <h2>Average Spawns: {this.props.foundPokemon.avg_spawns}</h2>
                <h2>Spawn Time: {this.props.foundPokemon.spawn_time}</h2>
                <a href={buttonUrl}><button>Edit</button></a>
            </div>
    )};
};

module.exports = Pokemonid;