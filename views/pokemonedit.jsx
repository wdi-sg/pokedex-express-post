var React = require('react');

class PokemonEdit extends React.Component {
    render() {
        const pokemonID = this.props.pokemon.id;
        const postURL = `/pokemon/${pokemonID}?_method=put`;

        let oldWay = "I want to add " + this.thing + " and this string.";
        let newWay = `I want to add ${this.thing} and this string.`;
        let wrongWay = 'I want to add ${this.thing} and this string.';

        return (<html lang="en">
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
                <title>Submit new pokemon</title>
            </head>
            <body>
                <div className="container">
                    <form action={postURL} method="POST">
                        <dl className="row">
                            <dt className="col-sm-2">
                                Id
                            </dt>
                            <dd className="col-sm-10">
                                <input type="text" name="id" defaultValue={this.props.pokemon.id}/>
                            </dd>
                            <dt className="col-sm-2">
                                num
                            </dt>
                            <dd className="col-sm-10">
                                <input type="text" name="num" defaultValue={this.props.pokemon.num}/>
                            </dd>
                            <dt className="col-sm-2">
                                name
                            </dt>
                            <dd className="col-sm-10">
                                <input type="text" name="name" defaultValue={this.props.pokemon.name}/>
                            </dd>
                            <dt className="col-sm-2">
                                img
                            </dt>
                            <dd className="col-sm-10">
                                <input type="text" name="img" defaultValue={this.props.pokemon.img}/>
                            </dd>
                            <dt className="col-sm-2">
                                height</dt>
                            <dd className="col-sm-10">
                                <input type="text" name="height" defaultValue={this.props.pokemon.height}/>
                            </dd>
                            <dt className="col-sm-2">
                                weight</dt>
                            <dd className="col-sm-10">
                                <input type="text" name="weight" defaultValue={this.props.pokemon.weight}/>
                            </dd>
                            <dd className="col-sm-10">
                                <input type="submit"/>
                              </dd>
                        </dl>
                    </form>
                </div>
            </body>
        </html>);
    }
}

module.exports = PokemonEdit;
