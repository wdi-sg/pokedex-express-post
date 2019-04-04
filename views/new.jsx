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

class FillNewForm extends React.Component{
    render(){
        let formAction = '/pokemon/added'

        return(
            <div>
                <h4>Add Pokemon Details to FakeDex</h4>
                     <form method="POST" action={formAction} >
                        Enter your PokeMon Details<br></br>
                        Pokemon ID:<input type="text" name="id"/><br></br>
                        Pokemon Number: <input type="text" name="num"/><br></br>
                        Pokemon Name:   <input type="text" name="name"/><br></br>
                        How does it look like? (put an img link dude): <input type="text" name="img"/><br></br>
                        Height: <input type="text" name="height"/><br></br>
                        Weight: <input type="text" name="weight"/><br></br>
                        <input type="submit" value="Submit"/><br></br>
                    </form>
            </div>
        );
    }
}

class New extends React.Component {

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
                    <FillNewForm/>
                </main>
                <footer>
                </footer>
            </body>
        </html>
    );
  }
}

module.exports = New;