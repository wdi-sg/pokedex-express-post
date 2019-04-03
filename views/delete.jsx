var React = require('react');

class Delete extends React.Component {
  render() {

    let formAttribute = `/pokemon/${this.props.id}?_method=DELETE`;

    return (
            <html>
                <head>
                    <meta charSet="utf-8"/>
                    <title>Delete Pokemon</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                    <link rel="stylesheet" href="/css/style.css"/>
                </head>

                <body>
                    <form method="POST" action={ formAttribute }>
                        <h1>Delete Existing Pokemon - { this.props.name }</h1>
                        Name: <label> { this.props.name } </label><br/>
                        Height: <label> { this.props.height } </label><br/>
                        Weight: <label> { this.props.weight } </label><br/>
                        <input type="hidden" name="id" value= { this.props.id } /><br/>
                        <input className="btn btn-danger" type="submit" value="Do you really want to delete existing Pokemon?"/>
                    </form>
                    <a className="btn btn-info back" href="/pokemon">Back to Pokedex</a>
                </body>
            </html>
    );
  }
}

module.exports = Delete;