var React = require('react');
var DefaultLayout = require('./layouts/default');

class View extends React.Component {
  render() {

    let pokemon = this.props;

    return (
            <DefaultLayout title={ `${pokemon.name} - #${pokemon.num}` }>
                <h1>{pokemon.name} - <span>#{pokemon.num}</span></h1>

                <div className="container main-content">
                    <div className="row">

                        <div className="col-5 pokemonImage">
                            <img src={pokemon.img}/>
                        </div>

                        <div className="col-7">
                            <p>
                                Bulbsaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.
                            </p>

                            <br/>

                            <div className="container stats">
                                <div className="row">
                                    <div className="col-6 detail">
                                        <h5>Height</h5>
                                        <div>{pokemon.height}</div>
                                    </div>
                                    <div className="col-6 detail">
                                        <h5>Weight</h5>
                                        <div>{pokemon.weight}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 detail">
                                        <h5>Candy</h5>
                                        <div>{pokemon.candy}</div>
                                    </div>
                                    <div className="col-6 detail">
                                        <h5>Egg</h5>
                                        <div>{pokemon.egg}</div>
                                    </div>
                                </div>
                            </div>
                            <br/>

                            <a className="btn btn-info back" href="/pokemon">Back to Pokedex</a>
                        </div>

                    </div>
                </div>
            </DefaultLayout>
    );
  }
}

module.exports = View;