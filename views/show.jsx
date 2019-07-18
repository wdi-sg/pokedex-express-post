var React = require('react');

class Show extends React.Component{
    render(){
        var divStyle = {
            display:"inline-block",
            color:"blue"
        }
        var textAlign = {
            textAlign:"center"
        }
        var mapPokemonData = this.props.pokemonData.map(pokemon=>{
            let url = "/pokemon/" + pokemon.id;
            return(
                <div style={divStyle}>
                    <a href={url}>
                        <img src ={pokemon.img}/>
                    </a>
                    <p>Entry Num: {pokemon.num}</p>
                    <p>Name: {pokemon.name}</p>
                </div>
            );
        });
        return(
            <html>
                <body>
                    <div style ={textAlign}>
                        <h1 >PokeDex</h1>
                        <h2>Pokemon List</h2>
                            <p>{mapPokemonData}</p>
                    </div>
                </body>
            </html>
        );
    };
};

module.exports = Show;