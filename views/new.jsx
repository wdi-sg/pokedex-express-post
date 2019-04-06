var React = require('react');

class New extends React.Component {
  render() {

    let actionAttribute = `/pokemon`;

    return (
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                <link rel="stylesheet" type="text/css" href="/newstyle.css"/>
                <title>Pokedex:New</title>
            </head>

        <body>

                <div class="container">
                <h1>Create a new pokemon!</h1><br/>
                <h1>Please enter the pokemon details</h1><br/>
                <form method="POST" action={actionAttribute}>
                Enter id: <input type="text" name="id"/><br/><br/>
                Enter num: <input type="text" name="num"/><br/><br/>
                Enter name: <input type="text" name="name"/><br/><br/>
                Enter img: <input type="text" name="img"/><br/><br/>
                Enter height: <input type="text" name="height"/><br/><br/>
                Enter weight: <input type="text" name="weight"/><br/><br/>
                <input type="submit" class="btn btn-primary" value="Submit"/>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href={`/`} class="btn btn-danger">Back</a>
                </form>
                </div>

        </body>
        </html>
    );
  }
}

module.exports = New;