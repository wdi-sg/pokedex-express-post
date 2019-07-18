var React = require('react');

class Pokepage extends React.Component {
  render() {

    let editurl = "/pokemon/" + this.props.id + "/edit";
    let deleteurl = "/pokemon/" + this.props.id + "/delete";

    return (
      <html>
      <head>
        <title>Pokedex</title>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <header>
        <nav>
            <ul id="nav-container">
                <li className="item"><a href="/pokemon">Home</a></li>
                <li className="item"><a href="/pokemon/new">New</a></li>
                <li className="item"><a href="null">Types</a></li>
                <div id="bar"></div>
            </ul>
        </nav>

            <h1>{this.props.name}</h1>
            <h2>#{this.props.num}</h2>
        </header>
        <body>
            <img src={this.props.img}/>
            <p>Height: {this.props.height}</p>
            <p>Weight: {this.props.weight}</p>

            <form action={editurl} method="GET">
                <input type="submit" value="Edit Info"/>
            </form>

            <form action={deleteurl} method="GET">
                <input type="submit" value="Delete Mon"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Pokepage;