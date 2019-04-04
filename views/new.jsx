var React = require('react');

class Head extends React.Component{
    render(){
        return (
             <head>
                <meta charSet="utf-8"/>
                <title>Fake PokeDex: Your gateway to a slothlife</title>
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
                    <li class="nav-item col-3">
                        <form method="GET" action="/?sortby=id">
                            <input type="hidden" name="sortby" value="id"/>
                            <input className="btn btn-info" type="submit" value="Sort Pokemon by ID"/>
                        </form>
                    </li>
                    <li class="nav-item col-3">
                        <form method="GET" action="/?sortby=name">
                            <input type="hidden" name="sortby" value="name"/>
                            <input className="btn btn-info" type="submit" value="Sort Pokemon by Name"/>
                        </form>
                    </li>

                </nav>
        );
    }
}

class ChooseType extends React.Component{
    render(){
        return(
            <select class="form-control" name="type">
                            <option>Type</option>
                            <option value="normal">Normal</option>
                            <option value="fire">Fire</option>
                            <option value="water">Water</option>
                            <option value="rock">Rock</option>
                            <option value="normal">Normal</option>
                            <option value="ghost">Ghost</option>
                            <option value="poison">Poison</option>
                            <option value="bug">Bug</option>
                            <option value="dragon">Dragon</option>
                            <option value="ice">Ice</option>
                            <option value="flying">Flying</option>
            </select>
        );
    }
}

class FillNewForm extends React.Component{
    render(){
        let formAction = '/pokemon/added'

        return(
                    <div class="col">
                     <form method="POST" action={formAction} >
                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                <label >Name:</label>
                                <input type="text" name="name" class="form-control" required/>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label>ID:</label>
                                <input type="text" name="id" class="form-control"required/>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label>Number:</label>
                                <input type="text" name="num" class="form-control" required/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-3 mb-3">
                                <label>Pokemon Type:</label>
                                <ChooseType/>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label >Image Tag:</label>
                                <input type="text" name="img" class="form-control" required/>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label>Height:</label>
                                <input type="text" name="height" value="m" class="text-right form-control" required/>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label>Weight:</label>
                                <input type="text" name="weight" value="kg" class="text-right form-control" required/>
                            </div>
                        </div>
                        <input type="submit" value="Submit Entry"  class="btn btn-primary"/>
                    </form>
            </div>
        );
    }
}

class New extends React.Component {

  render() {

    const list = this.props.obj;

    return (
        <html>
            <Head/>
                <body>
                    <header>
                        <h1>Fakedex</h1>
                        <Navigation/>
                    </header>
                <main>
                    <h4><u>Add Pokemon Details</u></h4>
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