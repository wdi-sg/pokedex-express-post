var React = require('react');

class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>This is Pokemon: {this.props.pokemon.name}</h1>
          </div>

          <div>
            <form action={"/pokemon/" + this.props.pokemon.id + "/edit"}>
                <button type="submit">EDIT</button>
            </form>

            <form action={"/pokemon/" + this.props.pokemon.id + "/delete"}>
                <button type="submit">DELETE</button>
            </form>

            <p>Name: {this.props.pokemon.name}</p>
            <p>Weight: {this.props.pokemon.weight}</p>
            <p>Height: {this.props.pokemon.height}</p>
            <img src={this.props.pokemon.img}/>

          </div>

        </body>
      </html>
    );
  }
}

module.exports = Pokemon;