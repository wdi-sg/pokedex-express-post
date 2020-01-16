var React = require('react');
class Edit extends React.Component {
  render() {
    let id = "/pokemon/"+this.props.id+"?_method=put";

    return (

      <html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
      </head>
        <body>
          <div>
          <h1>
          Edit Pokemon {this.props.pokemon[this.props.id].name}
          </h1>
            <form method="POST" action={id}>
            <p>ID: </p>
            <input name="id" type="input" value={this.props.pokemon[this.props.id].id}/>
            <p>NAME: </p>
            <input name="name" type="input" value={this.props.pokemon[this.props.id].name}/>
            <p>NUM: </p>
            <input name="num" type="input" value={this.props.pokemon[this.props.id].num}/>
            <p>IMG: </p>
            <input name="img" type="input" value={this.props.pokemon[this.props.id].img}/>
            <p>WEIGHT: </p>
            <input name="weight" type="input" value={this.props.pokemon[this.props.id].weight}/>
            <p>HEIGHT: </p>
            <input name="height" type="input" value={this.props.pokemon[this.props.id].height}/>
            <p>
            <input type="submit" value="edit this"/>
            </p>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;