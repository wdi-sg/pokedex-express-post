var React = require('react');
class Home extends React.Component {
    
  render() {
    var pokedex = this.props.pokemon;
    var list = [];
    pokedex.forEach(pokemon => {
        var pokemon = `#${pokemon.num} : ${pokemon.name}`
        list.push(pokemon);
    });
    list = list.map(pokemon =>{
        return <li>{pokemon}</li>
    })
    return (
      <html>
        <body>
          <div>
            <h1><u>List of Pokemon:</u></h1>
            <ul>{list}</ul>
            
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;