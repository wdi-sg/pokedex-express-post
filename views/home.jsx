var React = require('react');
var PokemonProfile  = require('./components/pokemonProfile.jsx');

class Home extends React.Component {
  render() {
    var message="";
    if(this.props.createdNew === true){
      message = "added new pokemon successful!"
    } else {
      message ="";
    }

    const pokemonList = this.props.pokemonsAll.map((pokemon)=>{
        return <PokemonProfile data={pokemon}/>
    });

    var url = "/pokemon/new"
    return (
      <html>
        <body>
          <div>{message}</div>
          <a href={url}>Create new pokemon</a>
          <h1>All Pokemons</h1>
          <div>{pokemonList}</div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
