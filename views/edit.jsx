var React = require('react');

class Edit extends React.Component {
  render() {
      let pokemon = this.props.pokemonObj;
      console.log(pokemon);
      console.log(this.props);
    return (
      <html>
        <body>
          <div>
          <h1>POKEMON EDIT PAGE</h1>
      <form method="POST" action={"/putrequest/"+this.props.arrId+"?_method=PUT"}>
            <div>
                <p>id:</p> <input name="id" type="text" value={this.props.pokemonObj.id}/>
                <p>num:</p> <input name="num" type="text" value={this.props.pokemonObj.num}/>
                <p>name:</p> <input name="name" type="text" value={this.props.pokemonObj.name}/>
                <p>height:</p> <input name="height" type="text" value={this.props.pokemonObj.height}/>
                <p>weight:</p> <input name="weight" type="text" value={this.props.pokemonObj.weight}/>
                <p>candy:</p> <input name="candy" type="text" value={this.props.pokemonObj.candy}/>
                <p>candy_count:</p> <input candy_count="weight" type="text" value={this.props.pokemonObj.candy_count}/>
                <p>egg:</p> <input name="egg" type="text" value={this.props.pokemonObj.egg}/>
                <p>avg_spawns:</p> <input name="avg_spawns" type="text" value={this.props.pokemonObj.avg_spawns}/>
                <p>spawn_time:</p> <input name="spawn_time" type="text" value={this.props.pokemonObj.spawn_time}/>
                <p><input type="submit"/></p>
            </div>
          </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
