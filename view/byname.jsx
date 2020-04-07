var React = require('react');
class byname extends React.Component {
  render() {
        const PokemonName = this.props.pokemon.map( pokemonName => {
                    return <li>{pokemonName}</li>
                        });
    return (
      <html>
        <body>
          <div>
            <h1  style={{textAlign: "Center"}}>Pokemon Sort by name </h1>
                <div>
                    <ol>
                        {PokemonName};
                    </ol>
                </div>

                <h2  style={{textAlign: "Center"}}>To return home </h2>
            <form method="GET" action="/" style={{textAlign: "Center"}}>
            <input type="submit" value="Return Home"></input>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = byname;