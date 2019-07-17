var React = require('react');

class Homepage extends React.Component {
  render() {
    const pokeEntries = this.props.pokemon.map(pokemon =>{
        let pokePage = "/pokemon/" + pokemon.num;
        return (
                <div>
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
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <header>
            <img src="../img/header.jpg"/>
        </header>

        <body>
            <form method='GET' action='/pokemon'>
                <select name='sortby'>
                    <option value='name'>Name</option>
                    <option value='num'>Number</option>
                    <option value='height'>Height</option>
                    <option value='weight'>Weight</option>
                </select>
                <input type='submit'/>
            </form>
            {pokeEntries}
        </body>
        </html>
    );
  }
}

module.exports = Homepage;