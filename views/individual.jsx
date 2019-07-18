var React = require('react');

class Individual extends React.Component{
    render(){
        var styleBody = {
            backgroundColor : "white"
        }
        var pic = {
            height : "200px",
            width : "200px"
        }
        var style = {
            textAlign:"center",
            color: "black",
            fontWeight : "Bold"
        }
        var url = "/pokemon/"+this.props.pokemonId;
        return(
            <html>
                <body style = {styleBody}>
                    <div style={style}>
                        <h1>
                            <img style = {pic} src ={this.props.pokemon.img}/>
                            <p>{this.props.pokemon.name}</p>
                        </h1>
                        <h2>Pokemon Detail</h2>
                        <p>Pokemon Entry: {this.props.pokemon.num}</p>
                        <p>Pokemon Height: {this.props.pokemon.height}</p>
                        <p>Pokemon Weight: {this.props.pokemon.weight}</p>
                        <p>Fav Candy: {this.props.pokemon.candy}</p>
                        <p>Egg Hatch Step: {this.props.pokemon.egg}</p>
                    </div>
                </body>
            </html>
        );
    };
};

module.exports = Individual;