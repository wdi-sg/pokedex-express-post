const React = require('react');

class Types extends React.Component {

    render() {

        const allTypes =
            this.props.types.map(type => {
                const typeUrl = `./types/${type}`
                return <a href={typeUrl} key={type} className={`types-list__entry ${type.toLowerCase()}`}>{type}</a>
            })


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
                        </div>
                        <ul className="types-list">
                            {allTypes}
                        </ul>
                    </div>
                </main>
            </body>
        );
    }
}

module.exports = Types;