var React = require('react');

class PokemonGetId extends React.Component {
  render() {
    return (
      <div>
      <h1>{this.props.pokemon.name}</h1>
      <img src={this.props.pokemon.img}/>
      <p>Weight: {this.props.pokemon.weight}</p>
      <p>Height: {this.props.pokemon.height}</p>
      <p>Candy: {this.props.pokemon.candy}</p>
      <p>Candy Count: {this.props.pokemon.candy_count}</p>
      <p>Egg: {this.props.pokemon.egg}</p>
      <p>Average Spawns: {this.props.pokemon.avg_spawns}</p>
      <p>Spawn Time: {this.props.pokemon.spawn_time}</p>
      </div>
    );
  }
}

module.exports = PokemonGetId;