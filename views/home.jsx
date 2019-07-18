var React = require('react');

class Home extends React.Component {
  render() {

    const mapNameList = this.props.fullNameList.map( pokemon => {
        let url = "/pokemon/"+pokemon.id;
        return (
            <div className = "container">
                <a href = {url}>
                    <img src = {pokemon.img} />
                    <p>{pokemon.name}</p>
                    <p>{pokemon.id}</p>
                </a>
            </div>
        );
    });



    return (
        <html>
            <head>
                <link href = "/style.css" type="text/css" rel="stylesheet"></link>
            </head>
            <body>
                <h1>Pokedex Home</h1>
                    <form method="GET">
                        <select name = "sortby">
                             <option value="name">Sort by Name</option>
                             <option value = "weight">Sort by Weight</option>
                            <option value = "height">Sort by Height</option>
                        </select>
                        <button type="submit">Sort</button>
                    </form>
                <p>{mapNameList}</p>
            </body>
        </html>
    );
  }
}


module.exports = Home;