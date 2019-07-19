var React = require('react');

class Eachpokemon extends React.Component {
  render() {
    // const pokemonLis = this.props.map((pokemon) => {
    //     return <List data={pokemon}/>
    // })

    return (
      <html>
        <body>
          <div>
            <p>Pokemon ID: {this.props.id}</p>
            <p>Number: {this.props.num}</p>
            <p>Name: {this.props.name}</p>
            <img src={this.props.img}/>
            <p>Height: {this.props.height}</p>
            <p>Weight: {this.props.weight}</p>
          </div>
        </body>
      </html>
    );
  }
}
// ?_method=PUT
module.exports = Eachpokemon;