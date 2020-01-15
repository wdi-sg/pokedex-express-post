const React = require("react");

class New extends React.Component {
  render() {
    const id = this.props.id;
    const name = this.props.name;
    const image = this.props.img;
    const height = this.props.height;
    const weight = this.props.weight;
    const filePath = "/pokemon/" + id + "?_method=put";
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
            <h1>Edit a Pokemon!</h1>
            <div style={{ marginBottom: `10px` }}>
              {this.props.errorMessage}
            </div>

            <form action={filePath} method="POST">
              <div style={{ paddingBottom: `10px` }}>
                <input
                  type="text"
                  placeholder="Pokemon name"
                  name="name"
                  value={name}
                />
              </div>
              <div style={{ paddingBottom: `10px` }}>
                <input
                  type="text"
                  placeholder="Pokemon image link"
                  name="img"
                  value={image}
                />
              </div>
              <div style={{ paddingBottom: `10px` }}>
                <input
                  type="text"
                  placeholder="Pokemon height"
                  name="height"
                  value={height}
                />
              </div>
              <div style={{ paddingBottom: `10px` }}>
                <input
                  type="text"
                  placeholder="Pokemon weight"
                  name="weight"
                  value={weight}
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Change!"
                  style={{ borderRadius: `5px`, marginRight: `10px` }}
                />
                <button style={{ borderRadius: `5px` }}>
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
