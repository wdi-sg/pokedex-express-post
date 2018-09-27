var React = require('react');

class Home extends React.Component {
  render() {

    let sortBy = this.props.sorted;
    let pokedex = this.props.pokedex;
    let sortLine = "";

    if (sortBy) {

      sortLine = "sorted by " + sortBy;

      switch (sortBy) {
        case "spawn_time":
          for (let i in pokedex) {
            let value = pokedex[i][sortBy].split(":");
            value = parseInt(value[0]*60) + parseInt(value[1]);
            pokedex[i][sortBy] = value;
          }
          pokedex = pokedex.sort((a, b) => {
            return a[sortBy] - b[sortBy];
          })
          break;
        case "name":
          pokedex = pokedex.sort((a, b) => {
            let nameA = a.name;
            let nameB = b.name;
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          })
          break;
        default:
          for (let i in pokedex) {
            let value = pokedex[i][sortBy].toString();
            value = value.replace(/"m"|"kg"/gi, "");
            value = parseFloat(value);
            pokedex[i][sortBy] = value;
          }
          pokedex = pokedex.sort((a, b) => {
            return a[sortBy] - b[sortBy];
          })
      }
    }

    let outputDex = pokedex.map( pokemon => {
      let pokeURL = "/" + pokemon.id;
      return <li><a href={pokeURL}><img src={pokemon.img} />{pokemon.name}</a></li>
    })

    return (
      <html>
        <header>
          <title>Pokedex</title>
        </header>
        <body>
          <h1>Pokedex {sortLine}</h1>
          <h2>Sort By:</h2>
          <form method="GET" action="/">
            <select name="sortby">
              <option value="id" selected>ID Number</option>
              <option value="name">Name</option>
              <option value="height">Height</option>
              <option value="weight">Weight</option>
              <option value="avg_spawns">Average Spawns</option>
              <option value="spawn_time">Spawn Time</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
          <ol>
            {outputDex}
          </ol>
        </body>
      </html>
    )
  }
}

module.exports = Home;
