var React = require('react');
class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>

           <h1> NEW POKEMON</h1>

           <h2> The Pokemon you have added is {this.props.name}, ID number {this.props.id}/{this.props.num}</h2>

           <h3>Its height is {this.props.height} and its weight is {this.props.weight}</h3>




          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;