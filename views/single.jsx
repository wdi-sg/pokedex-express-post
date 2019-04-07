var React = require('react');

class Single extends React.Component {

  render() {
    let stats = this.props;
    console.log("printing out stats");
    console.log(stats);
    console.log("done printing out stats");
      let id = parseInt(stats.id);
      let num = stats.num;
      let name = stats.name;
      let image = stats.img;
      let height = stats.height;
      let weight = stats.weight;
      let candy = stats.candy;
      let candyCount = stats.candy_count;
      let egg = stats.egg;
      let avgSpawns = stats.avg_spawns;
      let spawnTime = stats.spawn_time;

      return(
        <div>
          <h4>Pokemon ID: </h4>
          <p>{id}</p>
          <h4>Pokemon Number: </h4>
          <p>{num}</p>
          <h4>Pokemon Name: </h4>
          <p>{name}</p>
          <h4>Pokemon Image: </h4>
          <img src ={image}/>
          <h4>Pokemon Weight: </h4>
          <p>{weight}</p>
          <h4>Pokemon Candy: </h4>
          <p>{candy}</p>
          <h4>Pokemon Candy Count: </h4>
          <p>{candyCount}</p>
          <h4>Distance required to hatch egg: </h4>
          <p>{egg}</p>
          <h4>Average Number of Spanws: </h4>
          <p>{avgSpawns}</p>
          <h4>Average Spawn Time: </h4>
          <p>{spawnTime}</p>
        </div>
      )
    }
}

module.exports = Single;
