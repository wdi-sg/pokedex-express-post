var React = require('react');
class Home extends React.Component {
  render() {


    return (
      <html>
        <body>
          <div>
            <h1>Hello!</h1>
            <a href='/'>Index</a>
                    <ul>
                    <li><a href='/pokedex'>PokeDex</a></li>
                      <ul>
                            <li><a href='/pokedex/new'>New</a></li>
                            <li><a href='/pokedex/kanto'>Kanto</a></li>
                        </ul>
                    </ul>
          </div>
        </body>
      </html>
    );
  }
}
module.exports = Home;