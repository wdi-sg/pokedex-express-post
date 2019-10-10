var React = require('react');

class Display extends React.Component {
  render() {
    return (
      <html>
        <body>
            <div>
                <h1>This is your pokemon</h1><br/>
                <img src="https://media.giphy.com/media/j2xgBIuAgmrpS/giphy.gif"></img><br/>
                <h2>Id: { this.props.id }</h2>
                <h2>Number: { this.props.num }</h2>
                <h2>Name: { this.props.name }</h2>
                <img src= {this.props.img }/><br/>
                <h3>Height: { this.props.height }</h3>
                <h3>Weight: { this.props.weight }</h3>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Display;