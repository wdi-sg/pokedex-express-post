var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                    <link rel="stylesheet" href="/css/style.css"/>
                </head>

                <body>
                    <nav className="siteNav">
                        <div className="home">Home</div>
                        <div className="pokedex">Pokedex</div>
                        <div className="watchPokemonTV">Watch Pokemon TV</div>
                        <div className="playMinigames">Play Minigames</div>
                        <div className="tradingCardGame">Trading Card Game</div>
                        <div className="videoGame">Video Game</div>
                        <div className="play">Play! Pokemon Event</div>
                    </nav>

                    {this.props.children}

                </body>
            </html>
    );
  }
}

module.exports = DefaultLayout;