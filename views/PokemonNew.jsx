import React from 'react';

class PokemonNew extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
        </head>
        <body>
          <div className="container">
            <h1 className="text-center">Create A New Pokemon</h1>
            <form method="POST" action='/pokemon'>
              <div className="form-group">
                <label htmlFor="id">Id</label>
                <input className="form-control" type="number" name="id" required />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" type="text" name="name" pattern=".{2,}" title="2 characters minimum" required />
              </div>
              <div className="form-group">
                <label htmlFor="img">Image</label>
                <input className="form-control" type="url" name="img" required />
              </div>
              <div className="form-group">
                <label htmlFor="height">Height (m)</label>
                <input className="form-control" type="text" name="height" pattern="^([0-9])+(\.)*([0-9])*" title="Any number" required />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input className="form-control" type="text" name="weight" pattern="^([0-9])+(\.)*([0-9])*" title="Any number" required />
              </div>
              <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
          </div>
        </body>
      </html>

    );
  }
}

export default PokemonNew;
