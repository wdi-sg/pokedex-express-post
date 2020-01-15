
var React = require('react');

class Home extends React.Component {
  render() {
        // let pokemonDisplay = {this.props.pokemonList};

               // {pokemonDisplay}
    return (
      <html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </head>
        <body>
          <div>
          <h1>Pokemon</h1>
                <a className="btn btn-primary" href="/pokemon/sortByID">Sort By ID</a>
                <a className="btn btn-primary" href="/pokemon/sortByName">Sort By Name</a>
                <a className="btn btn-primary" href="/pokemon/sortByNum">Sort By Num</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;