var React = require('react');

class Pokemonpage extends React.Component {
  render() {
    const pokemonKeys = ["id", "num", "name", "img", "height", "weight", "candy", "candy_count", "egg", "avg_spawns", "spawn_time"];
    const pokemonEdit = "/pokemon/" + this.props.id + "/edit";
    var pokemonSpecs = pokemonKeys.map(key => {
         return(
            <tr>
                <td>{key.toUpperCase()}</td>
                <td>{this.props[key]}</td>
            </tr>
        )
    })
    return (
        <html>
        <head>
            <title>Angrylobster's Pokedex</title>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <header>
            <ul>
                <a href="/"><li id="home">Home</li></a>
                <a href="/pokemon/new"><li id="new-pokemon">New Pokemon</li></a>
                <li id="reserved">Reserved</li>
            </ul>
        </header>

        <body>
            <div>
                <img src={this.props.img}/>
                <h1>{this.props.name}</h1>
            </div>
            <table>
                {pokemonSpecs}
            </table>
            <form method='GET' action={pokemonEdit}>
                <input type='submit' value='edit'/>
            </form>
        </body>
        </html>
    );
  }
}

module.exports = Pokemonpage;