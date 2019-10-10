var React = require('react');

class Home extends React.Component {



    render() {
        const allPokemon = this.props.pokemon.map(pokemon => {
            return <li>{pokemon.name}<br/><img src={pokemon.img}></img> </li>;
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
                        <h3>Pokemon in Pokedex</h3>
                        <ul>
                        {allPokemon}
                        </ul>


                    </form>
                </body>
            </html>
        )
    }
}

module.exports = Home;