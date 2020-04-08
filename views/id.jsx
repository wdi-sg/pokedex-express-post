var React = require('react');
class Id extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <img src={this.props.img}></img>
          </div>
          <div>
            <p>This is { this.props.name }</p>
            <a href="/pokemon/edit">Edit Pokemon Details</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Id;