var React = require('react');
class Index extends React.Component {
  render() {
    const pokedex = this.props.pokemon;
    const outputList = pokedex.map(pokemon => {
      return (
        <li>
          <a href={"/pokemon/" + pokemon.id} style={{"text-decoration": "none", "color": "black"}}>{pokemon.num}. {pokemon.name}</a>
        </li>
        )
    })

    return (
      <html>
        <body>
          <div>
            <h1><u>Pokedex</u></h1>
            <form method="GET" action="/pokemon/new">
              <input type="submit" value="Submit New Pokemon Data"/>
            </form>
            <ul style={{"list-style": "none"}}>
              {outputList}
            </ul>
          </div>
        </body>
      </html>
      );
  }
}

module.exports = Index;