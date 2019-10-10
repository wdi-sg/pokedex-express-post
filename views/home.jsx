var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <h1>Pokedex</h1>
          <form action="/pokemon">
            {/* <input type="hidden" name="sortby" value="name" /> */}
            <span>Sort by:</span>
            <select name="sortby">
              <option value="name">Name</option>
              <option value="weight">Weight</option>
              <option value="height">Height</option>
            </select>
            <br/>
            <input type="submit" value="Sort" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Home;
