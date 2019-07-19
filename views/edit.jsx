var React = require('react');

class Edit extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokeId + "?_method=PUT";
    var id = parseInt(this.props.pokey.id);
    return (
      <html>
        <body>
          <div>
            <h1>Edit a Pokemon</h1>
            <div><img src = {this.props.pokey.img}/></div>
                <form action={url} method="POST">
                <p>ID: <input type ="number" name="id" value={parseInt(id)} readOnly/></p>
                <p>Num: <input type ="text" name="num" value={this.props.pokey.num} readOnly/></p>
                <p>Name: <input type ="text" name="name" value={this.props.pokey.name}/></p>
                <p>Image: <input type ="text" name="img" value={this.props.pokey.img}/></p>
                <p>Height: <input type ="text" name="height" value={this.props.pokey.height}/></p>
                <p>Weight: <input type ="text" name="weight" value={this.props.pokey.weight}/></p>
                <p>Candy: <input type ="text" name="candy" value={this.props.pokey.candy}/></p>
                <p>Candy Count: <input type ="text" name="candy_count" value={this.props.pokey.candy_count}/></p>
                <p>Egg: <input type ="text" name="egg" value={this.props.pokey.egg}/></p>
                <p>Average Spawns: <input type ="text" name="avg_spawns" value={this.props.pokey.avg_spawns}/></p>
                <p>Spawn Time: <input type ="text" name="spawn_time" value={this.props.pokey.spawn_time}/></p>

                <input type="submit"/>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;