var React = require('react');

class Home extends React.Component {

  render() {
    console.log("Printing out this.props");
    console.log(this.props);
    console.log("Done with printing out this.props");
    console.log("Printing out this.props.respondKey");
    console.log(this.props.respondKey);
    console.log("Done with printing out this.props.respondKey");
    //this.props refers to the pokeList which is an array of pokemons' stats.
    console.log("Creating a loop now");

    let allPokemonStatsArr = this.props.respondKey.map(thisPokemonStats=>{
      let id = parseInt(thisPokemonStats.id);
      let num = thisPokemonStats.num;
      let name = thisPokemonStats.name;
      let image = thisPokemonStats.img;
      let weight = thisPokemonStats.weight;
      let candy = thisPokemonStats.candy;
      let candyCount = thisPokemonStats.candy_count;
      let egg = thisPokemonStats.egg;
      let avgSpawns = thisPokemonStats.avg_spawns;
      let spawnTime = thisPokemonStats.spawn_time;
        return(
          // <li>{id} {num} {name}</li>
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
    });
    // const allPokemonStats = allPokemonStatsArr.map(thisPokemonStats=>{
    //   //create one pokemon object
    //   console.log("First loop");
    //   console.log("inside first loop: "+thisPokemonStats.name);
    //   const pokemonName = thisPokemonStats.name;
    //   console.log("Second loop");
    //   console.log("inside second loop: "+pokemonName);
    //   return(
    //     <p>{pokemonName}</p>
    //   )
    // });

    // for (let i = 0; i < this.props.respondKey.length; i++){
    //   let id = this.props.respondKey[i].id;
    //   let num = this.props.respondKey[i].num;
    //   let name = this.props.respondKey[i].name;
    //   let image = this.props.respondKey[i].img;
    //   let weight = this.props.respondKey[i].weight;
    //   let candy = this.props.respondKey[i].candy;
    //   let candyCount = this.props.respondKey[i].candy_count;
    //   let egg = this.props.respondKey[i].egg;
    //   let avgSpawns = this.props.respondKey[i].avg_spawns;
    //   let spawnTime = this.props.respondKey[i].spawn_time;
      return (
        <div>
          {allPokemonStatsArr}
        </div>
      // <div>
      //   <h5>Pokemon ID: </h5>
      //   <p>{this.props.respondKey[0].id}</p>
      //   <h5>Pokemon Num: </h5>
      //   <p>{this.props.respondKey[0].num}</p>
      //   <h5>Pokemon Name: </h5>
      //   <p>{this.props.respondKey[0].name}</p>
      //   <h5>Pokemon Image: </h5>
      //   <img src = {this.props.respondKey[0].img}/>
      //   <h5>Pokemon Weight: </h5>
      //   <p>{this.props.respondKey[0].weight}</p>
      //   <h5>Pokemon candy: </h5>
      //   <p>{this.props.respondKey[0].candy}</p>
      //   <h5>Pokemon candy count: </h5>
      //   <p>{this.props.respondKey[0].candy_count}</p>
      //   <h5>Distance required to hatch Egg: </h5>
      //   <p>{this.props.respondKey[0].egg}</p>
      //   <h5>Pokemon Average Spawns: </h5>
      //   <p>{this.props.respondKey[0].avg_spawns}</p>
      //   <h5>Pokemon Spawn Time: </h5>
      //   <p>{this.props.respondKey[0].spawn_time}</p>
      // </div>
      )
    }
}

module.exports = Home;
