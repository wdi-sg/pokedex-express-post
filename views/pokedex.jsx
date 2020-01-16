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
            <h1>Create a new Pokemon!</h1>
            {this.props.errorMessage}
            <form action="/pokemon" method="POST">
              <input type="text" placeholder="Pokemon " name="id" />
              <input type="text" placeholder="Pokemon Number" name="num" />
              <input type="text" placeholder="Pokemon Name" name="name" />
              <input type="text" placeholder="Pokemon Image Link" name="img" />
              <input type="text" placeholder="Pokemon Height" name="height" />
              <input type="text" placeholder="Pokemon weight" name="weight" />
              <input type="submit" value="submit" />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;