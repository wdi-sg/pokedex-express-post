import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
        </head>
        <body>
          <div className="container">
            <h1 className="text-center">Welcome to Pokedex</h1>
            <form action="/pokemon">
              <div className="form-group">
                <label htmlFor="sortby">Sort Pokemons by</label>
                <select className="form-control" name="sortby" id="sortby">
                  <option disabled selected value>Sort by...</option>
                  <option value="id">id</option>
                  <option value="name">name</option>
                  <option value="height">height</option>
                  <option value="weight">weight</option>
                </select>
              </div>
              <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

export default Home;
