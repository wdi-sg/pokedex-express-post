const React = require("react");

class New extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Document</title>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossorigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossorigin="anonymous"
          ></script>
        </head>
        <body>
          <div style={{ margin: `20px` }}>
            <h1 style={{ textAlign: `center` }}>Welcome to the Pokedex!</h1>
            <div style={{ textAlign: `center` }}>
              <form action="/sortby" method="GET">
                <select name="sortby">
                  <option value="name">Name</option>
                  <option value="weight">Weight</option>
                </select>
                <input style={{borderRadius: `5px`}} type="submit" value="Sort" />
              </form>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;
