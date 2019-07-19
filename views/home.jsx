var React = require('react');

const Layout = require('./layout.jsx');


class Home extends React.Component {
    render() {
        const pokemon = this.props.pokemonKey.map(pokemon =>
           <div key={pokemon.name} className="pokemon">
                <img src={pokemon.img} className="img-fluid"/>
                    <p>Name: {pokemon.name}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
           </div>
        );
    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/style.css"></link>
        </head>
        <body>
          <div className="main-wrapper">
          <div className="nav-bar"></div>
          <div className="header"><h1>Hello! Welcome to Pokedex!</h1></div>
            {pokemon}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;