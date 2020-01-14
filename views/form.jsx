var React = require('react');
class PokemonPages extends React.Component {
  render() {
    return (
      <html>
        <body>
          <form action="/pokemon" method="POST">
          Pokemon Name: <input type="text" name="name"/><br>
          ID:<input type="text" name="id"/><br>
          Number:<input type="text" name="num"/><br>
          Image URL:<input type="text" type="text" name="img"/><br>
          Height:<input type="text" name="height"/><br>
          Weight:<input name="weight"/><br>
          <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = PokemonPages;