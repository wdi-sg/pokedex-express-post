var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello </h1>
        <h1>id is {this.props.id}</h1>
        <h1>num is {this.props.num}</h1>
        <h1>name is {this.props.name}</h1>

      </div>
    );
  }
}

module.exports = Home;