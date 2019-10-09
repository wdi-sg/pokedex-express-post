var React = require("react");
class NewPokemon extends React.Component {
  render() {

    
    return (
      <html>
        <body>
          <h1>Add a New Pokemon</h1>
          <div>
            <form method="POST" action="/pokemon">
              <p>ID: <input type="text" name="id" required/></p>
              <p>NUM: <input type="text" name="num" required/></p>
              <p> NAME: <input type="text" name="name"  required/></p>
              <p>IMG: <input type="text" name="img" required /></p>
              <p>Height: <input type="text" name="height" required/></p>
              <p> Weight: <input type="text" name="weight" required/></p>
            
             
              <input type="submit" />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewPokemon;
