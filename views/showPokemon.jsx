
var React = require('react');

class showPokemon extends React.Component {
  render() {
    let editLink ="/pokemon/"+{this.props.pokemon.id}+"/edit";
    let showLink = "/pokemon/"+{this.props.pokemon.id}+"/delete";
    return (
      <html>
      <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </head>
        <body>
<div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6">
            <form method="POST" action="/pokemon">
                <h1>Pokemon</h1>
                <div className="container h-100">
                <div className="form-group">
                    <label >ID : {this.props.id}</label>
                </div>
                <div className="form-group">
                    <label >Num: {this.props.num}</label>

                 <div className="form-group">
                    <label>Name: {this.props.name}</label>
                </div>
                                <div className="form-group">
                    <label>Image: {this.props.img}</label>
                </div>
                                <div className="form-group">
                    <label>Weight: {this.props.weight}</label>

                </div>
                                <div className="form-group">
                    <label>Height: {this.props.height}</label>
                </div>
                <button type="submit" className="btn btn-primary btn-customized" href={editLink}>Edit</button>
                    <button type="submit" className="btn btn-primary btn-customized ml-1" href={deleteLink}>Delete</button>
                </div>
                </div>
                </form>
        </div>
    </div>
</div>
          </body>
      </html>
    );
  }
}

module.exports = showPokemon;