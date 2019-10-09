var React = require('react');
class Edit extends React.Component {
  render() {
    let pokemon = this.props;
    console.log(pokemon);
    return (
        <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            </head>
            <body>
                <div className="container">
                    <h1>Editing NAME OF POKEMON HERE</h1>
                    <div className="jumbotron">
                        <form method="POST" action="/pokemon/'+pokemon.id+'?_method=put">
                            <div class="pokemon-attribute">
                                <div><h3>Id:</h3></div>
                                <input name="id" type="text" value=""/>
                                <div><h3>Name:</h3></div>
                                <input name="name" type="text" value=""/>
                                <div><h3>Image:</h3></div>
                                <input name="img" type="text" value=""/>
                                <div><h3>Height:</h3></div>
                                <input name="height" type="text" value=""/>
                                <div><h3>Weight:</h3></div>
                                <input name="weight" type="text" value=""/>
                            </div>
                        </form>
                    </div><br/>
                </div>
            </body>
        </html>
    );
  }
}

module.exports = Edit;