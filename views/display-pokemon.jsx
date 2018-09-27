const React = require('react');

const width = {
  width: '120px',
  height: '120px',
};

class DisplayPokemon extends React.Component {
  render() {
    const {
      id,
      num,
      name,
      img,
      height,
      weight,
      candy,
      candy_count: candyCount,
      egg,
      avg_spawns: avgSpawn,
      spawn_time: spawnTime,
    } = this.props.p;
    return (
      <html>
        <head>
          <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
          <title>Pokedex</title>
        </head>
        <body>
          <header>
            <nav className="navbar navbar-light bg-light">
              <a className="navbar-brand font-weight-bold" href="/">
                Pokedex
              </a>
            </nav>
          </header>
          <div className="container w-100 pt-3">
            <div className="row">
              <div className="col text-center">
                <div className="card mx-auto w-25">
                  <img className="card-img-top mx-auto mt-3" src={img} style={width} />
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <ul className="list-group list-group-flush text-justify">
                      <li className="list-group-item">Number: {num}</li>
                      <li className="list-group-item">Height: {height}</li>
                      <li className="list-group-item">Weight: {weight}</li>
                      <li className="list-group-item">Candy: {candy}</li>
                      <li className="list-group-item">Candy Count: {candyCount}</li>
                      <li className="list-group-item">Egg: {egg}</li>
                      <li className="list-group-item">Spawn Time: {spawnTime}</li>
                      <li className="list-group-item">Average Spawn: {avgSpawn}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = DisplayPokemon;
