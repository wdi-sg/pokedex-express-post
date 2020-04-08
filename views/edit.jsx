var React = require('react');
class New extends React.Component {
  render() {
    return (
      <html>
        <body>
                  <div>

            <h1>Edit Pokemon: { this.props.name }</h1>
            <form method="POST" action={"/pokemon/"+this.props.id+"?_method=put"}>
            <br/>
            Name: <input type="text" name="name" value={ this.props.name }/>
            <br/>
            Image URL: <input type="text" name="img" value={ this.props.img }/>
            <br/>
            Height: <input type="text" name="height" value={ this.props.height }/>
            <br/>
            Weight: <input type="text" name="weight" value={ this.props.weight }/>
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