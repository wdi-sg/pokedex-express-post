var React = require('react');

class Editpage extends React.Component {
  render() {
    let formAction = "/pokemon/" + this.props.id + "?_method=PUT"
    const pokemonKeys = ["id", "num", "name", "img", "height", "weight", "candy", "candy_count", "egg", "avg_spawns", "spawn_time"];
    const pokemonInputs = pokemonKeys.map(key => {
        return (
            <React.Fragment>
                <h4>{key}</h4>
                <input type='text' name={key} placeholder={key.toUpperCase()} value={this.props[key]}/>
            </React.Fragment>
        )
    });
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

            <form method='POST' action={formAction}>
                {pokemonInputs}
                <input type='submit' value='submit'/>
            </form>
        </body>
        </html>
    )
  }
}

module.exports = Editpage;