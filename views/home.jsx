var React = require('react');

class Home extends React.Component {
  render() {

    let allPokemon = this.props.pokemon.map( (o) => {
        return <tr>
                    <td>{ o.num }</td>
                    <td>{ o.name }</td>
                    <td>{ o.img }</td>
                    <td>
                    <a className="btn btn-primary" href={`/pokemon/${ o.id }`}>view</a>
                    <a className="btn btn-info"href={`/pokemon/${ o.id }/edit`}>edit</a>
                    <a className="btn btn-danger"href={`/pokemon/${ o.id }/delete`}>delete</a>
                    </td>
              </tr>;
    });

    return (
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Welcome to Pokedex</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="/css/style.css"/>
            </head>

            <body>
                <h1>Welcome to Pokedex</h1>
                <nav>
                    <form>
                        <input type="hidden" name="sortby" value="id"/>
                        <input className="btn btn-success" type="submit" value="Sort Pokemon by ID"/>
                    </form>

                    <form>
                        <input type="hidden" name="sortby" value="name"/>
                        <input className="btn btn-success" type="submit" value="Sort Pokemon by Name"/>
                    </form>

                    <form action="/pokemon/new">
                        <input className="btn btn-primary" type="submit" value="Add new Pokemon"/>
                    </form>
                </nav>

                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Pokemon</th>
                      <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        { allPokemon }
                    </tbody>
                </table>

            </body>
        </html>
    );
  }
}

module.exports = Home;