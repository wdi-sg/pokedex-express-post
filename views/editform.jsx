var React = require('react');

class Editform extends React.Component {
  render() {

    return (
      <html>
        <body>
          <div>
            <h1>Edit your pokemon: {this.props.name}</h1>
            <form method="POST" action={"/pokemon/"+this.props.id}>
              Pokemon info:<br/>
              <p>id</p>
              <input type="text" name="id" value={this.props.id}/><br/>
              <p>number</p>
              <input type="number" name="num" value={this.props.num}/><br/>
              <p>name</p>
              <input type="text" name="name" value={this.props.name}/><br/>
              <p>img</p>
              <input type="url" name="img" value={this.props.img}/><br/>
              <p>height</p>
              <input type="text" name="height" value={this.props.height}/><br/>
              <p>weight</p>
              <input type="text" name="weight" value={this.props.weight}/><br/>
              <p>
              <input type="submit" value="submit"/>
              </p>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Editform;