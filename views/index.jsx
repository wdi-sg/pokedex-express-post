const React = require('react');

class Index extends React.Component {
  render() {
    const keys = Object.keys(this.props.object.pokemon[0]).map(key => (
      <option key={key} value={key}>
        {key}
      </option>
    ));

    return (
      <html>
        <head>
          <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
          <title>Pokedex</title>
        </head>
        <body>
          <header>
            <nav className="navbar navbar-light bg-light">
              <a class="navbar-brand font-weight-bold" href="/">
                Pokedex
              </a>
            </nav>
          </header>
          <div className="container w-100 pt-5">
            <div className="row">
              <div className="col mx-auto text-center">
                <form action="/" method="get">
                  <label className="pr-2 font-weight-bold" htmlFor="sortby">
                    Sort Pokemons by
                  </label>
                  <select className="form-control w-50 mx-auto" name="sortby" id="">
                    {keys}
                  </select>
                  <br />
                  <input className="btn btn-danger font-weight-bold" type="submit" name="" id="" />
                </form>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Index;
