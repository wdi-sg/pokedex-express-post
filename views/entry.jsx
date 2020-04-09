var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1><u>#{this.props.num}:{this.props.name}</u></h1>
            <img src={this.props.img} alt=""/>
            <p>Height: {this.props.height}</p>
            <p>Weight: {this.props.weight}</p>
              
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;