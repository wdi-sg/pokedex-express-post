var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
                  <div>
                  { this.props.data }

            <h1>Pokedex Post!</h1>
            <form method="POST" action="http://localhost:3000/pokemon">
            Pokedex Name:<br/>
            <input type="text" name="id"/>
            <input type="submit" value="Submit"/>
            </form>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;