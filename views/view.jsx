var React = require('react');
var DefaultLayout = require('./layouts/default');

class Type extends React.Component {
  render() {
    let typeElements = this.props.types.map((o) => {
        return <div className={o.toLowerCase()}>{o}</div>
    });

    return (
        <div className="type">
            {typeElements}
        </div>
    );
  }
}

class Weakness extends React.Component {
  render() {
    let weaknessElements = this.props.weaknesses.map((o) => {
        return <div className={o.toLowerCase()}>{o}</div>
    });

    return (
        <div className="weakness">
            {weaknessElements}
        </div>
    );
  }
}

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

                            <h4>Type</h4>
                            <Type types={pokemon.type}/>
                            <br/>

                            <h4>Weakness</h4>
                            <Weakness weaknesses={pokemon.weaknesses}/>
                            <br/>

                            <div className="footer">
                                <a className="btn btn-warning back" href="/pokemon">Back to Pokedex</a>
                                <a className="btn btn-info next" href={`/pokemon/${ pokemon.id + 1 }`}>Next Pokemon</a>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
    );
  }
}

module.exports = View;