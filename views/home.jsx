var React = require('react');

class Home extends React.Component{
    render() {
        const formStyle = {
            "text-align": "center"
        }

        const optionStyle = {
            width: "125px",
            height: "30px",
            "font-size": "20px"
        }

        const pokemonStyle = {
            display: "flex",
            "flex-wrap": "wrap"

        }

        const createNewPokemon = {
            "text-align": "center",
            margin: "20px"
        }
        const listOfPokemon = this.props.pokemonNameArray.map(el => {
            return(
                <div style={{display:"inline-block"}, {margin: "5px"}}>
                    <a href={`./singlepokemon/${el.toLowerCase()}`}>{el}</a>
                </div>
            );
        });

        return (
          <html>
            <body>
              <div>
                <form method="get" action="/sortby" style={formStyle}>
                  <select name="option" size ="1" style={optionStyle}>
                    <option value="name">name</option>
                    <option value="id">id</option>
                    <option value="height">height</option>
                    <option value="weight">weight</option>
                    <option value="candy">candy</option>
                    <option value="egg">egg</option>
                  </select><br></br>
                  <input type="submit" value="Sort By"></input>
                </form>
                <div style={createNewPokemon}>
                    <a href={"./new"}>Create a New Pokemon</a>
                </div>
                <div style={pokemonStyle}>
                    {listOfPokemon}
                </div>
              </div>
            </body>
           </html>
        );
    }
}

module.exports = Home;