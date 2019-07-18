var React = require('react');

class Homepage extends React.Component {
  render() {

    const pokeCards = this.props.pokemon.map(pokemon =>{
        let pokePage = "/pokemon/" + pokemon.num;
        return (
                <div className="pokemon-card">
                    <a href={pokePage}>
                        <img src={pokemon.img}/>
                        <p>{pokemon[this.props.sortRequest]}</p>
                        <h1>{pokemon.name}</h1>
                    </a>
                </div>
            )
    });

    return (
        <html>
        <head>
            <title>Gotta Catch Em All!</title>
            <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <header>
        <nav>
            <ul id="nav-container">
                <li className="item"><a href="/pokemon">Home</a></li>
                <li className="item"><a href="/pokemon/new">New</a></li>
                <li className="item"><a href="null">Types</a></li>
                <div id="bar"></div>
            </ul>
        </nav>
        <a href="/pokemon"><img id="header-img" src="/header.jpg"/></a>
        </header>
        <body>
            <h3>Sort Those Pokémon!</h3>
            <form method='GET' action='/pokemon'>
                <select name='sortby'>
                    <option value='num'>Number</option>
                    <option value='name'>Name</option>
                    <option value='height'>Height</option>
                    <option value='weight'>Weight</option>
                </select>
                <input type='submit'/>
            </form>
            <div id="pokemon-container">
                {pokeCards}
            </div>
        </body>
        </html>
    );
  }
}

module.exports = Homepage;