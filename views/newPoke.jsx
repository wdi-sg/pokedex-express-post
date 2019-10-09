var React = require('react');
class newPoke extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
          <h1>This Is The Pokemon You Created!</h1>
            <h1>{ this.props.name }</h1>
            <img src={this.props.img} />
            <h2>{ this.props.name }'s height is { this.props.height }</h2>
            <h2>{ this.props.name }'s weight is { this.props.weight }</h2>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = newPoke;