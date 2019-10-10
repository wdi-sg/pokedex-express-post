var React = require('react');
class Show extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <div><h3>Id: { this.props.id }</h3></div>
            <div><h3>Number: { this.props.num }</h3></div>
            <div><h1>Name: { this.props.name }</h1></div>
            <div><img src={ this.props.img }/></div>
            <div><h3>Height: { this.props.height }</h3></div>
            <div><h3>Weight: { this.props.weight }</h3></div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Show;