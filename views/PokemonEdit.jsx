import React from 'react';

class PokemonEdit extends React.Component {
  render() {
    const path = '/pokemon/' + this.props.id + '?_method=PUT';
    const height = parseFloat(this.props.height).toFixed(2);
    const weight = parseFloat(this.props.weight).toFixed(1);

    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
        </head>
        <body>
          <div className="container">
            <h1 className="text-center">{this.props.name}</h1>
            <form method="POST" action={path}>
              <div className="form-group">
                <label htmlFor="id">Id</label>
                <input className="form-control" type="number" name="id" value={this.props.id} disabled />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" type="text" name="name" value={this.props.name} pattern=".{2,}" title="2 characters minimum" required />
              </div>
              <div className="form-group">
                <label htmlFor="img">Image</label>
                <input className="form-control" type="url" name="img" value={this.props.img} required />
              </div>
              <div className="form-group">
                <label htmlFor="height">Height (m)</label>
                <input className="form-control" type="text" name="height" value={height} pattern="^([0-9])+(\.)*([0-9])*" title="Any number" required />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input className="form-control" type="text" name="weight" value={weight} pattern="^([0-9])+(\.)*([0-9])*" title="Any number" required />
              </div>
              <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

export default PokemonEdit;
