const React = require("react");

class New extends React.Component {
  render() {
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
            <h1 style={{ textAlign: `center` }}>Welcome to the Pokedex!</h1>
            <div
              style={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`
              }}
            >
              <img
                style={{ width: `30%` }}
                src="https://img.pokemondb.net/artwork/large/eevee-lets-go.jpg"
              ></img>
              <div style={{ textAlign: `center` }}>
                <form action="/pokemon/sortby" method="GET">
                  <select style={{ height: `30px`, marginRight:`5px` }} name="sortby">
                    <option value="name">Name</option>
                    <option value="weight">Weight</option>
                  </select>
                  <input className="btn-primary"
                    style={{ height: `30px`, borderRadius: `5px` }}
                    type="submit"
                    value="Sort"
                  />
                </form>
              </div>
            </div>
            <form action="/pokemon/new/" method="GET">
              <input
                style={{
                  borderRadius: `5px`,
                  margin: `0 auto`,
                  display: `block`,
                  marginTop: `20px`
                }}
                type="submit"
                value="Create New Pokemon"
              />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;