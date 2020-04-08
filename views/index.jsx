const React = require('react');
class Index extends React.Component {
  render() {

    const pokeData = this.props.pokeData

    const allNames = pokeData.map( pokemon => {
      return (
        <li style={ {listStyleType: "none"}} key={pokemon.id}>
        <a href={`pokemon/${pokemon.id}`}>
          {pokemon.name}
        </a>
        </li>
      )

    })

    return (
      <html lang="en" dir="ltr">
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/></head>
        <body style={{fontFamily: "sans-serif", textAlign: "center"}}>
        <div className="jumbotron">
          <h1>This is an Okay Pokedex</h1>
            <h2><a href="/pokemon/new">Create a Pokemon</a></h2>
        </div>

        <h3>All Pokemon:</h3>

        <ul>
          {allNames}
        </ul>

        </body>
      </html>
    );
  }
}

module.exports = Index;
