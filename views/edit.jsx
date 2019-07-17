var React = require('react');

class Edit extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokemonId + "?_method=PUT";
    return (
      <html>
        <body>
          <div>
            <h1>Edit a Pokemon Data!!!!!!</h1>
            <p>Pokemon: {this.props.pokemon.name}</p>
            <form method= "POST" action={url}>
                <p>id</p>
                <input name="id" defaultValue={this.props.pokemon.id}/>
                <p>num</p>
                <input name="num" defaultValue={this.props.pokemon.num}/>
                <p>name</p>
                <input name="name" defaultValue={this.props.pokemon.name}/>
                <p>img</p>
                <input name="img" defaultValue={this.props.pokemon.img}/>
                <p>height</p>
                <input name="height" defaultValue={this.props.pokemon.height}/>
                <p>weight</p>
                <input name="weight" defaultValue={this.props.pokemon.weight}/>
                <p>candy</p>
                <input name="candy" defaultValue={this.props.pokemon.candy}/>
                <p>candy_count</p>
                <input name="candy_count" defaultValue={this.props.pokemon.candy_count}/>
                <p>egg</p>
                <input name="egg" defaultValue={this.props.pokemon.egg}/>
                <p>avg_spawns</p>
                <input name="avg_spawns" defaultValue={this.props.pokemon.avg_spawns}/>
                <p>spawn_time</p>
                <input name="spawn_time" defaultValue={this.props.pokemon.spawn_time}/>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;