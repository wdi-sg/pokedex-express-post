var React = require('react');
class editPoke extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>You are have edited Pokemon: {this.props.name}</h1>
            <img src={this.props.img} style={{width: 30 + '%'}} />
            <h2>{ this.props.name }'s height is { this.props.height }</h2>
            <h2>{ this.props.name }'s weight is { this.props.weight }</h2>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = editPoke;