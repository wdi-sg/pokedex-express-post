var React = require('react');

class Home extends React.Component {
  render() {
    // console.log("Logging: ", this.props.pokemon)
    return (
      <html>
        <div>
          <h2>
            Pokedex
          </h2>
          <p>
            <b>ID:</b> {this.props.pokemon.id}
          </p>
          <p>
            <b>Num:</b> {this.props.pokemon.num}
          </p>
          <p>
            <b>Name:</b> {this.props.pokemon.name}
          </p>
            <img src = {this.props.pokemon.img}></img>
          <p>
            <b>Height:</b> {this.props.pokemon.height}
          </p>
          <p>
            <b>Weight:</b> {this.props.pokemon.weight}
          </p>
          <p>
            <b>Candy:</b> {this.props.pokemon.candy}
          </p>
          <p>
            <b>Candy count:</b> {this.props.pokemon.candy_count}
          </p>
          <p>
            <b>Egg:</b> {this.props.pokemon.egg}
          </p>
          <p>
            <b>Average spawns:</b> {this.props.pokemon.avg_spawns}
          </p>
          <p>
            <b>Spawn time:</b> {this.props.pokemon.spawn_time}
          </p>
        </div>
      </html>
    );
  }
}

module.exports = Home;
