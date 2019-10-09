var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
                  <div>
                  { this.props.warning }

            <h1>Would you like to:</h1>
            <a href="http://localhost:3000/pokemon/">Add a New Pokemon?</a><br/><br/>
            Or Search for a Pokemon by Number?<br/>
                        <form method="Get" action="http://localhost:3000/pokemon/id">
            ID: <input type="text" name="id"/>
            <br/>
            <input type="submit" value="Submit"/>
            </form>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;