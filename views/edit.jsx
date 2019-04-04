var React = require('react');

class Home extends React.Component {

  render() {

        let index = this.props.paramsKey;
        let pokeId = this.props.pokemon[index].id;
        let pokeNum = this.props.pokemon[index].num;
        let pokeName = this.props.pokemon[index].name;
        let pokeImg = this.props.pokemon[index].img;
        let pokeHeight = this.props.pokemon[index].height;
        let pokeWeight = this.props.pokemon[index].weight;
        let pokeCandy = this.props.pokemon[index].candy;
        let pokeEgg = this.props.pokemon[index].egg;
        let pokeAvgSpawn = this.props.pokemon[index].avg_spawns;
        let pokeSpawnTime = this.props.pokemon[index].spawn_time;
    return (
    <html>
        <body>
            <div><h1>YOUR POKEMAN GREW??? TEL ME ABOUT IT!1!!</h1></div>
            <form method="POST" action={`/pokemon/${this.props.paramsKey}/edit?_method=PUT`}>
            <div>ID:<input type="text" name="id" value={`${pokeId}`}/></div><br/>
            <div>Number:<input type="text" name="num" value={`${pokeNum}`}/></div><br/>
            <div>Pokemon Name:<input type="text" name="name" value={`${pokeName}`}/></div><br/>
            <div>Image:<input type="text" name="img" value={`${pokeImg}`}/></div><br/>
            <div>Height:<input type="text" name="height" value={`${pokeHeight}`}/></div><br/>
            <div>Weight:<input type="text" name="weight" value={`${pokeWeight}`}/></div><br/>
            <div>Candy:<input type="text" name="candy" value={`${pokeCandy}`}/></div><br/>
            <div>Egg:<input type="text" name="egg" value={`${pokeEgg}`}/></div><br/>
            <div>Average spawns:<input type="text" name="avg_spawns" value={`${pokeAvgSpawn}`}/></div><br/>
            <div>Spawn time:<input type="text" name="spawn_time" value={`${pokeSpawnTime}`}/></div><br/>
            <input type="submit" value="Submit"/>
            </form>
        </body>
    </html>
    );

  }


}

module.exports = Home;