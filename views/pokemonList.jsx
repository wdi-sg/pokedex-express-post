var React = require('react');

class pokemonList extends React.Component {
  render() {
    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
          </head>
        <body>
          <h1>List of Pokemon</h1>
          <form action="/pokemon/sort/?sort=name" method="POST"> 
          <button type="submit" className="btn btn-primary">Sort by Name</button>
          </form>
          <form action="/pokemon/sort/?sort=weight" method="POST"> 
          <button type="submit" className="btn btn-primary">Sort by Weight</button>
          </form>
          <form action="/pokemon/sort/?sort=height" method="POST"> 
          <button type="submit" className="btn btn-primary">Sort by Height</button>
          </form>
          <div dangerouslySetInnerHTML={{ __html: `${this.props.string}` }}></div>
        </body>
      </html>
    );
  }
}

module.exports = pokemonList;