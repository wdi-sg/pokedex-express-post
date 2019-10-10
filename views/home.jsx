var React = require('react');
class Home extends React.Component {
  render() {

    let pokemon = {this.props.pokeDex.name}



    return (
      <html>
        <body>
          <div>

           <h1> POKEMON</h1>

            <ul>
                <li>{pokemon}</li>
            <ul>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;