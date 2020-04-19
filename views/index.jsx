const React = require('react');

class Home extends React.Component {

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
                            <a href="/reset" className="nav__link reset">Reset to original Pokedex</a>
                            <a href="/types" className="nav__link reset">View Pokemon by Types</a>
                        </div>
                        <form method="POST" action="/sort" className="sort-form">
                            <label htmlFor="pokemon-properties" className="sort-form__label">SORT POKEMON BY:</label>
                            <select id="pokemon-properties" name="property" className="sort-form__selector">
                            <option value="id">ID</option>
                            <option value="num">number</option>
                            <option value="name">name</option>
                            <option value="height">height</option>
                            <option value="height">weight</option>
                          </select>
                          <input type="submit" formMethod="GET" value="Sort!" className="sort-form__btn"></input>
                        </form>
                    </div>
                </main>
            </body>
        );
    }
}

module.exports = Home;