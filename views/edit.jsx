let React = require('react');

class Edit extends React.Component {
  render() {
    console.log("this is edit" + this.props.id)
    let put = '/pokemon/' + this.props.id + '?_method=put';
    console.log(put);
    return(
      <html>
        <body>
          <h1>Edit: {this.props.pokemon.name}</h1>
          <form action={put} method="POST">
            Pokemon details:<br/><br/>
            name: <input type="text" name="name" defaultValue={this.props.pokemon.name}/><br/><br/>
            img: <input type="text" name="img" defaultValue={this.props.pokemon.img}/><br/><br/>
            height: <input type="text" name="weight" defaultValue={this.props.pokemon.weight}/><br/><br/>
            weight: <input type="text" name="height" defaultValue={this.props.pokemon.height}/><br/><br/>
            <input type="submit" defaultValue="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;