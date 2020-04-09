var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Pokedex</h1>
            <form method="GET" action="/pokemon/sortby">
              <select id="sort" name="selector">
                <option value="name">Sort by Name</option>
                <option value="weight">Sort by Weight</option>
                <option value="height">Sort by Height</option>
              </select>
              <input type="submit" value="Enter" ></input>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;