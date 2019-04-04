var React = require('react');

class Head extends React.Component{
    render(){
        return (
             <head>
                <meta charSet="utf-8"/>
                <title>Welcome to Pokedex</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="style.css"/>
            </head>
        );
    }
}

class Navigation extends React.Component{

    render (){

        return (
                <nav class="nav nav-tabs rows">
                    <li class="nav-item col">
                        <form>
                            <input type="hidden" name="sortby" value="id"/>
                            <input className="btn btn-info" type="submit" value="Sort Pokemon by ID"/>
                        </form>
                    </li>
                    <li class="nav-item col">
                        <form>
                            <input type="hidden" name="sortby" value="name"/>
                            <input className="btn btn-info" type="submit" value="Sort Pokemon by Name"/>
                        </form>
                    </li>
                    <li class="nav-item col">
                        <form action="/pokemon/newentry">
                            <input className="btn btn-success" type="submit" value="Add new Pokemon"/>
                        </form>
                    </li>
                </nav>
        );
    }
}

class MainList extends React.Component{

    render(){

    const sortList = this.props.data;
    console.log("At MAIN LIST STUFF: " + sortList);

    const outList = sortList.map( item => {
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

        return (
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Picture</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                    <tbody>
                        {outList}
                    </tbody>
            </table>
        );
    }
}

class MainGrid extends React.Component{

    render(){

    const sortList = this.props.data;
    console.log("At MAIN LIST STUFF: " + sortList);

    const outList = sortList.map( item => {
      return    <div class="col-lg-4">
                    <h4>{item.id}</h4>
                    <h3>{item.name}</h3>
                    <img src={item.img}/>
                    <div class="row">
                        <a className="btn btn-primary" href={`/pokemon/${item.id}`}>view</a>
                        <a className="btn btn-info"href={`/pokemon/${ item.id }/edit`}>edit</a>
                        <a className="btn btn-danger"href={`/pokemon/${ item.id }/delete`}>delete</a>
                    </div>
                </div>
    });

        return (
            <div class="row">
                {outList}
            </div>
        );
    }
}

class Home extends React.Component {

  render() {

    const list = this.props.obj;
    console.log("at home: " + list);

    // let formAction = '/pokemon/' + id + '?_method=PUT';

    return (
        <html>
            <Head/>
                <body>
                    <header>
                        <h1>Welcome to Fakedex</h1>
                        <Navigation/>
                    </header>
                <main>
                    <div class="container">
                        <MainGrid data={list}/>,
                    </div>
                </main>
                <footer>
                </footer>
            </body>
        </html>
    );
  }
}

module.exports = Home;