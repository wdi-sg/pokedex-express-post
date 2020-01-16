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
          <title>404: Page Not Found!</title>
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
          <h1
            style={{
              textAlign: "center",
              fontFamily: "Helvetica",
              margin: 20 + "px"
            }}
          >
            404: Page Not Found!
          </h1>
          <div>
            <img
              style={{
                margin: "0 " + "auto",
                display: "block",
                width: "40" + "%"
              }}
              src="http://wallpoper.com/images/00/41/43/46/pokemon-snorlax_00414346.png"
              alt=""
            />
            <button
              style={{
                margin: "0 " + "auto",
                display: "block",
                borderRadius:`5px`
              }}
            ><a href="/">Go Home</a>

            </button>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;