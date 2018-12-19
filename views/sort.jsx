var React = require('react');

class Pokemon extends React.Component {

    render() {
        const eachPokemon = this.props.array.map(eachPokemon =>{
            if (this.props.sortType === "name" || this.props.sortType === undefined){
                return <div className="eachPoke"><a href={"/pokemon/" + eachPokemon.id}><img src={eachPokemon.img}/></a><br/><h3>{eachPokemon.name}</h3></div>;
            } else {
               return <div className="eachPoke"><a href={"/pokemon/" + eachPokemon.id}><img src={eachPokemon.img}/></a><br/><h3>{eachPokemon.name}</h3><br/><p>{eachPokemon[this.props.sortType]}</p></div>;
            }
            

        });

        return (
            <html>
            <link rel="stylesheet" type="text/css" href="style.css"/>
            <body>
            <form action="/" method="GET">
            <select name="sortby">
                <option value="name">Name</option>
                <option value="id">ID</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
              </select>
            <input type="submit"/>
            </form>
                {eachPokemon}
            </body>
            </html>

        );
    }
}

module.exports = Pokemon;
