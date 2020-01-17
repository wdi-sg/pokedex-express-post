
var React = require('react');

class Edit extends React.Component {
  render() {
    let formUrl = "/pokemon/"+this.props.id+"?_method=put";
    return (
      <html>
      <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </head>
        <body>
          <a className="btn btn-primary ml-1 mr-1" href="/pokemon/home">Home</a>
<div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6">

            <form method="POST" action={formUrl}>

                <div className="form-group">
                       <h1>Edit Pokemon</h1>
                    <label >ID</label>
                    <input type="text" className="form-control" name="id" value={this.props.id}/>
                </div>
                <div className="form-group">
                    <label >Num</label>
                    <input type="num" className="form-control" name="num" value={this.props.num}/>
                </div>
                 <div className="form-group">
                    <label>Name</label>
                    <input type="name" className="form-control" name="name" value={this.props.name}/>
                </div>
                                <div className="form-group">
                    <label>Image</label>
                    <input type="img" className="form-control" name="img" value={this.props.img}/>
                </div>
                                <div className="form-group">
                    <label>Weight</label>
                    <input type="weight" className="form-control" name="weight" value={this.props.weight}/>
                </div>
                                <div className="form-group">
                    <label>Height</label>
                    <input type="height" className="form-control" name="height" value={this.props.height}/>
                </div>
                <button type="submit" className="btn btn-primary btn-customized">Edit</button>
            </form>
        </div>
    </div>
</div>
          </body>
      </html>
    );
  }
}

module.exports = Edit;