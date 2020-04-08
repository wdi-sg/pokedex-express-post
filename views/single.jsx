var React = require('react');
class Single extends React.Component {
  render() {

    const id = this.props.pokemonId;
    const pokemon = this.props.pokemon[id-1];

    const output = (
      <div>
        <img src={pokemon.img}/>
        <p>This is {pokemon.name}, it is {pokemon.height} tall and {pokemon.weight} in weight.</p>
        <form method="GET" action={"/pokemon/" + {id} + "/edit"}>
          <input type="submit" value="Edit Page"/>
        </form>
      </div>
      );

    return (
      <html>
        <body>
          {output}
        </body>
      </html>
      );
  }
}

module.exports = Single;