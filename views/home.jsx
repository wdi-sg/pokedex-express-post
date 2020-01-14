var React = require('react');
class PokemonPages extends React.Component {
  render() {
    return (
      <html>
        <body>
          <form action="/pokemon/?" method="GET">
            <select name="sortby">
              <option value="name">Name</option>
              <option value="weight">Weight</option>
              <option value="height">Height</option>
            </select>
            <input style={{borderRadius: `5px`}} type="submit" value="Sort" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = PokemonPages;