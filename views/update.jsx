
var React = require('react');

class Update extends React.Component {
  render() {
      let formAction = '/pokemon/' + this.props.id + '?_method=put';
      return (
          <html>
              <body>
                  <h2>Editing Pokemon!</h2>
                  <form method="POST" action={formAction}>
                      ID: <input type="number" name="id" value={ this.props.id } required/><br/>
                      Number: <input type="number" name="num" value={ this.props.num } required/><br/>
                      Name: <input type="text" name="name" value={ this.props.name } required/><br/>
                      Img URL: <input type="url" name="img" value={ this.props.img } required/><br/>
                      Height: <input type="text" name="height" placeholder="in metres" value={ this.props.height } required/><br/>
                      Weight: <input type="text" name="weight" placeholder="in kilograms" value={ this.props.weight } required/><br/>
                      <input type="submit" value="Submit"/>
                  </form>
              </body>
          </html>
      );
  }
}

module.exports = Update;
