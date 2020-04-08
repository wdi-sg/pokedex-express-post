var React = require('react');
class type extends React.Component {
  render() {

    const PokemonName = this.props.pokemon.map( (pokemonName, index )=> {
                    return <div class={"row"}>
                    <div class={"col-md-2 border"}>
                    {index}
                    </div>
                    <div class={"col-md-8 border text-center"}>
                    <p><a href={"/pokemon/index?options="+(pokemonName.id-1)}>{pokemonName.name}</a></p>
                    </div>
                    <div class={"col-md-2 border text-center"}>

                    <img  stye={{width: "100%"}} src={pokemonName.img} />
                    </div>
                    </div>
                    {/*<div class={"row"}>
                    <div class={"col-md-2 border text-center"}>{index}</div>
                    <div class={"col-md-8 border text-center"}><p>{pokemonName.name}</p></div>
                    <div class={"col-md-2 border text-center"}><p>Something</p></div>
                    </div>*/}




                        });

    return (
      <html>
        <body>
        <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"} integrity={"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"} crossorigin={"anonymous"}></link>
            <div class={"container"}>
                <div class={"row text-center"}>
                    <div class={"col-md-12 border"} style={{marginTop: "30px"}}>
                    <h1>Pokemon sorted by {this.props.heading}</h1>
                    </div>
                </div>

                    {PokemonName}

            </div>
                        <h2  style={{textAlign: "Center"}}>To return home </h2>
            <form method="GET" action="/" style={{textAlign: "Center"}}>
            <input type="submit" value="Return Home"></input>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = type;