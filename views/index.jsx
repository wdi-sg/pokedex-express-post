const React = require("react");

class New extends React.Component {
  render() {
    const pokemon = this.props.pokemon.map(poke => {
      const dir = "" + "pokemon/";
      const id = poke.id;
      const route = dir + id;
      return (
        <li>
          <a href={route}>{poke.name}</a>
        </li>
      );
    });

    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>Document</title>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossOrigin="anonymous"
          ></script>
        </head>

        <body>
          <div style={{ margin: `20px` }}>
            <h1 style={{ fontSize: `3rem` }}>Pokedex</h1>

            <form
              style={{ marginTop: `10px` }}
              action="/pokemon/sortby"
              method="GET"
            >
              <select
                style={{ height: `30px`, marginRight: `5px` }}
                name="sortby"
              >
                <option value="name">Alphabet</option>
                <option value="weight">Weight</option>
              </select>
              <input
                className="btn-primary"
                style={{
                  height: `30px`,
                  borderRadius: `5px`,
                  marginRight: `5px`
                }}
                type="submit"
                value="Sort"
              />
            </form>

            <button className="btn btn-primary" style={{ marginTop: `10px` }}>
              <a href="pokemon/new" style={{ color: `white` }}>
                Create New Pokemon!
              </a>
            </button>
          </div>
          <ul>{pokemon}</ul>
        </body>
      </html>
    );
  }
}

module.exports = New;