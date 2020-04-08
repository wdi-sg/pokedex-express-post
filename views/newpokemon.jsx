var React = require('react');

class Newpokemon extends React.Component{

    render() {
      console.log('hello');
      const el = (
        <div>
        <p>{this.props.pokemonDetails.img}</p>
        <p>{this.props.pokemonDetails.id}</p>
        <p>{this.props.pokemonDetails.name}</p>
        <p>{this.props.pokemonDetails.weight}</p>
        <p>{this.props.pokemonDetails.height}</p>
        </div>
        )

      return (
        <html>
          <body>
            <div>
              {el}
            </div>
          </body>
        </html>
      );
    }
}

module.exports = Newpokemon;