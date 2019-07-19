
var React = require('react');

class indexPage extends React.Component {
  render() {

    const form =
      <form method="GET" action="/pokemon">
        <select name="sortby">
        <option>Sort By</option>
        <option value="name">Name</option>
        <option value="weight">Weight</option>
        <option value="height">Height</option>
        </select>
        <input type="submit" value = "Sort!"/>
      </form>

    const pokemon = this.props.pokemon.map( element => {
      return(<div><img src={element.img}/>
            <h3>{element.name}</h3>
            <p>ID: {element.id}</p>
            <p>Height: {element.height}</p>
            <p>Weight: {element.weight}</p>
            </div>
            )
    });

    return (
      <html>
        <head>
            <link rel="stylesheet" href="/style.css"></link>
        </head>
        <body>
          <h1>List of All Pokemon {this.props.status}</h1>
            {form}
            {pokemon}
        </body>
      </html>

    );
  }
}

module.exports = indexPage;