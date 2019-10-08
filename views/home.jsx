const React = require("react");

class Home extends React.Component {
  render() {
    const {pokeArr} = this.props;
    return (
      <html>
        <body>
          <h1>Pokedex</h1>
          <div>
            <form action="/" method="get">
              <select name="sortby">
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="weight">Weight</option>
                <option value="height">Height</option>
              </select>
              <button>
                  Sort
              </button>
            </form>
            {pokeArr.map((data, i) => (
              <div key={i} style={{borderTop: "1px solid black"}}>
                  <img src={data.img} alt={data.name} />
                  <h3>{data.name}</h3>
                  <p>
                    ID: {data.id}<br/>
                    Number: {data.num}<br/>
                    Height: {data.height}<br/>
                    Weight: {data.weight}<br/>
                    Candy: {data.candy}<br/>
                    Candy Count: {data.candy_count}<br/>
                    Egg: {data.egg}<br/>
                    Average Spawns: {data.avg_spawns}<br/>
                    Spawn Time: {data.spawn_time}
                  </p>
              </div>
            ))}
          </div>
        </body>
      </html>
    )
  }
}

module.exports = Home;
