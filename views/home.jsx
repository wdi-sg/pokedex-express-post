const React = require ( 'react' );



class apple extends React.Component {
  render() {
    console.log("this props is: ", this.props.poke.id)

    let pokemonData = this.props.poke
    let actionUrl = '/pokemon/' + pokemonData.id + '?_method=PUT'
    console.log(actionUrl)

    return (
                <div>
                <h1>{pokemonData.name}</h1>

                <img src = {pokemonData.img}></img>

                <form method="POST" action={actionUrl}>
                    <p>Id</p>
                    <input name="id" value ={pokemonData.id}/>

                    <p>Num</p>
                    <input name="id" value ={pokemonData.num}/>

                    <p>Name</p>
                    <input name="id" value ={pokemonData.name}/>

                    <p>Image</p>
                    <input name="id" value ={pokemonData.img}/>

                    <p>Height</p>
                    <input name="id" value ={pokemonData.height}/>

                    <p>Weight</p>
                    <input name="id" value ={pokemonData.weight}/>

                    <p>Candy</p>
                    <input name="id" value ={pokemonData.candy}/>

                    <p>Candy Count</p>
                    <input name="id" value ={pokemonData.candy_count}/>

                    <p>Egg</p>
                    <input name="id" value ={pokemonData.egg}/>

                    <p>Average Spawns</p>
                    <input name="id" value ={pokemonData.avg_spawns}/>

                    <p>Spawn Time</p>
                    <input name="id" value ={pokemonData.spawn_time}/>

                    <p></p>
                    <input type= "submit" />


                    </form>
                    </div>
    );
  }
}

module.exports = apple;