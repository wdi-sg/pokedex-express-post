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
        <body style={{fontFamily: "sans-serif", textAlign: "center"}}>
        <h1>This is an Okay Pokedex</h1>

        <h2><a href="/pokemon/new">Create a Pokemon?</a></h2>

        <ul>
          {allNames}
        </ul>

        </body>
      </html>
    );
  }
}

module.exports = Index;
