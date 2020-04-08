const React = require('react');

class Pokemon extends React.Component {

    render() {

        let pokemonTypes, pokemonUrl, pokemonName, pokemonID;

        if (this.props.pokemon[0].id) {
            pokemonID = `${this.props.pokemon[0].id}`;
        } else {
            pokemonID = 'none';
        }

        if (this.props.pokemon[0].name) {
            pokemonName = `${this.props.pokemon[0].name}`;
        } else {
            pokemonName = 'none';
        }

        if (this.props.pokemon[0].img) {
            pokemonUrl = `${this.props.pokemon[0].img}`;
        } else {
            pokemonUrl = 'none';
        }

        if (this.props.pokemon[0].type) {
            pokemonTypes = this.props.pokemon[0].type.map(type => {
                return <h3 className = {`pokemon__type ${type.toLowerCase()}`}> {type} </h3>;
            })
        } else {
            pokemonTypes = 'none';
        }

            return (
                <body>
                <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;500;700&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/css/styles.css"></link>
                <main>
                    <div className="wrapper">
                        <div className="header">
                            <img src="https://loganlibraries.org/wp-content/uploads/2016/07/pokemon-1513925_960_720.jpg" className="header__img"></img>
                            <h1 className="header__text">POKEDEX EXPRESS JSX CONFUSING AF</h1>
                            <img src="https://loganlibraries.org/wp-content/uploads/2016/07/pokemon-1513925_960_720.jpg" className="header__img"></img>
                        </div>
                        <div className="nav">
                            <a href="/pokemon/new" className="nav__link create">Create a new Pokemon!</a>
                            <a href="/reset" className="nav__link reset">Reset to original Pokedex</a>
                            <a href="/" className="nav__link index">Back to Home</a>
                            <a href="/sort" className="nav__link poke-list">Back to List</a>
                        </div>
                        <div className={`pokemon ${this.props.pokemon[0].type[0].toLowerCase()}`}>
                            <div className="pokemon__name-container">
                                <h2 className="pokemon__name">{pokemonName}</h2>
                                <h2 className="pokemon__id">{`#${pokemonID}`}</h2>
                            </div>
                            <div className="pokemon__img-container">
                                <img src={pokemonUrl} className="pokemon__img"></img>
                            </div>
                            <div className="pokemon__types-container">
                                <h2 className="pokemon__types-header">Type:</h2>
                                {pokemonTypes}
                            </div>
                        </div>
                    </div>
                </main>
            </body>
            );
    }
}

module.exports = Pokemon;