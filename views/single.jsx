var React = require('react');
class Single extends React.Component {
  render() {

    const id = this.props.pokemonId;
    const pokemon = this.props.pokemon[id-1];

    

    return (
      <html>
        <body>
            <div>
                <img src={pokemon.img}/>
                <ul>
                    <li>Name: {pokemon.name}</li>
                    <li>Height: {pokemon.height}</li> 
                    <li>Weight: {pokemon.weight}</li>
                </ul>
                <form method="GET" action={"/pokemon/" + {id} + "/edit"}>
                <input type="submit" value="Edit"/>
                </form>
            </div>
        </body>
      </html>
      );
  }
}

module.exports = Single; 