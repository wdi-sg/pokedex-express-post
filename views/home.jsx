var React = require('react');

class Home extends React.Component {
  render() {
    // console.log("pokemon");
    // console.log(this.props.pokemon);

    var compare = function(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        // names must be equal
        return 0;
        };

        let sortByNames = this.props.test.sort(compare);
        console.log(sortByNames);

    const pokemonSortName = this.props.test.map ((obj, index)  => {
        console.log(obj.img);
        return <div key = {index}> {obj.num} {obj.name} <img src={obj.img}></img> </div>
    });
    return (
      <html>
        <body>
            <h1>This is all the list of pokemons:</h1>
            <form action="/" method="GET">
                <select name="sortby">
                    <option value="name">Sort by Name</option>
                    <option value="type">Sort By Type</option>
                    <option value="weight">Sort By Weight</option>
                    </select>
                    <input type="submit"></input>
            </form>
            <div>

                {pokemonSortName}

            </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
