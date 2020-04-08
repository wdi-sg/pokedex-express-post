var React = require('react');

class Index extends React.Component {
  render() {
var showpokemon = this.props.pokemon.map( pokemon => {
    var returnPokemonLink = "/pokemon/" + pokemon.id;
  return <li><a href={returnPokemonLink}>{pokemon.name}</a></li>;
});
    var createPokeman = "/pokemon/new";


    return (
      <html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
      </head>
        <body>
          <div>
            <h1>List of Pokemanses</h1>
            <ol className="poke-list" style = {{backgroundColor: "white"}}>{showpokemon}</ol>
            <a className="btn btn-secondary" href={createPokeman}>My Uncle touches me at night</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Index;