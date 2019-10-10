var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
      </head>
        <body>
            <h1>Pokedex sort by {this.props.sortParam}</h1>
            {this.props.pokemonSorted.map(pokemon => (
                // react.fragment that functions as div, but doesn't display on page
                <React.Fragment>
                <div class="container">
                    <table class="table table-striped table-bordered table-hover table-condensed">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Weight</th>
                            <th>Height</th>
                        </tr>
                        <tr>
                            <td><img src={pokemon.img}/></td>
                            <td>{pokemon.name}</td>
                            <td>{pokemon.weight}</td>
                            <td>{pokemon.height}</td>
                        </tr>
                    </table>
                </div>
                </React.Fragment>
            )
            )}
        </body>
      </html>
    );
  }
}

module.exports = Home;