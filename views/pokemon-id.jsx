let React = require("react");

class ID extends React.Component {
  render() {
    let pokemonId = this.props.name;
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>Page Title</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>{pokemonId}</body>
      </html>
    );
  }
}
module.exports = ID;
