var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Hello, { this.props.name }!</h1>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;