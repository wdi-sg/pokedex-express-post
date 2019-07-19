var React = require('react'); // req npm library
var Header = require('../components/header'); // req file path

const bodyStyle = {
    textAlign: "center",
    backgroundColor: "black",
    color: "yellow"
}

class Editform extends React.Component {
  render() {
    return (
      <html>
        <body style={bodyStyle}>
          <div>
            <Header/>
            <h3>Edit Pokemon Data</h3>
            <form method="POST" action={"/pokemon/"+this.props.index+'?_method=PUT'}>
                <img src={this.props.pokemonData.img}></img>
                <p>Pokemon ID</p>
                <input type="number" value={this.props.pokemonData.id} name="id"/>
                <p>Pokemon Number</p>
                <input type="number" value={this.props.pokemonData.num} name="num"/>
                <p>Pokemon Name</p>
                <input value={this.props.pokemonData.name} name="name"/>
                <p>Pokemon Image Link</p>
                <input value={this.props.pokemonData.img} name="img"/>
                <p>Pokemon Height</p>
                <input value={this.props.pokemonData.height} name="height"/>
                <p>Pokemon Weight</p>
                <input value={this.props.pokemonData.weight} name="weight"/><br></br><br></br>
                <input type="submit" value="Edit Pokemon"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Editform;