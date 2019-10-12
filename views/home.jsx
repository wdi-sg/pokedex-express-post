var React = require('react');

class Home extends React.Component {
    render() {
        const allPokemon = this.props.pokemon.map(pokemon => {
            let formAction = '/pokemon/' + pokemon.id;
            return (
                <li>{pokemon.name}<br/>
                <a href={formAction}><img src={pokemon.img}></img></a>
                </li>
            );
        })
        return (
            <html>
                <body>
                    <h1>Welcome to the Pokedex</h1>
                    <h3>Sort by </h3>
                    <form method="GET" action="/pokemon?">
                        <select name="sortby">
                            <option value="name">Name</option>
                            <option value="height">Height</option>
                            <option value="weight">Weight</option>
                        </select>
                        <input type="submit"/>
                    </form>
                    <form method="GET" action="/pokemon/new">
                        <input type="submit" value="Add New Pokemon"/>
                    </form>
                    <h3>Pokemon in Pokedex</h3>
                    <p><em>Click on image for details</em></p>
                    <ul>
                    {allPokemon}
                    </ul>
                </body>
            </html>
        )
    }
}

module.exports = Home;