var React = require('react');
class Home extends React.Component {
  render() {

    const PokemonName = this.props.pokemon.map( (pokemonName, index )=> {
                    return <option value={index}>{pokemonName}</option>
                        });
    const PokemonType = this.props.type.map( (type, index )=> {
                    return <option value={type}>{type}</option>
                        });
    return (
      <html>
        <body>
          <div>
            <h1 style={{textAlign: "Center"}}>Hello!</h1>

            <h2 style={{textAlign: "Center"}}>Click here to select Pokemon</h2>
                <form method="GET" action="/pokemon/index" style={{textAlign: "Center"}}>
                    <select id="options" name="options" >
                        {PokemonName}

                    </select>
                    <input type="submit" value="Submit"></input>
                </form>

            <h2 style={{textAlign: "Center"}}>Click here to select Pokemon Type</h2>
                <form method="GET" action="/pokemon/type" style={{textAlign: "Center"}}>
                    <select id="options" name="options" >
                        {PokemonType}

                    </select>
                    <input type="submit" value="Submit"></input>
                </form>

            <h2 style={{textAlign: "Center"}}>Click here to sort the current pokemon by categories.</h2>
                <form method="GET" action="/sortByName" style={{textAlign: "Center"}}>
                    <select id="options" name="options" >
                        <option value="Name" >Name</option>
                        <option value="Weight">Weight</option>
                        <option value="Height">Height</option>

                    </select>
                    <input type="submit" value="Submit"></input>
                </form>

            <h2 style={{textAlign: "Center"}}>Click here to add pokemon.</h2>
            <div style={{textAlign: "Center"}}>
            <a   href={"pokemon/new"}>Insert New Pokemon</a>
            </div>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;