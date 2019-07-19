var React = require('react');

class Show extends React.Component{
    render(){
        var body ={
            backgroundColor:"#00b7ff"
        }
        var container ={
            margin:"20px 200px 0 200px"
        }
        var divStyle = {
            display:"inline-block",
            color:"blue",
            width:"200px",
            height:"300px"
        }
        var textAlign = {
            textAlign:"center"
        }
        let urlHome = "/pokemon";
        var mapPokemonData = this.props.pokemonData.map(pokemon=>{
            let url = "/pokemon/" + pokemon.id;
            return(
                <div style={divStyle}>
                    <a href={url}>
                        <img src ={pokemon.img}/>
                    </a>
                    <p>#{pokemon.num}</p>
                    <p>{pokemon.name}</p>
                </div>
            );
        });

        return(
            <html>
                <body style={body}>
                    <div style={container}>
                        <div style ={textAlign}>
                            <h1 >Pokemon Dexter</h1>
                            <h2>Pokemon List</h2>
                            <form method="GET">
                            <select type="submit" name="sortby">
                                <option value="">Sort By</option>
                                <option value="name">Name</option>
                                <option value="weight">Weight</option>
                                <option value="height">Height</option>
                            </select>
                            <button type="submit" value="Sort">submit</button>
                            </form>
                            <p>{mapPokemonData}</p>
                        </div>
                    </div>
                </body>
            </html>
        );
    };
};

module.exports = Show;