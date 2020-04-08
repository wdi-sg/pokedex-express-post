var React = require('react');

class Sortbyname extends React.Component{

    render() {
      const typeFormat = this.props["pokemonTypesArray"].map(el => {
        return (
          <div>
            <p>{el}</p>
            <p>{this.props["pokemonTypesObject"][`${el}`]}</p>
          </div>
        )
      });

      return (
        <html>
          <body>
          <h1>Types of Pokemon</h1>
            <div>
              {typeFormat}
            </div>
          </body>
        </html>
      );
    }
}

module.exports = Sortbyname;