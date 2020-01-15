var React = require('react');

class PokemonEdit extends React.Component {
    render() {
        return (<html lang="en">
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
                <title>Submit new pokemon</title>
            </head>
            <body>
                <div className="container">
                    <form action="/pokemon" method="POST">
                        <dl className="row">
                            <dt className="col-sm-2">
                                Id
                            </dt>
                            <dd className="col-sm-10">
                                <input type="text" name="id" value={this.props.pokemon.id}/>
                            </dd>
                            <dt className="col-sm-2">
                                num
                            </dt>
                            <dd className="col-sm-10">
                                <input type="text" name="num" value={this.props.pokemon.num}/>
                            </dd>
                            <dt className="col-sm-2">
                                name
                            </dt>
                            <dd className="col-sm-10">
                                <input type="text" name="name" value={this.props.pokemon.name}/>
                            </dd>
                            <dt className="col-sm-2">
                                img
                            </dt>
                            <dd className="col-sm-10">
                                <input type="text" name="img" value={this.props.pokemon.img}/>
                            </dd>
                            <dt className="col-sm-2">
                                height</dt>
                            <dd className="col-sm-10">
                                <input type="text" name="height" value={this.props.pokemon.height}/>
                            </dd>
                            <dt className="col-sm-2">
                                weight</dt>
                            <dd className="col-sm-10">
                                <input type="text" name="weight" value={this.props.pokemon.weight}/>
                            </dd>
                            <dd className="col-sm-10">
                                <input type="submit"/></dd>
                        </dl>
                    </form>
                </div>
            </body>
        </html>);
    }
}

module.exports = PokemonEdit;
