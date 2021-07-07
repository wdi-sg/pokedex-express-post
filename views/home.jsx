var React = require("react");
class Home extends React.Component {
  render() {
    let pokeList;

    // Sort By Name
    if (this.props.query === "name") {
      let sortArr = [];
      
      this.props.pokedex.forEach(pokemon => {
        sortArr.push(pokemon.name);
      });
      var sortedList = sortArr.sort();
      pokeList = sortedList.map(name => {
        return (
          <li>
            <p>{name}</p>
          </li>
        );
      });
      console.log(pokeList);
    //   Render the entire List of Pokemon
    } else {
      pokeList = this.props.pokedex.map(pokemon => {
        return (
          <li>
            <p>{pokemon.name}</p>
            <img src={pokemon.img}></img>
          </li>
        );
      });
    }

    return (
      <html>
        <body>
          <h1>HOME </h1>
          <form method="GET" action="/pokemon">
            <input type="submit" name="sortby" value="name" />
          </form>
          <div>
            <ul>{pokeList}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
