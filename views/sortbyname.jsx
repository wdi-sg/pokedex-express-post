var React = require('react');

class Sortbyname extends React.Component{

    render() {
      const nameFormat = this.props["pokemonNameArray"].map(el => {
        return <p>{el}</p>
      });

      return (
        <html>
          <body>
            <div>
              {nameFormat}
            </div>
          </body>
        </html>
      );
    }
}

module.exports = Sortbyname;