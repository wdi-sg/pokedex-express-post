const React = require("react");

class Created extends React.Component {
  render() {
    console.log(this.props.pokemon);
    return (
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Created Pokemon!</title>
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
            <h2 style={{ margin: "10px" }}>
              You edited {this.props.pokemon.name}!
            </h2>
            <ul>
              <li>Id: {this.props.pokemon.id}</li>
              <li>Num: {this.props.pokemon.num}</li>
              <li>
                Image:{" "}
                <img
                  style={{ maxWidth: `30%`, maxHeight: `100px` }}
                  src={this.props.img}
                ></img>
              </li>
              <li>Height: {this.props.pokemon.height}</li>
              <li>Weight: {this.props.pokemon.weight}</li>
            </ul>
            <button style={{ borderRadius: `5px`, marginLeft:`20px` }}>
              <a href="/">Go Home</a>
            </button>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Created;
