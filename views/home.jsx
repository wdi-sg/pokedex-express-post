var React = require('react');

class Home extends React.Component {
  render() {
    // console.log("pokemon");
    // console.log(this.props.pokemon);

    const allPokemon = this.props.pokemon.map ( eachPoke => {
        return <li> {eachPoke} </li>
    })
    return (
      <html>
        <body>
            <h1>This is all the list of pokemons:</h1>
            <form action="/" method="GET">
                <select name="sortby">
                    <option value="name">Sort by Name</option>
                    <option value="type">Sort By Type</option>
                    <option value="weight">Sort By Weight</option>
                    </select>
                    <input type="submit"></input>
            </form>
            <div>
                <ul>
                {allPokemon}
                </ul>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
