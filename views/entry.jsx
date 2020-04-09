var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1><u>#{this.props.num}:{this.props.name}</u></h1>
            <img src={this.props.img} alt=""/>
            <p><strong>Height</strong>: {this.props.height}</p>
            <p><strong>Weight</strong>: {this.props.weight}</p>
              
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;