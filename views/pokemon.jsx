var React = require('react');
var PokemonProfile  = require('./components/pokemonProfile.jsx');
var PokemonDetails  = require('./components/pokemonDetails.jsx');



class Pokemon extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokemon.id + "?_method=PUT";
    var editUrl = "/pokemon/"+this.props.pokemon.id +"/edit/";
    var message = "";
    if (this.props.updated === true){
      message = 'This pokemon is updated';
    } else {
      message = "";
    }
    const feedbackStyle = {
      color: "red",
    };

    return (
      <html>
        <body>
        <a href="/pokemon">Back to list</a>
        {message}
          <div>
            <PokemonProfile data={this.props.pokemon}/>
            <br/>
            <PokemonDetails data={this.props.pokemon}/>
          </div>
          <a href={editUrl}>Edit This Pokemon</a>
          <button>Delete This Pokemon</button>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
