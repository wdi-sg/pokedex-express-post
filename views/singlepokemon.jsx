var React = require('react');

class Singlepokemon extends React.Component{

    render() {
      const el = this.props.pokemonDetails;

      return (
        <html>
          <body>
            <div>
              <img src={el.img}></img><br></br>
              <p>ID: {el.id}</p><br></br>
              <p>Name: {el.name}</p><br></br>
              <p>Height: {el.height}</p><br></br>
              <p>Weight: {el.weight}</p><br></br>
              <p>Candy: {el.candy}</p><br></br>
              <p>Candy Count: {el.candy_count}</p><br></br>
              <p>Egg: {el.egg}</p><br></br>
              <p>Average Spawns: {el.avg_spawns}</p><br></br>
              <p>Spawn Time: {el.spawn_time}</p><br></br>
            </div>
          </body>
        </html>
      );
    }
}

module.exports = Singlepokemon;