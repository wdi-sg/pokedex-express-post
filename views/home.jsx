var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>This is the home page</h1>
            <a href="/pokemon/new">Go to form</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;