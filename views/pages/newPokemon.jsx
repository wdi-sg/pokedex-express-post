var React = require('react'); // req npm library
var Header = require('../components/header'); // req file path

const bodyStyle = {
    textAlign: "center",
    backgroundColor: "black",
    color: "yellow"
}

class Addform extends React.Component {
  render() {
    return (
      <html>
        <body style={bodyStyle}>
          <div>
            <Header/>
            <h3>Add New Pokemon</h3>
            <form method="POST" action={"/pokemon/"}>

                <p>Pokemon ID</p>
                <input type="number" name="id"/>
                <p>Pokemon Number</p>
                <input type="number" name="num"/>
                <p>Pokemon Name</p>
                <input name="name"/>
                <p>Pokemon Image Link</p>
                <input name="img"/>
                <p>Pokemon Height</p>
                <input name="height"/>
                <p>Pokemon Weight</p>
                <input name="weight"/><br/><br/>
                <input type="submit" value="Add Pokemon"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Addform;