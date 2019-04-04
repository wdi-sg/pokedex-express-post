var React = require('react');

var Cards = require('./Cards');

class Home extends React.Component {

  render() {

    let mons = this.props.pokemon.map(mon => {
      return <Cards card={mon.name}/>
    });


    return (
        <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            </head>
            <body>
                <h1>Pokédex</h1>
                    <div class="row">
                        <div class="col-12">
                            {mons}
                        </div>
                    </div>

            </body>
        </html>
    );
  }
}

module.exports = Home;