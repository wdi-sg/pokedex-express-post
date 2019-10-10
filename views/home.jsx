var React = require('react');
class Home extends React.Component {
  render() {

    let props= this.props
  
    let pokeList = this.props.pokedex.map(pokemon => {
        return <li><p>{pokemon.name}</p>
                    <img src={pokemon.img}></img>        </li>
    })
    return (
      <html>
        <body>
            <h1>HOME </h1>
          <div>
            <ul>
                {pokeList}
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;