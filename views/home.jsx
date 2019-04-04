var React = require('react');

class Home extends React.Component {

  render() {

    console.log(this.props.obj);


    const list = this.props.obj.map( item => {
      return <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.img}</td>
                <td>
                    <a className="btn btn-primary" href={`/pokemon/${item.id}`}>view</a>
                    <a className="btn btn-info"href={`/pokemon/${ item.id }/edit`}>edit</a>
                    <a className="btn btn-danger"href={`/pokemon/${ item.id }/delete`}>delete</a>
                </td>
            </tr>
    });


    // let formAction = '/pokemon/' + id + '?_method=PUT';

    return (
        <html>
            <head>
                <meta charSet="utf-8"/>
                <title>Welcome to Pokedex</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="/css/style.css"/>
            </head>
            <body>
            <h1>Welcome to Fakedex</h1>
                <nav>
                    <form>
                        <input type="hidden" name="sortby" value="id"/>
                        <input className="btn btn-success" type="submit" value="Sort Pokemon by ID"/>
                    </form>

                    <form>
                        <input type="hidden" name="sortby" value="name"/>
                        <input className="btn btn-success" type="submit" value="Sort Pokemon by Name"/>
                    </form>

                    <form action="/pokemon/newentry">
                        <input className="btn btn-primary" type="submit" value="Add new Pokemon"/>
                    </form>
                </nav>
            </body>
            <main>
                <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Picture</th>
                </tr>
                    {list}
                </table>
            </main>
        </html>
    );
  }
}

module.exports = Home;