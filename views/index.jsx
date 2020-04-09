var React = require('react');
class Index extends React.Component {
  render() {
    const pokedex = this.props.pokemon;
    const outputList = pokedex.map(pokemon => {
      return (
        <li>
          <a href={"/pokemon/" + pokemon.id}>{pokemon.num}. {pokemon.name}</a>
        </li>
        )
    })

    return (
      <html>
        <body>
          <div>
            <h1>index </h1> 
            <form method="GET" action="/pokemon/new">
                <input type="submit" value="add new pokes"/>
            </form>
            <ul>
                {outputList}
            </ul>
          </div>
        </body>
      </html>
      );
  }
}

module.exports = Index; 