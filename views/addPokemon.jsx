const React = require('react');

class addPokemon extends React.Component {
    render(){
        return(
            <html>
                <body>
                    <div>
                        <h1>New pokemon species found!</h1>
                        <p>Please key in the data of the pokemon: </p>
                        <form method="POST" action="/pokemon/new">
                            Name: <input type="text" name="name"/><br/>
                            Weight: <input type="text" name="weight"/><br/>
                            Height: <input type="text" name="height"/><br/>
                            Num: <input type="text" name="num"/><br/>
                            <input type="submit" value="Add pokemon"/>
                        </form>
                        <form action="/pokemon" method="GET">
                            <input type="submit" value="back"/>
                        </form>


                    </div>
                </body>
            </html>
        );
    }
}

module.exports = addPokemon;