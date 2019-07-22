var React = require('react');

class Form extends React.Component {
  render() {

const greyBox = {
  backgroundColor: '#D3D3D3',
};

    return (
      <html>
        <body>
          <div>
            <h1>Delete {this.props.pokemonData.name} !</h1>
            <form method="POST" action={"/pokemon/delete/"+this.props.index+'?_method=PUT'}>
                <table>
                <tr>
                <td>Image</td>
                <td>
                <img name="displayimg" src={this.props.pokemonData.img}  /> {/*this img control cannot pass image url to request.body  that why we pass image url in hidden field */}
                </td>
                </tr>
                <tr>
                <td>ID#</td>
                <td><input name="id" value={this.props.pokemonData.id} readonly="readonly" style={greyBox} /></td>
                </tr>
                <tr>
                <td>Number</td>
                <td><input name="num" value={this.props.pokemonData.num} readonly="readonly" style={greyBox} /></td>
                </tr>
                <tr>
                <td>Name</td>
                <td><input name="name" value={this.props.pokemonData.name} readonly="readonly" style={greyBox} />
                <input name="img" value={this.props.pokemonData.img} hidden />
                {/* we use hidden input field in order to pass image url form request.body  */}</td>
                </tr>
                <tr>
                <td>height</td>
                <td><input name="height" value={this.props.pokemonData.height} readonly="readonly" style={greyBox} /></td>
                </tr>
                <tr>
                <td>weight</td>
                <td><input name="weight" value={this.props.pokemonData.weight} readonly="readonly" style={greyBox} /></td>
                </tr>
                <tr>
                <td>Candy</td>
                <td><input name="candy" value={this.props.pokemonData.candy} readonly="readonly" style={greyBox} /></td>
                </tr>
                <tr>
                <td>Candy Count</td>
                <td><input name="candy_count" value={this.props.pokemonData.candy_count} readonly="readonly" style={greyBox} /></td>
                </tr>
                <tr>
                <td>Egg</td>
                <td><input name="egg" value={this.props.pokemonData.egg} readonly="readonly" style={greyBox} /></td>
                </tr>
                <tr>
                <td>Average Spawns</td>
                <td><input name="avg_spawns" value={this.props.pokemonData.avg_spawns} readonly="readonly" style={greyBox} /></td>
                </tr>
                <tr>
                <td>Spawn Time</td>
                <td><input name="spawn_time" value={this.props.pokemonData.spawn_time} readonly="readonly" style={greyBox} /></td>
                </tr>
                <tr>
                <td></td>
                <td><input type="submit"/></td>
                </tr>
                </table>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Form;