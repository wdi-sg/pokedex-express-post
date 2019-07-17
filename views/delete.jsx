var React = require('react');
class Delete extends React.Component {

  render() {
    let pokemon = this.props;
    let url = "/pokemon/"+pokemon.id+"?_method=delete";
    return (
      <html>
        <body style={{textAlign:"center"}}>
            <h1>Do you want to delete this Pokemon?</h1>
            <img src={pokemon.img}/>
            <form method="POST" action={url}>
                <table style={{margin:"0 auto"}}>
                    <tr>
                        <td>ID</td>
                        <td><input type="text" name="id"value={pokemon.id} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                    <tr>
                        <td>Num</td>
                        <td><input type="text" name="num"value={pokemon.num} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                    <tr>
                        <td>Image Link</td>
                        <td><input type="text" name="img" value={pokemon.img} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td><input type="text" name="height" value={pokemon.height} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td><input type="text" name="weight" value={pokemon.weight} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                    <tr>
                        <td>Candy</td>
                        <td><input type="text" name="candy" value={pokemon.candy} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                    <tr>
                        <td>Candy Count</td>
                        <td><input type="text" name="candy_count" value={pokemon.candy_count} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                    <tr>
                        <td>Egg</td>
                        <td><input type="text" name="egg" value={pokemon.egg} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                    <tr>
                        <td>Avg Spawns</td>
                        <td><input type="text" name="avg_spawns" value={pokemon.avg_spawns} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                    <tr>
                        <td>Spawn Time</td>
                        <td><input type="text" name="spawn_time" value={pokemon.spawn_time} readOnly style={{backgroundColor:"#b2b2b2"}}/></td>
                    </tr>
                </table>
                <br/>
                <input type="submit" value="Delete"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = Delete;
