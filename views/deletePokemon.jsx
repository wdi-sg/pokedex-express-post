var React = require('react');

class Home extends React.Component {

  render() {
    //code logic goes here
    //form to sort by values
    var formAction = "/pokemon/"+this.props.data.id+"?_method=DELETE"
    var form =
      <form method="POST" action={formAction}>
      Pokemon ID
      <input type="text" name="id" value={this.props.data.id} disabled/>
      <input type="hidden" name="id" value={this.props.data.id}/>
      Pokemon Number
      <input type="text" name="num" value={this.props.data.num} disabled/>
      <input type="hidden" name="num" value={this.props.data.num}/>
      Pokemon Name
      <input type="text" name="name" value={this.props.data.name} disabled/>
      <input type="submit" value="delete pokemon"/>
      </form>


    return (
      <html>
        <body>
          <div>
            <h1>You are deleting {this.props.data.name}!</h1>
          </div>
          <div>
            {form}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
