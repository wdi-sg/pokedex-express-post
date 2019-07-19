var React = require('react');

class Home extends React.Component {
  render() {
    let optionData =  this.props.option.map( (option) => {
        return <option value={option}>{option}</option>;
    });
    let pokemonData = this.props.pokemonObj.pokemon.map((pkm) => {
        return <div style={{display: 'flex', flexDirection: 'column', flexShrink: '1', justifyContent: 'center',margin: '10px', width: '160px', height: '160px', backgroundColor: 'lightgrey', borderRadius: '15px'}}><img src={pkm.img} height='120px' width='120px' style={{margin:'0 auto'}}></img><p style={{verticalAlign:'text-top', textAlign:'center', margin: '0 auto'}}>ID:{pkm.id} - {pkm.name}</p></div>;
    });
    console.log(this.props);
    console.log(">>>>>>>>   Displaying home.jsx");
    return (
      <html>
        <body>
          <div>
            <h1>Pokedex</h1>
        <form method="get" action="/pokemon/sort">
            <select name="keys">
                {optionData}
            </select>
            <select name="order">
            <option value="asc">Ascending</option>
            <option value="dsc">Descending</option>
            </select>
            <input type="submit"></input>
            </form>
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
              {pokemonData}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
