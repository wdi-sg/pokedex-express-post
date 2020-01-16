const React = require("react");

class Created extends React.Component {
  render() {
    console.log(this.props.id);
    const id = parseInt(this.props.id);
    const editPath = "/pokemon/" + id + "/edit";
    const pokemonName = this.props.name
    return (
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>{pokemonName}!</title>
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
          <h2 style={{ margin: "10px" }}>
            {this.props.name}!
          </h2>
          <ul>
            <li>Id: {this.props.id}</li>
            <li>Num: {this.props.num}</li>
            <li>
              Image:{" "}
              <img
                style={{ maxWidth: `30%`, maxHeight: `100px` }}
                src={this.props.img}
              ></img>
            </li>
            <li>Height: {this.props.height}</li>
            <li>Weight: {this.props.weight}</li>
          </ul>
          <button style={{ borderRadius: `5px`, marginLeft:`20px` }}>
            <a href={editPath}>Edit {pokemonName}</a>
          </button>
        </body>
      </html>
    );
  }
}

module.exports = Created;
