var React = require('react');
class PokemonPages extends React.Component {
  render() {
    return (
      <html>
        <body>
          <span class="alert error-message"></span>
          <form action="/pokemon" method="POST">
          Pokemon Name: <input type="text" name="name"/><br></br>
          ID:<input type="text" name="id"/><br></br>
          Number:<input type="text" name="num"/><br></br>
          Image URL:<input type="text" type="text" name="img"/><br></br>
          Height:<input type="text" name="height"/><br></br>
          Weight:<input name="weight"/><br></br>
          <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = PokemonPages;