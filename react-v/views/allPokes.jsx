var React = require('react');

class allPokes extends React.Component {
  render() {
    console.log("THIS PROPS:", this.props.currentJSON )



    const pokeList = this.props.pokemon.map( pokemon => {

      var link = "/pokemon/" + pokemon.id

      return ( <div>
        <a href={link}>
         {pokemon.id}. {pokemon.name}
        </a>
        <li><img src={pokemon.img}/></li>
        <li>{pokemon.id}</li>
        <li>{pokemon.name}</li>
        <li>{pokemon.height}</li>
        <li>{pokemon.weight}</li>

        </div>
      );

     });

    return (

      <div>
        {pokeList}
      </div>
    );

  }
}

module.exports = allPokes;




