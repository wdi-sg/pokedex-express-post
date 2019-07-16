var React = require('react');

class Home extends React.Component {

    render() {


        switch (this.props.sortby) {
            case "numasc":
            this.props.list.sort((numA, numB) =>{
                if (numA.num > numB.num) {
                    return 1;
                } else if (numA.num < numB.num) {
                    return -1;
                }
            })
            break;
            case "numdesc":
            this.props.list.sort((numA, numB) =>{
                if (numA.num > numB.num) {
                    return -1;
                } else if (numA.num < numB.num) {
                    return 1;
                }
            })
            break;
            case "nameasc":
            this.props.list.sort((nameA, nameB) =>{
                if (nameA.name > nameB.name) {
                    return 1;
                } else if (nameA.name < nameB.name) {
                    return -1;
                }
            })
            break;
            case "namedesc":
            this.props.list.sort((nameA, nameB) =>{
                if (nameA.name > nameB.name) {
                    return -1;
                } else if (nameA.name < nameB.name) {
                    return 1;
                }
            })
            break;
    }


let pokeList = this.props.list;
let pokemonHTML = pokeList.map(pokemon => {
        return  <div className="pokemons" id={pokemon.num}>
                    <img src={pokemon.img}/>
                    <p>#{pokemon.num}</p>
                    <h1>{pokemon.name}</h1>
                    <a href={'/pokemon/'+pokemon.id+'/edit'}>edit</a>
                </div>
        })

        return (

            <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/style.css"/>
            </head>
            <body>
                <form action='/' method='GET'>
                    <select className="sort" id="sortSelect" name="sortby">
                        <option className = "sort" value='numasc'>Id # (ascending)</option>
                        <option className = "sort" value='numdesc'>Id # (descending)</option>
                        <option className = "sort" value='nameasc'>Name (ascending)</option>
                        <option className = "sort" value='namedesc'>Name (descending)</option>
                    </select>
            <input type='submit' value='Sort' className = "sort" id='sortSubmit'/>
                </form>
                <div className="all">
                    {pokemonHTML}
                </div>
            </body>
            </html>
        )
    }
}

module.exports = Home;