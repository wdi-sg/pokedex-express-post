
var React = require('react');

class showPokemon extends React.Component {
  render() {
     let linkDelete= "../../"+this.props.id+"/delete";
     let linkEdit= "../../"+this.props.id+"/edit";
     console.log(this.props.id);
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
                <h1>Pokemon</h1>
                <div className="container h-100">
                    <img src={this.props.img}></img>
                    <br/>
                    <label >ID : {this.props.id}</label>
                    <br/>
                    <label >Num: {this.props.num}</label>
                    <br/>
                    <label>Name: {this.props.name}</label>
                    <br/>
                    <label>Weight: {this.props.weight}</label>
                    <br/>
                    <label>Height: {this.props.height}</label>
                </div>
               <a className="btn btn-primary ml-1 mr-1" href={linkEdit}>Edit</a>
                <a className="btn btn-primary mr-1" href={linkDelete}>Delete</a>
        </div>
    </div>
</div>
          </body>
      </html>
    );
  }
}

module.exports = showPokemon;