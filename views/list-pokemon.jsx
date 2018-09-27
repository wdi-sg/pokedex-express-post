const React = require('react');

class ListPokemon extends React.Component {
  render() {
    const pokemans = this.props.object.pokemon.map(pokeman => (
      <a href="#" className="list-group-item" key={pokeman.id}>
        {pokeman.name}
      </a>
    ));

    return (
      <html>
        <head>
          <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
          <title>Pokedex</title>
        </head>
        <body>
          <header>
            <nav className="navbar navbar-light bg-light">
              <a class="navbar-brand font-weight-bold" href="/">
                Pokedex
              </a>
            </nav>
          </header>
          <div className="container w-100 pt-3">
            <div className="row">
              <div className="col text-center">
                <ul className="list-group w-50 mx-auto">{pokemans}</ul>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ListPokemon;
