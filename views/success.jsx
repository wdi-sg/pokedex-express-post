var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
            <h1>New Pokemon submitted</h1>
            <p><a href="/pokemon/new">Submit again</a></p>
        </body>
      </html>
    );
  }
}

module.exports = Home;
