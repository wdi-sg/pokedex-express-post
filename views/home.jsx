
var React = require('react');

class Home extends React.Component {
  render() {
      return (
          <html>
              <body>
                  <h1>Welcome to the Pokedex</h1>
                  <h3>Sort by </h3>
                  <form method="GET" action="/pokemon?">
                      <select name="sortby">
                          <option value="name">Name</option>
                          <option value="height">Height</option>
                          <option value="weight">Weight</option>
                      </select>
                      <input type="submit"/>
                  </form>
              </body>
          </html>
          )
  }
}

module.exports = Home;
