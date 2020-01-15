var React = require('react');

class PokemonNew extends React.Component {
  render() {
    return (
        <html lang="en">
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            <title>Submit new pokemon</title>
        </head>
        <body>
            <div className="container">
                <form action="/pokemon" method="POST">
                    <p>Id
                    <input type="text" name="id" value={this.props.pokemon.id}/></p>
                    <p>num
                    <input type="text" name="num" value={this.props.pokemon.num}/></p>
                    <p>name
                    <input type="text" name="name" value={this.props.pokemon.name}/></p>
                    <p>img
                    <input type="text" name="img" value={this.props.pokemon.img}/></p>
                    <p>height
                    <input type="text" name="height" value={this.props.pokemon.height}/></p>
                    <p>weight
                    <input type="text" name="weight" value={this.props.pokemon.weight}/></p>
                    <input type="save"/>
                </form>
            </div>
        </body>
        </html>
    );
  }
}

module.exports = PokemonNew;
