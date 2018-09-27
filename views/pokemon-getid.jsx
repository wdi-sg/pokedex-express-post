var React = require('react');

class PokemonGetId extends React.Component {
  render() {
    return (
    <html>
    <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
    </head>
    <body>
      <div class="container">
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
      </body></html>
    );
  }
}

module.exports = PokemonGetId;