var React = require('react');

class Pokeform extends React.Component {
  render() {
    return (
        <html>
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <title>GA Pokedex</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
                <link href="https://fonts.googleapis.com/css?family=Thasadith" rel="stylesheet"/>
                <link rel="stylesheet" type="text/css" href="http://10.193.240.192:8080/style.css"/>
            </head>

            <body>
              <form action="/pokemon/new" method="POST">
                  <h2>Name</h2>
                  <input type="" name="name"/>
                  <h2>Img</h2>
                  <input type="" name="img"/>
                  <h2>Height</h2>
                  <input type="" name="height"/>
                  <h2>Weight</h2>
                  <input type="" name="weight"/>
                  <input type="submit" className="btn btn-primary"/>
              </form>
              <br/>
              <form action="/pokemon/new" method="POST">
                  <input type="" name="name" value="random" style={{display: 'none'}}/>
                  <input value= "Add Random Pokemon!" type="submit" className="btn btn-primary"/>
              </form>
            </body>
        </html>
    );
  }
}

module.exports = Pokeform;