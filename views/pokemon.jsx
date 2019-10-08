var React = require('react');
class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
          <h1>Pokemon:</h1>
          <p>id: {this.props.id}</p> 
          <p>num: {this.props.num}</p>
          <p>name: {this.props.name}</p>
          <p>img: {this.props.img}</p>
          <p> height: {this.props.height}</p>
          <p> weight: {this.props.weight}</p>
    
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;