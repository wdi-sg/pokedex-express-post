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
          <div
            style={{ margin: `20px`, display: `flex`, flexDirection: `column` }}
          >
            <h1>Create a new Pokemon!</h1>
            {this.props.errorMessage}
            <form action="/pokemon" method="POST">
              <div>
                <input type="text" placeholder="Pokemon ID" name="id" />
              </div>
              <div>
                <input type="text" placeholder="Pokemon Number" name="num" />
              </div>
              <div>
                <input type="text" placeholder="Pokemon Name" name="name" />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Pokemon Image Link"
                  name="img"
                />
              </div>
              <div>
                <input type="text" placeholder="Pokemon Height" name="height" />
              </div>
              <div>
                <input type="text" placeholder="Pokemon Weight" name="weight" />
              </div>
              <div>
                <input type="submit" value="Submit!" />
                <button>
                  <a href="/">Go Home</a>
                </button>
              </div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;
