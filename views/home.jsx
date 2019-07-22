var React = require('react');
var Pokemon = require('./pokemon.jsx');

class Home extends React.Component {
    render() {

    console.log("POKEMON LIST");
    console.log( this.props.pokemonList );

    const pokemonList = this.props.pokemonList.map((pokemon)=>{
        return <Pokemon pokemonData={pokemon}/>
    });

    return (
      <html>
        <body>
         <div>
            <h1>A List Of Pokemons</h1>
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;Create new Pokemon&nbsp;&nbsp;
            <a href={"/pokemon/new"}>New Member</a>

          </div>
          <div>
            <ul>{pokemonList}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;