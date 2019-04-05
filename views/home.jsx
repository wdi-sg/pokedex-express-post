var React = require('react');

var Cards = require('./Cards');
var Layout = require('./layout.jsx')

class Home extends React.Component {

  render() {

    let mons = this.props.pokemon.map(mon => {
      return <Cards card={mon.name} Cards img={mon.img} Cards id={mon.id} Cards num={mon.num}/>
    });

    return (
        <Layout>
                <h1 class="display-4 text-center m-5">Pokédex</h1>

                <div class="col-12 d-flex justify-content-center mb-5">
                    <form method="GET" action="/">

                        <select name="sortby">
                        <option value="">---Sort Pokémon---</option>
                        <option value="name">Name</option>
                        <option value="id">Id</option>
                        <option value="num">Number</option>
                        <option value="weight">Weight</option>
                        <option value="height">Height</option>
                        </select>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>


                        <div class="col-12">
                            <div class="card-group d-flex justify-content-around">
                                {mons}
                            </div>
                        </div>
            </Layout>
    );
  }
}

module.exports = Home;