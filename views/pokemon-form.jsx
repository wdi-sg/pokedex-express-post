var React = require("react");

class NewPokemon extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon/new">
              <h2>Add New Pokemon:</h2>
              <input type="text" name="name" placeholder="Name"/><br></br><br></br>
              <input type="text" name="img" placeholder="Image Link"/><br></br><br></br>
              <input type="text" name="height" placeholder="Height"/><br></br><br></br>
              <input type="text" name="weight" placeholder="Weight"/><br></br><br></br>
              <input type="submit" value="Submit"/><br></br>
            </form>
            <p>
              {this.props.comments}
            </p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewPokemon;
