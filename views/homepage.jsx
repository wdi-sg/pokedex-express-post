var React = require('react');

class Homepage extends React.Component {
  render() {
    const pokemonDivs = this.props.pokemon.map(pokemon =>{
        var pokemonLink = "/pokemon/" + pokemon.num;
        return (
                <div>
                    <a href={pokemonLink}>
                        <img src={pokemon.img}/>
                        <p>{pokemon[this.props.sortMethod]}</p>
                        <h1>{pokemon.name}</h1>
                    </a>
                </div>
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
            <form method='GET' action='/'>
                <select name='sortby'>
                    <option value='num'>Number</option>
                    <option value='name'>Name</option>
                    <option value='height'>Height</option>
                    <option value='weight'>Weight</option>
                </select>
                <input type='submit'/>
            </form>
            {pokemonDivs}
        </body>
        </html>
    );
  }
}

module.exports = Homepage;