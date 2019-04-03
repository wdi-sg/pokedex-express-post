var React = require('react');

class editpokemon extends React.Component {
  render() {
    return (
      <div>
        <h1>Edit {this.props.name}</h1>
        <p>Pokemon ID: {this.props.id}</p>
        <p>Pokemon Number: {this.props.num}</p>
        <form method="POST" action={this.props.action}>
            Name: <input type="text" name="name" defaultValue={this.props.name}/>
            Image Link: <input type="text" name="img" defaultValue={this.props.img}/>
            Height: <input type="text" name="height" defaultValue={this.props.height}/>
            Weight: <input type="text" name="weight" defaultValue={this.props.weight}/>
            Candy: <input type="text" name="candy" defaultValue={this.props.candy}/>
            Candy Count: <input type="text" name="candy_count" defaultValue={this.props.candy_count}/>
            Egg: <input type="text" name="egg" defaultValue={this.props.egg}/>
            Average Spawns: <input type="text" name="avg_spawns" defaultValue={this.props.avg_spawns}/>
            Spawn Time: <input type="text" name="spawn_time" defaultValue={this.props.spawn_time}/>
            <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = editpokemon;