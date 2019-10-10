var React = require('react');

class Delete extends React.Component {
  render() {
      let data = this.props;
    return (
      <html>
        <body>
          <div>
            <div><h3>Id: {this.props.id}</h3></div>
            <div><h3>Number: {this.props.num}</h3></div>
            <div><h1>Name: {this.props.name}</h1></div>
            <div><img src={this.props.img}/></div>
            <div><h3>Height: {this.props.height}</h3></div>
            <div><h3>Weight: {this.props.weight}</h3></div>

            <form action={"/pokemon/"+data.index+'?_method=delete'} method="POST">
              <div><h1>Delete this Pokemon?</h1></div>
              <div><input type="submit" value="Delete"/></div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;