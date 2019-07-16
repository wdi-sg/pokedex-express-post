var React = require('react');

var Layout = require('./layout');

class Sortedname extends React.Component {
  render() {

  const pokemons = this.props.pokemon.map( pokemon => {
  return <tr>
            <td>{pokemon.id}</td>
            <td>{pokemon.name}</td>
            <td><img src={pokemon.img}/></td>
            <td>
                <a href={`/pokemon/${pokemon.id}`} class="btn btn-primary">View</a>&nbsp;&nbsp;
                <a href={`/pokemon/${ pokemon.id }/edit`} class="btn btn-primary">edit</a>&nbsp;&nbsp;
                <a href={`/pokemon/${ pokemon.id }/delete`} class="btn btn-primary">delete</a>
            </td>
        </tr>
  })

    return (
        <Layout>

        <div align="center" class="mainDiv">
        <h1>Welcome to Pokedex!</h1><br/>
        <div class="buttonDiv col-9">
        <form>
             <input type="hidden" value="id" name="sortby"/>
             <input class="btn btn-primary" type="submit" value="Sort By Id"/>&nbsp;&nbsp;
        </form>
        <form>
             <input type="hidden" value="name" name="sortby"/>
             <input class="btn btn-primary" type="submit" value="Sort By Name"/>&nbsp;&nbsp;
        </form>
            <a href={"/pokemon/new"} class="btn btn-success">Create new pokemon</a>
        </div>
         <br/>
         <div class="tableDiv col-9">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <td scope="col">ID</td>
                        <td scope="col">Name</td>
                        <td scope="col">Image</td>
                        <td scope="col">Actions</td>
                    </tr>
                </thead>
            <tbody>
                {pokemons}
            </tbody>
            </table>
            </div>
            </div>

        </Layout>
    );
  }
}

module.exports = Sortedname;