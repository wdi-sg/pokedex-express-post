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
        return  <div id={pokemon.num} style={{display: 'inline-block', margin: '20px', float: 'left', textAlign: 'center'}}>
                    <img src={pokemon.img} style = {{backgroundColor: 'gainsboro', width: '200px'}}/>
                    <p>#{pokemon.num}</p>
                    <h1>{pokemon.name}</h1>
                    <a href={'/pokemon/'+pokemon.id+'/edit'}>edit</a>
                </div>
        })

        return (

            <html>
            <head>
            </head>
            <body>
                <form action='/' method='GET'>
                    <select name='sortby' style={{fontSize: '20px', padding: '10px 50px', marginLeft: '20px'}}>
                        <option value='numasc' style={{fontSize: '15px'}}>Id # (ascending)</option>
                        <option value='numdesc' style={{fontSize: '15px'}}>Id # (descending)</option>
                        <option value='nameasc' style={{fontSize: '15px'}}>Name (ascending)</option>
                        <option value='namedesc' style={{fontSize: '15px'}}>Name (descending)</option>
                    </select>
            <input type='submit' value='Sort' id='sort' style={{backgroundColor: 'DeepSkyBlue', padding: '5px 25px', marginLeft: '10px', display: 'inline-block', borderRadius: '5px', color: 'white', fontSize: '15px'}}/>
                </form>
                <div classname="all">
                    {pokemonHTML}
                </div>
            </body>
            </html>
        )
    }
}

module.exports = Home;