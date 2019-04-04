var React = require('react');

class Blurb extends React.Component {
    render() {
        let pokemon = this.props.pokemon;
        let gotCandy = pokemon.candy;
        if (gotCandy === "None"){
            return (
                <p className="blurb">This is {pokemon.name}! It weighs {pokemon.weight} and it's height is {pokemon.height}. {pokemon.name}'s Pokedex number is {pokemon.num}.
                </p>
            )
        }
        else {
            return (
                <p className="blurb">This is {pokemon.name}, it weighs {pokemon.weight}! It's height is {pokemon.height} and it uses {pokemon.candy} to get stronger. {pokemon.name}'s Pokedex number is {pokemon.num}.
                </p>
            )
        }
    }
};

class Viewpokemon extends React.Component {
  render() {
    let pokemon = this.props.pokemon;
    return (
<html>
<head>
    <title>{pokemon.name}</title>
    <link rel="stylesheet" type="text/css" href="/style.css"></link>
</head>
<body>

    <div className="pokeWrapper">
        <h1>{pokemon.name} <span className="pokeID">#{pokemon.num}</span></h1>
        <div className="pokeDetails">
            <div className="left">
                <img className="mainPoke" src={pokemon.img}></img>
                <div className="buttonBox">
                    <button className="button" id="edit"><a href={"/pokemon/"+pokemon.id+"/edit"}>Edit</a></button>
                    <button className="button" id="delete"><a href={"/pokemon/"+pokemon.id+"/delete"}>Delete</a></button>
                </div>
            </div>
            <div className="right">
                <Blurb pokemon={pokemon}/>
                <div className="stats">
                        <li>
                            <div>
                                Height
                            </div>
                            <div className="statValue">
                                {pokemon.height}
                            </div>
                        </li>
                        <li>
                            <div>
                                Weight
                            </div>
                            <div className="statValue">
                                {pokemon.weight}
                            </div>
                        </li>
                        <li>
                            <div>
                                Candy
                            </div>
                            <div className="statValue">
                                {pokemon.candy}
                            </div>
                        </li>
                        <li>
                            <div>
                                Egg
                            </div>
                            <div className="statValue">
                                {pokemon.egg}
                            </div>
                        </li>
                </div>
                <div className="back">
                    <button className="button" id="edit"><a href={"/"}>Back</a></button>
                </div>
            </div>
        </div>
    </div>

</body>
</html>

    );
  }
}

module.exports = Viewpokemon;