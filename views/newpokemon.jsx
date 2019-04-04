var React = require('react');

class Home extends React.Component {

  render() {

    const pokemon = this.props;
    //console.log(pokemon);

    var valueAttribute = `/pokemon/${pokemon.id}?_method=DELETE`

    return (
        <html>
            <body>
                <h1>Add a New Pokémon</h1>

                  <form method="POST" action="/pokemon">
                    Name: <input type="text" name="name"></input>
                    Image: <input type="text" name="img"></input>
                    Height: <input type="text" name="height"></input>
                    Weight: <input type="text" name="weight"></input>

                    <input type="submit" value="Submit"></input>
                  </form>



            </body>
        </html>
    );
  }
}

module.exports = Home;