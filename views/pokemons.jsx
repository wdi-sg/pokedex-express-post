var React = require('react');

class Pokemons extends React.Component {
  render() {
    let sortDex = this.props.pokedex;
    switch (this.props.sortby) {
        case "name":
            sortDex.sort((name1, name2) => {
                if (name1.name > name2.name) return 1;
                if (name1.name < name2.name) return -1;
            });
            break;

        case "num":
            sortDex.sort((num1, num2) => {
                if (num1.id > num2.id) return 1;
                if (num1.id < num2.id) return -1;
            });
            break;

        case "height":
            sortDex.sort((height1, height2) => {
                if (parseFloat(height1.height) > parseFloat(height2.height)) return 1;
                if (parseFloat(height1.height) < parseFloat(height2.height)) return -1;
            });
            break;

        case "weight":
            sortDex.sort((weight1, weight2) => {
                if (parseFloat(weight1.weight) > parseFloat(weight2.weight)) return 1;
                if (parseFloat(weight1.weight) < parseFloat(weight2.weight)) return -1;
            });
            break;

        default:
            sortDex.sort((num1, num2) => {
                if (num1.id > num2.id) return 1;
                if (num1.id < num2.id) return -1;
            });
    }

    const display = sortDex.map( pokemon => {
        return (
            <div className="col" key={pokemon.id}>
                <a href={"http://localhost:3000/pokemon/" + pokemon.id}><img src={pokemon.img}/></a>
                <h3>{pokemon.num}</h3>
                <h4>{pokemon.name}</h4>
            </div>
            )
    });

    return (
        <html>
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <title>GA Pokedex</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
                <link href="https://fonts.googleapis.com/css?family=Thasadith" rel="stylesheet"/>
                <link rel="stylesheet" type="text/css" href="http://10.193.240.192:8080/style.css"/>
            </head>

            <body>
                <div className="container">
                    <form name='sortby' method="get" action="/">
                    Sort By: <select name='sortby'>
                                 <option value='name'>Name</option>
                                 <option value='num'>Number</option>
                                 <option value='height'>Height</option>
                                 <option value='weight'>Weight</option>
                             </select>
                            <input type='submit' className="btn btn-primary"/>
                    </form>
                    <br/>
                    <form name='create' method="get" action="/pokemon/new">
                            <input value="Add New Pokemon"  type='submit' className="btn btn-primary"/>
                    </form>
                    <div className="row">
                            {display}
                    </div>
                </div>
            </body>
        </html>
    );
  }
}

module.exports = Pokemons;