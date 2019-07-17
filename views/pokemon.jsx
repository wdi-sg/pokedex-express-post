var React = require('react');

class Pokemon extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokemon.id + "?_method=PUT";
    var message = "";
    if (this.props.updated === true){
      message = 'This pokemon is updated';
    } else {
      message = "";
    }
    const feedbackStyle = {
      color: "red",
    };

    return (
      <html>
        <body>
          <div>
            <p style={feedbackStyle}>{message}</p>
            <h1>{this.props.pokemon.name}</h1>
            <p>ID: {this.props.pokemon.id}</p>
            <p>Num: {this.props.pokemon.num}</p>
            <p>Weight: {this.props.pokemon.weight}</p>
            <p>Height: {this.props.pokemon.height}</p>
            <img src={this.props.pokemon.img}/>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
