var React = require('react');

class PokemonNew extends React.Component {
  render() {
    return (
        <html lang="en">        
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            <title>Submit new pokemon</title>
        </head>        
        <body>
            <div className="container">
                <form action="/pokemon" method="POST">
                    <p>Id
                    <input type="text" name="id"/></p>
                    <p>num
                    <input type="text" name="num"/></p>
                    <p>name
                    <input type="text" name="name"/></p>
                    <p>img
                    <input type="text" name="img"/></p>
                    <p>height
                    <input type="text" name="height"/></p>
                    <p>weight
                    <input type="text" name="weight"/></p>
                    <input type="submit"/>
                </form>
            </div>
        </body>       
        </html>
    );
  }
}

module.exports = PokemonNew;
