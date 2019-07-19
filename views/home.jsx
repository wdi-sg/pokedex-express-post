var React = require('react');
var PokemonProfile  = require('./components/pokemonProfile.jsx');

class Home extends React.Component {
  render() {
    const pokemonList = this.props.pokemonsAll.map((pokemon)=>{
        return <PokemonProfile data={pokemon}/>
    });
    const logo = 'https://vignette.wikia.nocookie.net/fictionalcrossover/images/e/e6/Pokemon_Logo.png/revision/latest?cb=20131018214549';
    {/*const logoDiv = {
      display: 'inline',
      margin: '0 auto',
      textAlign: 'center'
    }
    const logoStyle = {
      width : '500px',
      height: 'auto',
      display: 'inline-block',
      margin: '0 auto',
      textAlign: 'center',
      marginBottom: '50px'
    }

    const bodyStyle = {
      width:"100%",
      margin:"0 auto",
      fontFamily:"sans-serif",
      textAlign:"center"
    }
    const createButton = {
      width:"200px",
      padding:"20px",
      margin: "30px",
      marginTop: '50px',
      backgroundColor: "lightblue",
      textDecoration: 'none',
      borderRadius: '5px',
      fontFamily:"sans-serif",
      textAlign:"center"
    };

    const selectDiv = {
      width:"200px",
      padding:"20px",
      margin: "0 auto",
      fontSize: '24px',
      marginTop: '30px',
      textAlign:"center"
    };*/}

    const sortSelect =
    <select name="sortby">
        <option>Sort By</option>
        <option value="">ID</option>
        <option value="name">Name</option>
        <option value="weight">Weight</option>
        <option value="height">Height</option>
    </select>;
    const sortSubmit = <input type="submit" value="Submit"/>;

    var url = "/pokemon/new";
    return (
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400&display=swap" rel="stylesheet"/>
          <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>
        <div className="container">
        <div className="logo">
          <img className="logo-img" src = {logo}/>
        </div>
        <div>
        <a href={url}>Create new pokemon</a>
        </div>
        <div>
          <form>{sortSelect}{sortSubmit}</form>
          </div>
          <div className="pokemon-wrapper">{pokemonList}</div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
