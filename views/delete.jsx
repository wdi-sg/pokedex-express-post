var React = require('react');

class Delete extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokeId + "?_method=DELETE";
    return (
      <html>
        <body>
          <div>
            <h1>Delete a Pokemon</h1>
            <div>{this.props.pokey.name}</div>
            <br />
            <form action={url} method="POST">
                <div>ID:</div>
                <input name="id" value={this.props.pokey.id} readOnly/>
                <div>Num:</div>
                <input name="num" value={this.props.pokey.num} readOnly/>
                <div>Name:</div>
                <input name="name" value={this.props.pokey.name}/>
                <br />
                <input type="submit" value="Delete"/>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;