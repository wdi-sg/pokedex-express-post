var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>The Pokeform</h1>
            <form method="GET" action="/sort">
                <h1>Sort Pokemon by</h1>
                <select id="pokemon-properties" name="sortby">
                    <option value="id">id</option>
                    <option value="num">number</option>
                    <option value="name">name</option>
                    <option value="height">height</option>
                    <option value="weight">weight</option>
                </select>
              <input type="submit"></input>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;