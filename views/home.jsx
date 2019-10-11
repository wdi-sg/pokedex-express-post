var React = require('react');

class Home extends React.Component {

    render() {

        let style = {
            display: "inline-block",
            margin: "2rem",
            "text-align": "center"
        }
        let style2 = {
            "text-decoration": "none"
        }

        const allPokemon = this.props.pokeobj.pokemon.map( (pokemon, index) => {

            return (
                <li style={style}>{pokemon.name}<br/>
                <a style={style2} href={"localhost:3000/pokemon/"+pokemon.id}><img src={pokemon.img}></img></a>
                </li>
                )

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