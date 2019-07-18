var React = require('react');
class Individual extends React.Component {

  render() {
    let pokemon = this.props.pokemon;
    let pokUrlEdit = "/pokemon/"+pokemon.id+"/edit";
    let pokUrlDelete = "/pokemon/"+pokemon.id+"/delete";
    let headerStyle = {
        fontWeight:"bold"
    }
    return (
      <html>
        <body style={{textAlign:"center"}}>
            <h1>{pokemon.name}</h1>
            <a href="/pokemon" style={{position:"absolute",bottom:50,left:"50%",transform:"translateX(-50%)"}}>Home</a>
            <img src={pokemon.img} style={{width:200}}/>
                <table style={{margin:"0 auto",textAlign:"left",fontSize:20,backgroundColor:"#fdffba",padding:30,boxShadow:"3px 3px 3px black",border:"1px solid black"}}>
                    <tr>
                        <td style={headerStyle}>ID</td>
                        <td>: {pokemon.id}</td>
                    </tr>
                    <tr>
                        <td style={headerStyle}>Num</td>
                        <td>: {pokemon.num}</td>
                    </tr>
                    <tr>
                        <td style={headerStyle}>Name</td>
                        <td>: {pokemon.name}</td>
                    </tr>
                    <tr>
                        <td style={headerStyle}>Image Link</td>
                        <td>: {pokemon.img}</td>
                    </tr>
                    <tr>
                        <td style={headerStyle}>Height</td>
                        <td>: {pokemon.height}</td>
                    </tr>
                    <tr>
                        <td style={headerStyle}>Weight</td>
                        <td>: {pokemon.weight}</td>
                    </tr>
                    <tr>
                        <td style={headerStyle}>Candy</td>
                        <td>: {pokemon.candy}</td>
                    </tr>
                    <tr>
                        <td style={headerStyle}>Candy Count</td>
                        <td>: {pokemon.candy_count}</td>
                    </tr>
                    <tr>
                        <td style={headerStyle}>Egg</td>
                        <td>: {pokemon.egg}</td>
                    </tr>
                    <tr>
                        <td style={headerStyle}>Avg Spawns</td>
                        <td>: {pokemon.avg_spawns}</td>
                    </tr>
                    <tr>
                        <td style={headerStyle}>Spawn Time</td>
                        <td>: {pokemon.spawn_time}</td>
                    </tr>
                </table>
                <br/>
                <form action={pokUrlEdit} style={{display:"inline-block",margin:"0 20px"}}>
                    <input type="submit" value="Edit" />
                </form>
                <form action={pokUrlDelete} style={{display:"inline-block"}}>
                    <input type="submit" value="Delete" />
                </form>


        </body>
      </html>
    );
  }
}

module.exports = Individual;
