var React = require('react');

class Home extends React.Component {
  render() {

    let actionAttribute = `/pokemon/${this.props.idKey}?_method=DELETE`;

    return (
         <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                <link rel="stylesheet" type="text/css" href="/deletestyle.css"/>
            </head>

        <body>
        <div class="container">
        <h1>DELETE pokemon</h1>
        <br/>
        <form method="POST" action={actionAttribute}>
        <div>Pokemon ID: {this.props.recordKey.id}</div><br/>
        <div>Name: {this.props.recordKey.name}</div><br/>
        <img id="eachImage" src={this.props.recordKey.img}/><br/>
        <div>Height: {this.props.recordKey.height}</div><br/>
        <div>Weight: {this.props.recordKey.weight}</div><br/>
        <input type="submit" class="btn btn-primary" value="Delete"/>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href={`/`} class="btn btn-danger">Back</a>
        </form>
        </div>
        </body>
        </html>
    );
  }
}

module.exports = Home;