var React = require('react');
var PokemonDetails = require('./PokemonDetails');

class Pokemon extends React.Component {

  render() {

    return (

      <html> 
        <body style={{'width': '80%', 'margin': 'auto'}}>
            <header style = {{ 'textAlign': 'center'}}>
                <h1 style={{'width': '800px', 'textAlign': 'center'}}> Welcome to Pokedex</h1>
            </header>
            <form  method="get" action="/">
                <label style={{'fontSize': '20px'}} htmlFor="choice">Choose your sorting option : </label>
                <select style={{'fontSize': '20px'}} name="choice" id="choice">
                  <option style={{'fontSize': '16px'}} value="">--Please choose your option--</option>
                  <option style={{'fontSize': '16px'}} value="name">Sort By Name</option>
                  <option style={{'fontSize': '16px'}} value="height">Sort By Height</option>
                  <option style={{'fontSize': '16px'}} value="weight">Sort By Weight</option>
                </select>
                <input type="submit" name="sort" style={{'padding': '5px', 'fontSize': '1rem',  'fontWeight': 'bold', 'marginLeft': '30px', 'outline': 'none', 'backgroundColor': 'red', 'color': 'white', 'borderRadius': '5px', 'width': '70px'}} value="Sort" onClick="redirect()" />
            </form>

            {
             
                <PokemonDetails pokemonList = {this.props.pokemonList} />
              
              
            }
            
        </body>
      </html>
  
    )
  }

}

module.exports = Pokemon;
