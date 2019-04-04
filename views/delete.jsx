var React = require('react');

class Home extends React.Component {

  render() {

    const pokemon = this.props;
    //console.log(pokemon);

    var valueAttribute = `/pokemon/${pokemon.id}?_method=DELETE`

    return (
        <html>
            <body>
                <h1>Delete Pokémon</h1>
                    <div>
                        Name: {pokemon["name"]}
                        <form method="POST" action={valueAttribute}>
                            <input type="submit" value="Delete"></input>
                        </form>

                    </div>

            </body>
        </html>
    );
  }
}

module.exports = Home;