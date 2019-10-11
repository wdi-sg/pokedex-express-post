const React = require('react');
const ReactDom = require('react-dom');

class Show extends React.Component {
  render() {
    console.log("show" + this.props.pokedex.name);
    return(
      <html>
        <body>
          <h1>Show</h1>
          <ul>
              <li>{this.props.pokedex.id}</li>
              <li>{this.props.pokedex.num}</li>
              <li>{this.props.pokedex.name}</li>
              <li><img src={this.props.pokedex.img}></img></li>
              <li>{this.props.pokedex.weight}</li>
              <li>{this.props.pokedex.height}</li>
            </ul>
        </body>
      </html>
    );
  }
}

module.exports = Show;