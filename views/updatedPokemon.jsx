var React = require('react');

class Home extends React.Component {

  render() {
    //code logic goes here
    var pokelink = '/pokemon/'+this.props.pokeinfo.id
    return (
      <html>
        <body style={{backgroundColor: "rgba(0,0,0,0.5)", textAlign:"center"}}>
          <div style={{color: "#FFFFFF"}}>
            <h1>Thank you for updating!</h1>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <p><a href={pokelink}>Check out your pokemon!</a></p>
          </div>
          <div>
            <p style={{color: "#FFFFFF"}}><a href="/pokemon">Back to main</a></p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
