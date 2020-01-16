
var React = require('react');

class Home extends React.Component {
  render() {

         const pokemonList = this.props.pokemonList;

         const pokemonElements = pokemonList.map(pokemon=>{
            let pokemonlink = "/pokemon/home/pokemon/"+ pokemon.id;
           return(
            <div className="col-sm-12 col-lg-2">
            <div className="card mb-3 mt-3 border-0" style={{width:" 18rem"}}>
              <div className="embed-responsive embed-responsive-4by3 " align="center">
               <img className="embed-responsive-item bg-light"alt={pokemon.img}src={pokemon.img} />
                </div>

            <div className="card-body">
            <p className="card-text text-muted">#{pokemon.num}</p>
            <h5 className="card-title"><a href={pokemonlink}>{pokemon.name}</a></h5>
            </div>
            </div>
            </div>);
       });

    return (
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

      </head>
        <body>
          <div>
          <h1>Pokemon</h1>
          <div className="row">
                <div class="dropdown ml-5 mr-1">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Sort
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="/pokemon/home/sortById">Sort by id</a>
    <a class="dropdown-item" href="/pokemon/home/sortByName">Sort by name</a>
    <a class="dropdown-item" href="/pokemon/home/sortByNum">Sort by num</a>
  </div>
</div>
    <a className="btn btn-primary ml-1 mr-1" href="/pokemon/new">Add</a>
</div>
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