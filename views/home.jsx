
var React = require('react');

class Home extends React.Component {
  render() {

         const pokemonList = this.props.pokemonList;
         const pokemonElements = pokemonList.map(pokemon=>{
            let pokemonlink = "/pokemon/home/pokemon/"+pokemon.id;
           return(
            <div className="col-sm-12 col-lg-3">
            <div className="card mb-3 mt-3 border-0" style={{width:" 18rem"}}>
              <div className="embed-responsive embed-responsive-4by3 " align="center">
               <img className="embed-responsive-item bg-light"alt={pokemon.img}src={pokemon.img} />
                </div>

            <div className="card-body">
            <p className="card-text text-muted">{pokemon.id}</p>
            <h5 className="card-title"><a href={pokemonlink}>{pokemon.name}</a></h5>
            </div>
            </div>
            </div>);
       });

    return (
      <html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </head>
        <body>
          <div>
          <h1>Pokemon</h1>
                          <a className="btn btn-primary ml-1 mr-1" href="/pokemon/home/sortByID">Sort By ID</a>
                <a className="btn btn-primary mr-1" href="/pokemon/home/sortByName">Sort By Name</a>
                <a className="btn btn-primary mr-1" href="/pokemon/home/sortByNum">Sort By Num</a>
                <div className="container-fluid content-row">
    <div className="row">


   {pokemonElements}

    </div>
</div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;