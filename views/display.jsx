var React = require('react');

class Display extends React.Component {
  render() {
    return (
      <html>
        <body>
            <div>
                <h1>This is your pokemon</h1><br/>
                <img src="https://media.giphy.com/media/j2xgBIuAgmrpS/giphy.gif"></img><br/>
                <h2>Id: { this.props.pokemon.id }</h2>
                <h2>Number: { this.props.pokemon.num }</h2>
                <h2>Name: { this.props.pokemon.name }</h2>
                <img src= {this.props.pokemon.img }/><br/>
                <h3>Height: { this.props.pokemon.height }</h3>
                <h3>Weight: { this.props.pokemon.weight }</h3>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Display;