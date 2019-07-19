var React = require('react');

class Home extends React.Component {

  render() {
    //code logic goes here
    //form to sort by values
    var formAction = "/pokemon/"+this.props.data.id+"?_method=DELETE"
    var form =
      <form method="POST" action={formAction}>
      <p>Pokemon ID</p>
      <input type="text" name="id" value={this.props.data.id} disabled/>
      <input type="hidden" name="id" value={this.props.data.id}/>
      <p>Pokemon Number</p>
      <input type="text" name="num" value={this.props.data.num} disabled/>
      <input type="hidden" name="num" value={this.props.data.num}/>
      <p>Pokemon Name</p>
      <input type="text" name="name" value={this.props.data.name} disabled/>
      <input type="submit" value="delete pokemon"/>
      </form>


    return (
      <html>
        <body style={{backgroundColor: "rgba(0,0,0,0.5)", textAlign:"center"}}>
          <div>
            <h1 style={{color: "#FFFFFF"}}>You are deleting {this.props.data.name}!</h1>
          </div>
          <div style={{color: "#FFFFFF", width:"10%", margin:"0 auto"}}>
            {form}
          </div>
          <div>
            <p style={{color: "#FFFFFF"}}><a href="/pokemon">Back to main</a></p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
