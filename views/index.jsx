
var React = require('react');

class indexPage extends React.Component {
  render() {

    const bodyStyle = {
      textAlign:'center',
      backgroundColor: 'lightcyan'
    };

    const divStyle = {
      backgroundColor: 'lightblue',
      display: 'inline-block',
      textAlign: 'center',
      width: 200,
      height: 320,
      marginRight: 5,
      marginBottom: 5,
      paddingTop: 20
    };


    const form =
      <form method="GET" action="/pokemon" style={{marginBottom: 30}}>
        <select name="sortby" style={{fontSize: 20, marginRight: 10}}>
        <option>Sort By</option>
        <option value="name">Name</option>
        <option value="weight">Weight</option>
        <option value="height">Height</option>
        </select>
        <input type="submit" value = "Sort!"/>
      </form>

    const pokemon = this.props.pokemon.map( element => {
      return(<div style={divStyle}><img src={element.img}/>
            <h3>{element.name}</h3>
            <p>ID: {element.id}</p>
            <p>Height: {element.height}</p>
            <p>Weight: {element.weight}</p>
            </div>
            )
    });

    return (
      <html>
        <body style={bodyStyle}>
          <h1>List of All Pokemon {this.props.status}</h1>
            {form}
            {pokemon}
        </body>
      </html>
    );
  }
}

module.exports = indexPage;