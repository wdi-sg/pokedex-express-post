var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
          <h1>GOTTA CATCH THEM ALL! PATAMON! {this.props.id}</h1>
          <form action={"/pokemon/" + this.props.id+'?_method=put'} method="POST">
          <p>Num:</p><input type="number" name="num" value={this.props.number}/><br/>
          <p>Name:</p><input type="text" name="name" value={this.props.name}/><br/>
          <p>Image:</p><input type="text" name="img" value={this.props.img}/><br/>
          <p>Height:</p><input type="text" name="height" value={this.props.height}/><br/>
          <p>Weight</p><input type="text" name="weight" value={this.props.weight}/><br/>
          <input type="submit" value="Submit"/>
          </form>
          </div>
          </body>
          </html>
    );
  }
}

module.exports = Home;