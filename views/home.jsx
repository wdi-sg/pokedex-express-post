var React = require('react');

class Home extends React.Component {

  render() {

    // let pokedexArray = this.props.pokemon;
    console.log("8");

    let pokemonArray = this.props.pokemon;
    console.log("11");
    console.log(pokemonArray);

    let list = pokemonArray.map(string => {
        return <div>{string}</div>;

    });

    return (
        <html>
            <body>
                <h1>Welcome to Pokedex</h1>
                <form method="get" action="/">
                        <select name="sortby">
                            <option value="" name=""></option>
                            <option name="sortByName" value="Name">Name</option>
                            <option name="sortById" value="Id">ID</option>
                        </select>
                        <input type="submit" value="submit"/>
                </form>
                {list}
            </body>
        </html>
    );
  }


}

module.exports = Home;