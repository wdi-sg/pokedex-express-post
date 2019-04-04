var React = require('react');

class Home extends React.Component {

  render() {

    const pokemon = this.props;
    //console.log(pokemon);

    var valueAttribute = `/pokemon/${pokemon.id}?_method=PUT`
    //console.log("pokemon id is" + pokemon.id)

    return (
        <html>
            <body>
                <h1>Edit Pokémon</h1>
                    <div>
                        <form method="POST" action={valueAttribute}>
                           <input type="number" name="id" value={pokemon["id"]}></input>
                            Num:<input type="text" name="num" value={pokemon["num"]}></input>
                             Name: <input type="text" name="name" value={pokemon["name"]}></input>
                             Image: <input type="text" name="img" value={pokemon["img"]}></input>
                             Height: <input type="text" name="height" value={pokemon["height"]}></input>
                             Weight: <input type="text" name="weight" value={pokemon["weight"]}></input>
                            <input type="submit" value="Submit"></input>
                        </form>

                    </div>

            </body>
        </html>
    );
  }
}

module.exports = Home;