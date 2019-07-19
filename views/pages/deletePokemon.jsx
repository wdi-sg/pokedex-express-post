var React = require('react'); // req npm library
var Header = require('../components/header'); // req file path

const bodyStyle = {
    textAlign: "center",
    backgroundColor: "black",
    color: "yellow"
}

class Deleteform extends React.Component {
  render() {
    return (
      <html>
        <body style={bodyStyle}>
          <div>
            <Header/>
            <h3>Are you sure you want to delete this pokemon?</h3>
            <form method="POST" action={"/pokemon/"+this.props.index+'?_method=DELETE'}>
                <img src={this.props.pokemonData.img}/><br/><br/>

                <input type="submit" value="Delete"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Deleteform;