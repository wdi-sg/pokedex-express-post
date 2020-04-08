const React = require('react');

class Form extends React.Component {

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
                        <a href="/reset" className="nav__link reset">Reset to original Pokedex</a>
                        <a href="/" className="nav__link index">Back to Home</a>
                    </div>
                    <form method="POST" action="/pokemon" className="create-form">
                        <h2 className="create-form__header">Create a New Pokemon</h2>
                        <input type="text" name="id" placeholder="id"></input>
                        <br></br>
                        <input type="text" name="num" placeholder="num"></input>
                        <br></br>
                        <input type="text" name="name" placeholder="name"></input>
                        <br></br>
                        <input type="text" name="img" placeholder="img"></input>
                        <br></br>
                        <input type="text" name="height" placeholder="height"></input>
                        <br></br>
                        <input type="text" name="weight" placeholder="weight"></input>
                        <br></br>
                        <input type="text" name="type" placeholder="type"></input>
                        <br></br>
                        <h4>{this.props.message}</h4>
                        <button type="submit">Create!</button>
                    </form>
                </div>
            </main>
        </body>
    );
  }
}

module.exports = Form;