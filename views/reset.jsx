const React = require('react');

class Reset extends React.Component {

    render() {
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
                            <a href="/" className="nav__link index">Back to Home</a>
                        </div>
                        <div className="reset-container">
                            <h1 className="reset-container__header">Pokedex Reset!</h1>
                        </div>
                    </div>
                </main>
            </body>
        );
    }
}

module.exports = Reset;