var React = require('react');
class Edit extends React.Component {
  render() {
    return (
        <html>
        <title>{ this.props.indexPokemon.name }</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
        <body>
            <div className="container">
            <h1>Hello, { this.props.indexPokemon.name }!</h1>
            <img src={this.props.indexPokemon.img} alt="Logo"/>
            <h3>Height: {this.props.indexPokemon.height}</h3>
            <h3>Weight: {this.props.indexPokemon.weight}</h3>
            <h3>Candy: {this.props.indexPokemon.candy}</h3>
            <form method="POST" action="/pokemon/:id?_method=put">
            <div className="form-group">
                <label for="exampleInputEmail1">Edit Form</label>
                <input type="text" class="form-control" name="name" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Edit from here"/>
                <small id="emailHelp" class="form-text text-muted">This allows you to edit the pokemon you want.</small>
                </div>
                <button type="submit" class="btn btn-primary">Edit</button>
                </form>
            </div>
        </body>
        </html>
    );
  }
}

module.exports = Edit;