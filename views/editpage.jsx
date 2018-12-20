var React = require('react');

class Editpage extends React.Component {
  render() {
    let formAction = "/pokemon/" + this.props.id + "?_method=PUT"
    return (
        <html>
        <head>
            <title>Angrylobster's Pokedex</title>
            <link rel="stylesheet" type="text/css" href="style.css"/>
        </head>
        <header>
            <ul>
                <a href="/"><li id="home">Home</li></a>
                <a href="/pokemon/new"><li id="new-pokemon">New Pokemon</li></a>
                <li id="reserved">Reserved</li>
            </ul>
        </header>

        <body>
            Edit the pokemon {this.props.name}<br/>
            <form method='POST' action={formAction}>
                <input type='text' name='name' placeholder='Name' value={this.props.name}/><br/>
                <input type='text' name='img' placeholder='Image URL' value={this.props.img}/><br/>
                <input type='text' name='height' placeholder='Height' value={this.props.height}/><br/>
                <input type='text' name='weight' placeholder='Weight' value={this.props.weight}/><br/>
                <input type='submit' value='submit'/>
            </form>
        </body>
        </html>
    );
  }
}

module.exports = Editpage;