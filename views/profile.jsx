const React = require("react");

class Home extends React.Component {
  render() {
    const {
      id,
      num,
      name,
      img,
      height,
      weight,
      candy,
      candy_count,
      egg,
      avg_spawns,
      spawn_time,
    } = this.props;
    return (
      <html>
        <body>
          <h1>{name} Profile</h1>
          <div>
            <img src={img} alt={name} />
            <h3>{name}</h3>
            <p>
              ID: {id}
              <br />
              Number: {num}
              <br />
              Height: {height}
              <br />
              Weight: {weight}
              <br />
              Candy: {candy}
              <br />
              Candy Count: {candy_count}
              <br />
              Egg: {egg}
              <br />
              Average Spawns: {avg_spawns}
              <br />
              Spawn Time: {spawn_time}
            </p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
