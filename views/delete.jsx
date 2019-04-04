var React = require('react');

class Head extends React.Component{
    render(){
        return (
             <head>
                <meta charSet="utf-8"/>
                <title>Welcome to Pokedex</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="/style.css"/>
            </head>
        );
    }
}

class Navigation extends React.Component{

    render (){

        return (
                <nav class="nav nav-tabs rows">
                    <li class="nav-item col">
                        <form method="GET" action="/?sortby=id">
                            <input type="hidden" name="sortby" value="id"/>
                            <input className="btn btn-info" type="submit" value="Sort Pokemon by ID"/>
                        </form>
                    </li>
                    <li class="nav-item col">
                        <form method="GET" action="/?sortby=name">
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

class Delete extends React.Component {

  render() {

// add a new page with a form ( it will be a form with only a single button )
// make the path for this page /pokemon/:id/delete
// submit the form to /pokemon/:id with method DELETE
    const id = this.props.id;
    const name = this.props.name;
    const num = this.props.num;
    const weight = this.props.weight;
    const height = this.props.height;
    const egg = this.props.egg;
    const img = this.props.img;
    const zero = 0;

    let formAction = '/pokemon/' + id + '?_method=DELETE';

    return (
      <html>
            <Head/>
                <body>
                    <header>
                        <h1>Fakedex</h1>
                        <Navigation/>
                    </header>
                <main>
                    <h4><u>DELETE Pokemon ENTRY?</u></h4>
                    <div>
                        <form method="POST" action={formAction} >
                            Name: <input type= "text" name="pokeName" value={name} /><br></br>
                            Num: <input type= "text" name="pokeNum" value={num} /><br></br>
                            <input type="submit" value="Delete Pokemon Record?" class="btn btn-danger" />
                        </form>
                    </div>
                </main>
                <footer>
                </footer>
            </body>
        </html>
    );
  }
}

module.exports = Delete;

//this form needs reworking