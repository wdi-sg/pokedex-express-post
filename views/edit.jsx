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

class Edit extends React.Component {

  render() {

    const id = this.props.id;
    const name = this.props.name;
    const num = this.props.num;
    const weight = this.props.weight;
    const height = this.props.height;
    const egg = this.props.egg;
    const img = this.props.img;

    let formAction = '/pokemon/' + id + '?_method=PUT';

    return (

      <html>
            <Head/>
                <body>
                    <header>
                        <h1>Fakedex</h1>
                        <Navigation/>
                    </header>
                <main>
                    <h4><u>Edit Pokemon ENTRY?</u></h4>
                    <div>
                        <form method="POST" action={formAction} >
                            Name: <input type= "text" name="pokeName" value={name} /><br></br>
                            Num: <input type= "text" name="pokeNum" value={num} /><br></br>
                            Img: <input type= "text" name="pokeImg" value={img} /><br></br>
                            Weight: <input type= "text" name="pokeWeight" value={weight} /><br></br>
                            Height: <input type= "text" name="pokeHeight" value={height} /><br></br>
                            Egg Distance: <input type= "text" name="pokeEgg" value={egg} /><br></br>
                            <input type="submit" value="Save Changes" class="btn btn-info"/>
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

module.exports = Edit;