const React = require('react');

class Home extends React.Component {
  render() {
    return (
        <body>
            <h1>POKEDEX EXPRESS JSX CONFUSING AF</h1>
            <a href="/pokemon/new">Create a new Pokemon!</a><br></br>
            <a href="/reset">Reset to original Pokedex</a><br></br>
            <form method="POST" action="/sort">
                <label htmlFor="pokemon-properties">Sort Pokemon By:</label>
                <select id="pokemon-properties" name="property">
                <option value="id">id</option>
                <option value="num">number</option>
                <option value="name">name</option>
                <option value="height">height</option>
                <option value="height">weight</option>
              </select>
              <input type="submit" formMethod="GET" value="Sort!"></input>
            </form>
        </body>
    );
  }
}

module.exports = Home;