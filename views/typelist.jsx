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
        <body style={{fontFamily: "sans-serif", textAlign: "center"}}>
          <h2>{this.props.query}-type Pokemon</h2>
          <ul>{list}</ul>
        </body>
      </html>
    );
  }
}

module.exports = Typelist;
