var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Hello, welcome to pokedex.</h1>
          </div>
          <div>
          <h2>What would you like to do?</h2>
          <p>1. <a href="http://localhost:3000/pokemon/new">Create a new pokemon</a></p>
          <p>2. <a href="http://localhost:3000/pokemon/list">Go Directly to the dex!</a></p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;