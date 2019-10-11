var React = require('react');
class Landing extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>

<form method="GET" action="/?sortby=name">


          <h1>Sort Pokemon by name!</h1>
        <input type="submit" value="Sort by name!" />

</form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Landing;