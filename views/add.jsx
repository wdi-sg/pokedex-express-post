var React = require('react');

class Add extends React.Component {
  render() {

    return (
            <html>
                <head>
                    <meta charSet="utf-8"/>
                    <title>Add new Pokemon</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                    <link rel="stylesheet" href="/css/style.css"/>
                </head>

                <body>
                    <form method="POST" action="/pokemon">
                            <h1>Add New Pokemon</h1>
                            Name: <input name="name"/><br/>
                            Image: <input name="img"/><br/>
                            Height: <input name="height"/><br/>
                            Weight: <input name="weight"/><br/><br/>
                            <input className="btn btn-success" type="submit" value="Add new Pokemon"/>
                    </form>
                    <a className="btn btn-info back" href="/pokemon">Back to Pokedex</a>
                </body>
            </html>
    );
  }
}

module.exports = Add;