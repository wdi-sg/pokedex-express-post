var React = require('react');

class Landing extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Pokedex is loaded and ready...</h1>
            <img src="https://i.gifer.com/GEEd.gif"/>
            <h3>To begin, type in the filepath "/pokemon/id", where id is a numerical value between 1 and 151.</h3>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Landing;