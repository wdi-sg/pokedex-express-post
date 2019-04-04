var React = require('react');

var Cards = require('./Cards');

class Home extends React.Component {

  render() {



    let mons = this.props.pokemon.map(mon => {
      return <Cards card={mon.name} Cards img={mon.img} Cards id={mon.id} Cards num={mon.num}/>
    });


    return (
        <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            </head>
            <body>
                <h1 class="display-4 text-center m-5">Pokédex</h1>

                        <div class="col-12">
                            <div class="card-group d-flex justify-content-around">
                                {mons}
                            </div>
                        </div>



            </body>
        </html>
    );
  }
}

module.exports = Home;