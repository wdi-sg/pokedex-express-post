var React = require('react');

class Edit extends React.Component {
  render() {

    let formAttribute = `/pokemon/${this.props.id}?_method=PUT`;

    return (
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Edit Pokemon</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="/css/style.css"/>
            </head>

            <body>
                <form method="POST" action={ formAttribute }>
                    <h1>Edit Existing Pokemon - { this.props.name } </h1>
                    Name: <input name="name" value= { this.props.name } /><br/>
                    Height: <input name="height" value= { this.props.height } /><br/>
                    Weight: <input name="weight" value= { this.props.weight } /><br/><br/>
                    <input type="submit" value="Edit existing Pokemon"/>
                </form>
            </body>
        </html>
    );
  }
}

module.exports = Edit;