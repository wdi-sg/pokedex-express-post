var React = require('react');
class Edit extends React.Component {

  render() {
    let pokemon = this.props;
    let url = "/pokemon/"+pokemon.id
    return (
      <html>
        <body style={{textAlign:"center"}}>
            <h1>Edit Pokemon</h1>
            <img src={pokemon.img}/>
            <form method="POST" action={url}>
                <table style={{margin:"0 auto"}}>
                    <tr>
                        <td>ID</td>
                        <td><input type="text" value={pokemon.id} readonly/></td>
                    </tr>
                    <tr>
                        <td>Num</td>
                        <td><input type="text" value={pokemon.num} readonly/></td>
                    </tr>
                    <tr>
                        <td>Image Link</td>
                        <td><input type="text" value={pokemon.img}/></td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td><input type="text" value={pokemon.height}/></td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td><input type="text" value={pokemon.weight}/></td>
                    </tr>
                    <tr>
                        <td>Candy</td>
                        <td><input type="text" value={pokemon.candy}/></td>
                    </tr>
                    <tr>
                        <td>Candy Count</td>
                        <td><input type="text" value={pokemon.candy_count}/></td>
                    </tr>
                    <tr>
                        <td>Egg</td>
                        <td><input type="text" value={pokemon.egg}/></td>
                    </tr>
                    <tr>
                        <td>Avg Spawns</td>
                        <td><input type="text" value={pokemon.avg_spawns}/></td>
                    </tr>
                    <tr>
                        <td>Spawn Time</td>
                        <td><input type="text" value={pokemon.spawn_time}/></td>
                    </tr>
                </table>
                <br/>
                <input type="submit" value="Edit"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = Edit;

// {
//       "id": 1,
//       "num": "001",
//       "name": "Bulbasaur",
//       "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
//       "height": "0.71 m",
//       "weight": "6.9 kg",
//       "candy": "Bulbasaur Candy",
//       "candy_count": "25",
//       "egg": "2 km",
//       "avg_spawns": "69",
//       "spawn_time": "20:00"
//     },