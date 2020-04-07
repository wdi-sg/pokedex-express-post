var React = require('react');
class newpokemon extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1 style={{textAlign: "Center"}}>Hello!</h1>
            <h2 style={{textAlign: "Center"}}>The following pokemon is added by you</h2>
            <p style={{textAlign: "Center"}}>Name of Pokemon: {this.props.name}. ID: {this.props.id}. Height:{this.props.height} Weight:{this.props.weight}</p>


            <h2 style={{textAlign: "Center"}}>Click here to add pokemon.</h2>
            <form method="GET" action="/pokemon/new" style={{textAlign: "Center"}}>
            <input type="submit" value="Insert New Pokemon"></input>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = newpokemon;