const React = require('react');
class Typelist extends React.Component {
  render() {

      const results = this.props.list

      const list = results.map( pokemon => {
        return  (<li style={ {listStyleType: "none"}} key={pokemon.id}>
                <a href={`/pokemon/${pokemon.id}`}>
                  {pokemon.name}
                </a>
                </li>)
      })

    return (
      <html lang="en" dir="ltr">
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/></head>
        <body style={{fontFamily: "sans-serif", textAlign: "center"}}>
          <h2>{this.props.query}-type Pokemon</h2>
          <ul>{list}</ul>
        </body>
      </html>
    );
  }
}

module.exports = Typelist;
