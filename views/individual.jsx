var React = require('react');

class Individual extends React.Component{
    render(){
        var styleBody = {
            backgroundColor : "#00b7ff"
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
        var urlHome = "/pokemon";
        var urlEdit = "/pokemon/"+((this.props.pokemonId)-1)+"/edit";
        var urlDelete = "/pokemon/"+((this.props.pokemonId)-1)+"/delete"
        return(
            <html>
                <body style = {styleBody}>
                    <div style={style}>
                        <h1>
                            <p>Pokemon Dexter</p>
                            <img style = {pic} src ={this.props.pokemon.img}/>
                            <p>{this.props.pokemon.name}</p>
                        </h1>
                        <h2>Pokemon Detail</h2>
                        <p>Pokemon Entry: {this.props.pokemon.num}</p>
                        <p>Pokemon Height: {this.props.pokemon.height}</p>
                        <p>Pokemon Weight: {this.props.pokemon.weight}</p>
                        <p>Fav Candy: {this.props.pokemon.candy}</p>
                        <p>Egg Hatch Step: {this.props.pokemon.egg}</p>
                        <form method="get" action={urlHome}>
                        <button type="submits">Home</button>
                        </form>
                        <form method="get" action={urlEdit}>
                        <button type="submits">Edit</button>
                        </form>
                        <form method="get" action={urlDelete}>
                        <button type="submits">Delete</button>
                        </form>
                    </div>
                </body>
            </html>
        );
    };
};

module.exports = Individual;