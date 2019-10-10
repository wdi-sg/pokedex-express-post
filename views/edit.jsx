var React = require('react');
class Edit extends React.Component {
  render() {
    let data = this.props;

    return (
        <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            </head>
            <body>
                <div className="container">
                    <h1>Editing {data.pokemon.name}</h1>
                    <div className="jumbotron">
                        <form method="POST" action={"/pokemon/"+data.index+'?_method=put'}>
                            <div class="pokemon-attribute">
                                <div><h3>Id:</h3></div>
                                <input name="id" type="text" value={data.pokemon.id}/>
                                <div><h3>Name:</h3></div>
                                <input name="name" type="text" value={data.pokemon.name}/>
                                <div><h3>Image:</h3></div>
                                <input name="img" type="text" value={data.pokemon.img}/>
                                <div><h3>Height:</h3></div>
                                <input name="height" type="text" value={data.pokemon.height}/>
                                <div><h3>Weight:</h3></div>
                                <input name="weight" type="text" value={data.pokemon.weight}/>
                                <br/><br/>
                                <div><input type="submit" value="Submit"/></div>
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