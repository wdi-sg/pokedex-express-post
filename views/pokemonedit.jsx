var React = require('react');

class Home extends React.Component {

  render() {

    const pokemon = this.props;
    console.log(pokemon);

    return (
        <html>
            <body>
                <h1>Edit Pokémon</h1>
                    <div>

                         {pokemon["id"]}
                        {pokemon["num"]}
                            {pokemon["name"]}
                             {pokemon["img"]}
                            {pokemon["height"]}
                            {pokemon["weight"]}

                    </div>

            </body>
        </html>
    );
  }
}

module.exports = Home;