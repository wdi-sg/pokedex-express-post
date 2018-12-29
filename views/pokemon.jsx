//add a form at the path: `/pokemon/:id/edit`

var React = require('react');

class Home extends React.Component {
  render() {
    // console.log("THIS PROPS:", this.props.pokemon )
    let pokemonId = this.props.pokemon.id;
    let actionUrl = '/pokemon/'+pokemonId+'?_method=PUT'
    return (
      <div>
        <h1>Edit Pokemon</h1>
        <form method="POST" action={actionUrl}>
            <p>id</p>
            <input name="id" value={this.props.pokemon.id}/>
            <p>name</p>
            <input name="num" value={this.props.pokemon.num}/>
            <p>height</p>
            <input name="name" value={this.props.pokemon.name}/>
            <input name="img" value={this.props.pokemon.img}/>
            <input name="height" value={this.props.pokemon.height}/>
             <input name="weight" value={this.props.pokemon.weight}/>
            <input type="submit"/>
        </form>
      </div>
    );
  }
}

module.exports = Home;


