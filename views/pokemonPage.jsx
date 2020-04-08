var React = require('react');

class pokemonPage extends React.Component {
  render() {
    const editLink = "/pokemon/" + this.props.name + "/edit"
    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link></head>

        <body>
          <div>
            <h1>{this.props.name}</h1>
          </div>
          <a href= {editLink}>Edit {this.props.name}</a>
          <br></br>
          <br></br>
          <a href="/types"> See Types of Pokemon </a>
        </body>
      </html>
    );
  }
}

module.exports = pokemonPage;