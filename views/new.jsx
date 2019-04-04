var React = require('react');

class New extends React.Component {

  render() {

    const id = this.props.id;
    const name = this.props.name;
    const num = this.props.num;
    const weight = this.props.weight;
    const height = this.props.height;
    const egg = this.props.egg;
    const img = this.props.img;

    let formAction = '/pokemon/added'

    return (
        <html>
            <head>
                <meta charSet="utf-8"/>
                <title>Welcome to Fakedex</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="/css/style.css"/>
            </head>
            <body>
            <h1>Welcome to Pokedex</h1>
                <nav>
                    <form method ="GET" action="/?sortby=id">
                        <input type="hidden" name="sortby" value="id"/>
                        <input className="btn btn-success" type="submit" value="Sort Pokemon by ID"/>
                    </form>

                    <form method ="GET" action ="/?sortby=name">
                        <input type="hidden" name="sortby" value="name"/>
                        <input className="btn btn-success" type="submit" value="Sort Pokemon by Name"/>
                    </form>
                </nav>
            </body>
            <main>
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
            </main>
        </html>
    );
  }
}

module.exports = New;