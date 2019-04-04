var React = require('react');
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {

    let allPokemon = this.props.pokemon.map((o) => {
        return <tr>
                    <td>{ o.num }</td>
                    <td><img src={ o.img }/></td>
                    <td>{ o.name }</td>
                    <td>
                        <a className="btn btn-primary" href={`/pokemon/${ o.id }`}>view</a>
                        <a className="btn btn-info"href={`/pokemon/${ o.id }/edit`}>edit</a>
                        <a className="btn btn-danger"href={`/pokemon/${ o.id }/delete`}>delete</a>
                    </td>
              </tr>;
    });

    return (
            <DefaultLayout title="Welcome to Pokedex">
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
            </DefaultLayout>
    );
  }
}

module.exports = Home;