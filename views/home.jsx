var React = require('react');

class Home extends React.Component {
  render() {

    let content = '';
    let form = '';

    if (this.props.queryKey === 'name') {
        this.props.pokemonKey.sort(compareName);
    } else if (this.props.queryKey  === 'weight') {
        this.props.pokemonKey.sort(compareWeight);
    } else if (this.props.queryKey  === 'height') {
        this.props.pokemonKey.sort(compareHeight);
    }

    let array = this.props.pokemonKey.map(pokemon => {
        let url = "/pokemon/" + pokemon.id;
        return(
        <div style={{display: 'inline-block', color:'white', 'text-align': 'center'}}>
            <img src={pokemon.img} style={{display: 'block'}}/>
            <a href={url} style={{display: 'block'}}> {pokemon.name} </a>
            <p>{pokemon.weight}</p>
        </div>);
    })

    return (
      <html>
        <body>

          <div>
            <h1>Sort Poke!</h1>
          </div>

          <div>
            <form action="/pokemon/new">
                <button type="submit">Create Pokemon </button>
            </form>

            <form method="GET">
                <select name="sortby">
                    <option value="id">Id</option>
                    <option value="name">Name</option>
                    <option value="weight">Weight</option>
                    <option value="height">Height</option>
                </select>
                <input type="submit" value="Sort Pokemon"/>
            </form>
          </div>

          <div>
            {array}
          </div>

        </body>
      </html>
    );
  }
}

module.exports = Home;

let compareName = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

let compareWeight = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const weightA = parseFloat(a.weight);
  const weightB = parseFloat(b.weight);

  let comparison = 0;
  if (weightA > weightB) {
    comparison = 1;
  } else if (weightA < weightB) {
    comparison = -1;
  }
  return comparison;
}

let compareHeight = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const heightA = parseFloat(a.height);
  const heightB = parseFloat(b.height);

  let comparison = 0;
  if (heightA > heightB) {
    comparison = 1;
  } else if (heightA < heightB) {
    comparison = -1;
  }
  return comparison;
}