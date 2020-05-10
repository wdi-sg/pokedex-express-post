var React = require('react');
class New extends React.Component {
  render() {
    return (
      <html>
        <body>
                  <div>
                  { this.props.warning }

            <h1>Add a New Pokemon</h1>
            <form method="POST" action="http://localhost:3000/pokemon">
            <br/>
            Name: <input type="text" name="name"/>
            <br/>
            Image URL: <input type="text" name="img"/>
            <br/>
            Height: <input type="text" name="height"/>
            <br/>
            Weight: <input type="text" name="weight"/>
            <br/>
            <input type="submit" value="Submit"/>
            </form>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;