var React = require('react');

class NewPokemon extends React.Component {
    render() {
        return (
           <html>
        <body>
          <main>
          <div>
          <h1> New pokemon created: </h1>
          <h2>{this.props.name}</h2>
          <h2>{this.props.height}</h2>
          <h2>{this.props.weight}</h2>
          </div>

            </form>
          </main>
        </body>
      </html>
        );
    }
}

module.exports('NewPokemon');