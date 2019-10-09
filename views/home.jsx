var React = require('react');
class Home extends React.Component {
  render() {
    
    const list = this.props.pokedex.map(pokemon => {
      return (
        <li>
          <img src={pokemon.img} alt=""/>
          <p> {pokemon.name}</p>
        </li>
      )
    })
    return (
      <html>
        <body>
          <div>
         <h1>HOME</h1>
        <form method="GET" action="/?" >
        <input type="submit" name="sortby" value="Sort By Name"/>
        </form>
        <h1>List of Pokemon</h1>
        <ol>
          {list}
        </ol>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;