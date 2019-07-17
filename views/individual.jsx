var React = require('react');
class Individual extends React.Component {

  render() {
    let pokemon = this.props.pokemon;
    let pokUrlEdit = "/pokemon/"+pokemon.id+"/edit";
    return (
      <html>
        <body style={{textAlign:"center"}}>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img}/>
                <table style={{margin:"0 auto",textAlign:"left",fontSize:20}}>
                    <tr>
                        <td>ID</td>
                        <td>{pokemon.id}</td>
                    </tr>
                    <tr>
                        <td>Num</td>
                        <td>{pokemon.num}</td>
                    </tr>
                    <tr>
                        <td>Image Link</td>
                        <td>{pokemon.img}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>{pokemon.height}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>{pokemon.weight}</td>
                    </tr>
                    <tr>
                        <td>Candy</td>
                        <td>{pokemon.candy}</td>
                    </tr>
                    <tr>
                        <td>Candy Count</td>
                        <td>{pokemon.candy_count}</td>
                    </tr>
                    <tr>
                        <td>Egg</td>
                        <td>{pokemon.egg}</td>
                    </tr>
                    <tr>
                        <td>Avg Spawns</td>
                        <td>{pokemon.avg_spawns}</td>
                    </tr>
                    <tr>
                        <td>Spawn Time</td>
                        <td>{pokemon.spawn_time}</td>
                    </tr>
                </table>
                <br/>
                <form action={pokUrlEdit}>
                    <input type="submit" value="Edit" />
                </form>

        </body>
      </html>
    );
  }
}

module.exports = Individual;
