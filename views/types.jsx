var React = require('react');

class Types extends React.Component {
  render() {
    const pokeArray = this.props.typesWithPokemonArray.map(objel => {
        let header = objel.type
        let body = objel.pokemon.map(poke => {
            let pokeLink = "/pokemon/" + poke
            return <li><a href={pokeLink}>{poke}</a></li>
        })

        return <div>
                <li>{header}</li>
                <ul>{body}</ul>
              </div>
    })


    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link></head>

        <body>
          <div>
            <h1>Types of Pokemon</h1>
            <ul>
                {pokeArray}
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Types;