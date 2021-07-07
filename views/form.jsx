var React = require('react');

class Form extends React.Component {
  render() {
    return (
      <html>
          <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
          </head>
        <body>
          <div>
            <h1>Submit New Pokemon</h1>
            <form action="/pokemon" method="POST"> 
                {/* Start form */}
                <div className="form-group">
                    <label htmlFor="id-form">ID</label>
                    <input name="id" type="text" className="form-control-plaintext" id="id-form" readOnly value={this.props.idValue}/>
                    <small className="text-danger">{this.props.idErrorMessage}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="num-form">Num</label>
                    <input name="num" type="text" className="form-control-plaintext" id="num-form" readOnly value= {this.props.numValue}/>
                    <small className="text-danger">{this.props.numErrorMessage}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="name-form">Name</label>
                    <input name="name" type="text" className="form-control" id="name-form" placeholder="Enter Name"/>
                    <small className="text-danger">{this.props.nameErrorMessage}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="img-form">Image</label>
                    <input name="image" type="text" className="form-control" id="img-form" placeholder="Enter Image"/>
                    <small className="text-danger">{this.props.imageErrorMessage}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="height-form">Height</label>
                    <input name="height" type="text" className="form-control" id="height-form" placeholder="Enter Height"/>
                    <small className="text-danger">{this.props.heightErrorMessage}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="weight-form">Weight</label>
                    <input name="weight" type="text" className="form-control" id="weight-form" placeholder="Enter Weight"/>
                    <small className="text-danger">{this.props.weightErrorMessage}</small>
                </div>
        
                <button type="submit" className="btn btn-primary">Submit Information</button>
            {/* End form */}
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Form;