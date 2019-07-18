
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
          <h1>List of All Pokemon (Unsorted)</h1>
            {pokemon}
        </body>
      </html>
    );
  }
}

module.exports = indexPage;