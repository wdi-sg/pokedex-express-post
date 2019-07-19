var React = require('react');

class Edit extends React.Component {
  render() {
    var bodyStyle = {
        backgroundColor:"#00b7ff",
        textAlign : "center"
    }
    var pic = {
            height : "200px",
            width : "200px"
        }

    var url = "/pokemon/"+this.props.pokemonId + "?_method=PUT";
    var urlHome = "/pokemon";
    return (
      <html>
        <body style={bodyStyle}>
          <div>
            <h1>Edit a Pokemon Data!!!!!!</h1>
            <img style = {pic} src ={this.props.pokemon.img}/>
            <p>Pokemon: {this.props.pokemon.name}</p>
            <form method= "POST" action={url}>
                <div>
                    <p>id</p>
                    <input name="id" readOnly = "readOnly" defaultValue={this.props.pokemon.id}/>
                    <p>num</p>
                    <input name="num" readOnly = "readOnly" defaultValue={this.props.pokemon.num}/>
                    <p>name</p>
                    <input name="name" defaultValue={this.props.pokemon.name}/>
                    <p>img</p>
                    <input name="img" defaultValue={this.props.pokemon.img}/>
                    <p>height</p>
                    <input name="height" defaultValue={this.props.pokemon.height}/>
                    <p>weight</p>
                    <input name="weight" defaultValue={this.props.pokemon.weight}/>
                    <br />
                    <button type="submit">Edit</button>
                </div>
            </form>
            <form method="get" action={urlHome}>
                <button type="submit">Home</button>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;