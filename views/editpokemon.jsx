var React = require('react');

class editpokemon extends React.Component {
  render() {
    return (
      <div>
        <h1>Edit {this.props.name}</h1>
        <p>Pokemon ID: {this.props.id}</p>
        <p>Pokemon Number: {this.props.num}</p>
        <form method="POST" action={this.props.action}>
            Name: <input type="text" name="name" value={this.props.name}/>
            Image Link: <input type="text" name="img" value={this.props.img}/>
            Height: <input type="text" name="height" value={this.props.height}/>
            Weight: <input type="text" name="weight" value={this.props.weight}/>
            Candy: <input type="text" name="candy" value={this.props.candy}/>
            Candy Count: <input type="text" name="candy_count" value={this.props.candy_count}/>
            Egg: <input type="text" name="egg" value={this.props.egg}/>
            Average Spawns: <input type="text" name="avg_spawns" value={this.props.avg_spawns}/>
            Spawn Time: <input type="text" name="spawn_time" value={this.props.spawn_time}/>
            <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = editpokemon;

// let  respond =  '<h1>EDIT banan '+ pokemonId+'</h1>'+
        //                 '<form method="POST" action="/animals/'+pokemonId+'?_method=PUT">'+
        //                 'Animal Name:<input type="text" name="animalname" value="'+record.name+'">'+
        //                 '<input type="text" name="weight" value="'+record.weight+'">'+
        //                 '<input type="submit" value="Submit">'+
        //                 '</form>';