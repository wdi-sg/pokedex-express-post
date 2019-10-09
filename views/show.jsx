const React = require('react');
const ReactDom = require('react-dom');

class Show extends React.Component {
  render() {
    console.log("show" + this.props.pokemon.name);
    return(
      <html>
        <body>
          <h1>Show</h1>
          <ul>
            <li>{this.props.pokemon.id}</li>
            <li>{this.props.pokemon.num}</li>
            <li>{this.props.pokemon.name}</li>
            <li><img src={this.props.pokemon.img}></img></li>
            <li>{this.props.pokemon.weight}</li>
            <li>{this.props.pokemon.height}</li>
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Show;