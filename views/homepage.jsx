let React = require("react");

class Home extends React.Component {
  render() {
    let pokedex = this.props.pokemon;
    let pokemonHTML = pokedex.map(pokemonObj => {
      return (
        <tr>
          <th scope="row">{pokemonObj.num}</th>
          <td>
            <img src={pokemonObj.img} />
          </td>
          <td>{pokemonObj.name}</td>
          <td>buttons</td>
        </tr>
      );
    });
    return (
      <html>
        <head>
          <title>Pokedex</title>
          <link rel="stylesheet" type="text/css" media="screen" href="/reset.css" />
          <link
            rel="stylesheet"
            type="text/css"
            media="screen"
            href="/pokemon-display.css"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
        </head>
        <body>
          <div className="pokemon-display-container container">
            <div className="row">
              <div className="col">
                <form action="/pokemon" method="GET">
                  <button type="submit" name="sort" value="name" class="btn btn-primary">
                    Sort By Name
                  </button>
                </form>
              </div>
            </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Links</th>
                  </tr>
                </thead>
                <tbody>{pokemonHTML}</tbody>
              </table>
            </div>
          </div>
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
            crossorigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"
          />
        </body>
      </html>
    );
  }
}
module.exports = Home;
