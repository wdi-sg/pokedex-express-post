var React = require('react');


class PokemonDetails extends React.Component {


  render() {

    return (
   
      <html> 
      <head>
       <link type='text/css' rel='stylesheet' href='styles.css'></link>
      </head>
        <body className="body">
            <header className="header">
                <h1 className = "h1"> Welcome to Pokedex</h1>
            </header>
            <div className = "Sort-Form">
            <form  method="GET" action="/">
                <label className="choice" htmlFor="choice">Choose your sorting option : </label>
                <select className="choice" name="choice" id="choice">
                  <option className="choice" value="">--Please choose your option--</option>
                  <option className="choice" value="name">Sort By Name</option>
                  <option className="choice" value="height">Sort By Height</option>
                  <option className="choice" value="weight">Sort By Weight</option>
                </select>
                <input type="submit" name="sort" className = "submit" value="Sort" onClick="redirect()" />
            </form>
            </div>
            {
              this.props.pokemonList.map(poke => {
                return (
                    <div key={poke.id} className = "poke-section">         
                        <a href={"/pokemon/" + poke.id+ "/edit"} className= "poke-href" onClick="redirect()">{poke.name}</a>
                        <div>
                            <div className = "poke-image-section" >
                                <img src={poke.img} alt={poke.name} className = "poke-image" />
                            </div>
                            <div className = "poke-detail">
                                <p>Candy : {poke.candy}</p>
                                <p>Height : {poke.height}</p>
                                <p>Weight : {poke.weight}</p>
                            </div>
                        </div>
                    </div>
                )
               })
              
              
            }
            
        </body>
      </html>
  
    )
  }

}

module.exports = PokemonDetails;
