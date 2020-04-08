var React = require('react');

class Index extends React.Component {
  render() {
    const pokeArray = this.props.pokeArray.map(pokemon => {
        let newLink = "/pokemon/" + pokemon;
        return <li><a href={newLink}> {pokemon}</a></li>
    })


    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link></head>
        <body>
          <div>
            <h1>Index of Pokemon</h1>
            <ul>
                {pokeArray}
            </ul>
          </div>
          <div className="alert alert-success" role="alert"><a href="/createPokemon" className="alert-link">Create New Pokemon</a></div>
        </body>
      </html>
    );
  }
}

module.exports = Index;