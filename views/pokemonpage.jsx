var React = require('react');

class Pokemonpage extends React.Component {
  render() {
    return (
        <html>
        <head>
            <title>Angrylobster's Pokedex</title>
            <link rel="stylesheet" type="text/css" href="style.css"/>
        </head>
        <header>
            <ul>
                <a href="/"><li id="home">Home</li></a>
                <a href="/pokemon/new"><li id="new-pokemon">New Pokemon</li></a>
                <li id="reserved">Reserved</li>
            </ul>
        </header>

        <body>
            {this.props.name}<br/>
            {this.props.id}<br/>
            {this.props.img}<br/>
        </body>
        </html>
    );
  }
}

module.exports = Pokemonpage;