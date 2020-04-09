var React = require('react');
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class Home extends React.Component {
    
  render() {
    var pokedex = this.props.pokemon;
    var list = [];
    pokedex.forEach(pokemon => {
        var pokemon = `#${pokemon.num} : ${pokemon.name}`
        list.push(<li>
            {pokemon}
            {/* <Link to={`/pokemon/${pokemon.id}`} >{pokemon}</Link> */}
           </li>);
    });
    
    return (
      <html>
        <body>
          <div>
            <h1><u>List of Pokemon:</u></h1>
            {/* <Router> */}
            <ul>{list}</ul>
            {/* </Router> */}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;