var React = require('react');

class Pokeeditform extends React.Component {
  render() {
    return (
    <html>
        <header>
          <title> POKEDEX </title>
          <link rel="stylesheet" href="/style.css"></link>
        </header>
      <div>
        <h1> Edit The Stats of {this.props.name} </h1>
        <form method="post" action="/pokemon/pokeeditnew">
            <label for="id">Id</label>
            <input type="text" name="id" value={this.props.id} readonly="readonly"/> <br/><br/>

            <label for="num">Num</label>
            <input type="num" name="id" value={this.props.num}/> <br/><br/>

            <label for="name">Name</label>
            <input type="text" name="name" value={this.props.name}/> <br/><br/>

            <label for="img">Img</label>
            <input type="text" name="img" value={this.props.img}/> <br/><br/>

            <label for="height">Height</label>
            <input type="text" name="height" value={this.props.height}/> <br/><br/>

            <label for="weight">Weight</label>
            <input type="text" name="weight" value={this.props.weight}/> <br/><br/>

            <label for="candy">Candy</label>
            <input type="text" name="candy" value={this.props.candy}/> <br/><br/>

            <label for="candy_count">Weight</label>
            <input type="text" name="candy_count" value={this.props.candy_count}/> <br/><br/>

            <label for="egg">Egg</label>
            <input type="text" name="egg" value={this.props.egg}/> <br/><br/>

            <label for="avg_spawns">Avg Spawns</label>
            <input type="text" name="avg_spawns" value={this.props.avg_spawns}/> <br/><br/>

            <label for="spawn_time">Spawn Time</label>
            <input type="text" name="spawn_time" value={this.props.spawn_time}/> <br/><br/>

            <input type="submit" value="Submit"/>
        </form>
      </div>
    </html>
    );
  }
}

module.exports = Pokeeditform;








            // <input type="text" name="id" value={this.props.id}/> <br/>
            // <input type="text" name="id" value={this.props.num}/> <br/>
            // <input type="text" name="id" value={this.props.name}/> <br/>
            // <input type="text" name="id" value={this.props.img}/> <br/>
            // <input type="text" name="id" value={this.props.height}/> <br/>
            // <input type="text" name="id" value={this.props.weight}/> <br/>