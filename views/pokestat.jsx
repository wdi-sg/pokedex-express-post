var React = require('react');

class Pokestat extends React.Component {
  render() {
    return (
    <html>
        <header>
          <title> POKEDEX </title>
          <link rel="stylesheet" href="/style.css"></link>
        </header>
        <div>
          <h2> Pokemon Detail </h2>
          <h3> ID: {this.props.id}</h3>
          <h3> Num: {this.props.num}</h3>
          <h3> Name: {this.props.name}</h3>
          <h3> Img: {this.props.img}</h3>
          <h3> Height: {this.props.height}</h3>
          <h3> Weight: {this.props.weight}</h3>
          <h3> Candy: {this.props.candy}</h3>
          <h3> Candy Count: {this.props.candy_count}</h3>
          <h3> Average Spawn: {this.props.avg_spawns}</h3>
          <h3> Spawn Time: {this.props.spawn_time}</h3>
          <img src={this.props.img}/>
        </div>
    </html>
    );
  }
}

module.exports = Pokestat;