var React = require('react');
class Edit extends React.Component {

  render() {
    let pokemon = this.props;
    let url = "/pokemon/"+pokemon.id+"?_method=PUT";
    return (
      <html>
        <body style={{textAlign:"center",fontSize:15}}>
            <h1>Edit Pokemon</h1>
            <a href="/pokemon" style={{position:"absolute",bottom:50,left:"50%",transform:"translateX(-50%)"}}>Home</a>
            <img src={pokemon.img} style={{width:200}}/>
            <form method="POST" action={url}>
                <table style={{margin:"0 auto",textAlign:"left"}}>
                    <tr>
                        <td>ID</td>
                        <td><input type="text" name="id"value={pokemon.id} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                    <tr>
                        <td>Num</td>
                        <td><input type="text" name="num"value={pokemon.num} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name="name" value={pokemon.name} required minlength="2"/></td>
                    </tr>
                    <tr>
                        <td>Image Link</td>
                        <td><input type="text" name="img" value={pokemon.img}/></td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td><input type="text" name="height" value={pokemon.height}/></td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td><input type="text" name="weight" value={pokemon.weight}/></td>
                    </tr>
                    <tr>
                        <td>Candy</td>
                        <td><input type="text" name="candy" value={pokemon.candy}/></td>
                    </tr>
                    <tr>
                        <td>Candy Count</td>
                        <td><input type="text" name="candy_count" value={pokemon.candy_count}/></td>
                    </tr>
                    <tr>
                        <td>Egg</td>
                        <td><input type="text" name="egg" value={pokemon.egg}/></td>
                    </tr>
                    <tr>
                        <td>Avg Spawns</td>
                        <td><input type="text" name="avg_spawns" value={pokemon.avg_spawns}/></td>
                    </tr>
                    <tr>
                        <td>Spawn Time</td>
                        <td><input type="text" name="spawn_time" value={pokemon.spawn_time}/></td>
                    </tr>
                </table>
                <br/>
                <input type="submit" value="Confirm change"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = Edit;
