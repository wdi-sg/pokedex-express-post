var React = require('react');

class Home extends React.Component{
    render() {
        const listOfPokemon = this.props.pokemonNameArray.map(el => {
            return(
                <div>
                    <a href={`./singlepokemon/${el.toLowerCase()}`}>{el}</a>
                </div>
            );
        })

        return (
          <html>
            <body>
              <div>
                <form method="get" action="/sortby">
                  <select name="option" size ="1">
                    <option value="name">name</option>
                    <option value="id">id</option>
                    <option value="height">height</option>
                    <option value="weight">weight</option>
                    <option value="candy">candy</option>
                    <option value="egg">egg</option>
                  </select><br></br>
                  <input type="submit" value="Sort By"></input>
                </form>
                {listOfPokemon}
              </div>
            </body>
           </html>
        );
    }
}

module.exports = Home;