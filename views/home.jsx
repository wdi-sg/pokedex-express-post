var React = require('react');
class Home extends React.Component {
  render() {



    //
    let list;
    let pokeList;
    let sortArr = [];

    /*= this.props.pokedex.map(pokemon => {
        return pokemon.name;
    });*/
    this.props.pokedex.forEach(pokemon => {
      sortArr.push(pokemon.name)
    })


    var sortedList = sortArr.sort()

    if(this.props.query === "name") {
      list = sortedList.map(name => {
        return (
              <li>
                {/* <img src={name.img} alt=""/> */}
                <p> {name}</p>
              </li>
            )
      })
    } else {
      list = this.props.pokedex.map(pokemon => {

            var pokeList = pokemon.name

          return (
            <li>
              <img src={pokemon.img} alt=""/>
              <p> {pokeList}</p>
            </li>
          )
        })
    }




    return (
      <html>
        <body>
          <div>
         <h1>HOME</h1>
        <form method="GET" action="/pokemon/home" >
        <input type="submit" name="sortby" value="name" />
        </form>
        <h1>List of Pokemon</h1>
        <ol>
          {list}
        </ol>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;