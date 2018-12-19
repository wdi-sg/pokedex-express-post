var React = require('react');

class DisplayPokemon extends React.Component {

    render() {
        const chosenPokemon = this.props.searchPoke;

        return (
            <html>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
            <body>
            <img src={chosenPokemon.img}></img><br/>
            <h2>{chosenPokemon.name}</h2>
            <p>Height: {chosenPokemon.height}</p><br/>
            <p>Weight: {chosenPokemon.weight}</p><br/>
            <p>Candy: {chosenPokemon.candy}</p><br/>
            <p>Candy Count: {chosenPokemon["candy_count"]}</p><br/><br/>
            
            <a className="buttonLink" href={"/pokemon/" + chosenPokemon.id + "/edit"}>Edit this Pokemon!</a>
            </body>
            </html>

        );
    }
}

module.exports = DisplayPokemon;
