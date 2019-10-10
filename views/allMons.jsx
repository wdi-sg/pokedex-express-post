const React = require('react');

class Home extends React.Component {
    render(){
        let dex = this.props.dex;
        var name = dex.map( pokemon => {
            let x = parseInt(pokemon.num)-1
            let pkmimg = <p><a href={"http://localhost:3000/pokemon/"+x+"/edit"}><img src={"http://www.serebii.net/pokemongo/pokemon/"+pokemon.num+".png"}/></a>{pokemon.name}</p>
            return pkmimg

        })
        return(
            <html>
                <body>
                    <div>
                        <h1>List of pokemons</h1>
                        <form action="/pokemon" method="GET">
                            <input type="submit" value="back"/>
                        </form>
                        {name}
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Home;