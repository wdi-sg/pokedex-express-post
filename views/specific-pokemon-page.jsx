const React = require ( 'react' );



class specificPokemon extends React.Component {
  render() {
    console.log("this props is: ", this.props.specificPokemon.id)

    let pokemonData = this.props.specificPokemon

    console.log("/pokemon/" + pokemonData.id+ "/edit")
    let editLink = "/pokemon/" + pokemonData.id+ "/edit"

    console.log(typeof editLink)

    return (
        <html>
            <head>
            </head>
            <body>
                <div>
                <h1>{pokemonData.name}</h1>

                    <img src = {pokemonData.img}></img>
                    <a href = {editLink}>Edit stats</a>

                    <p>Id is {pokemonData.id}</p>
                    <p>Num is {pokemonData.num}</p>
                    <p>Height is {pokemonData.height}</p>
                    <p>Weight is {pokemonData.weight}</p>
                    <p>Candy is {pokemonData.candy}</p>
                    <p>Candy Count is {pokemonData.candy_count}</p>

                    <p>Egg is {pokemonData.egg}</p>

                    <p>Average Spawns is {pokemonData.avg_spawns}</p>

                    <p>Spawn Time is {pokemonData.spawn_time}</p>


                </div>
            </body>
        </html>

    );
  }
}

module.exports = specificPokemon;