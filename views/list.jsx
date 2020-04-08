var React = require('react');

class Home extends React.Component {
  render() {
    const nameHolder =  this.props.names.map(pokemnName => {
        return <li>{pokemnName}</li>
    });
    return (
      <html>
        <body>
          <div>
            <h1>Hello, welcome to pokedex.</h1>
          </div>
          <div>
            <ul>
                {nameHolder}
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;