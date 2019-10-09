var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Hello</h1>
            <a href = "http://127.0.0.1:3000/pokemon/new">Click me to add new pokemon</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;