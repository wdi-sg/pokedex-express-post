var React = require('react');

class Output extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h2>ID: { this.props.id }</h2>
            <h2>Pokemon Name: { this.props.name }</h2>
            <h2>Height: { this.props.height } | weight: { this.props.weight }</h2>
            <img src={ this.props.img }/>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Output;