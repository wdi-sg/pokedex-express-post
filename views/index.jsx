var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, { this.props.name }!</h1>
      </div>
    );
  }
}

module.exports = Home;