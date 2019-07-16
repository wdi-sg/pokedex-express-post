var React = require('react');

class createPokemon extends React.Component {

    render() {
        // {console.log(this.props.pokemonInfo)}
        var a = Object.entries(this.props.pokemonInfo).map(([key, value]) => { return (
                 <label>{key}:
                <br/>
                <input type='text' value={value}/>
                 <br/>
                <br/>
                </label>
            )
        })
        return (
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>
        <h1>Edit Pokemon</h1>
        <form action={'/pokemon/' + this.props.id + '?_method=PUT'} method='POST'>
        {a}
            <input type='submit' value='Submit'/>
        }
        </form>
        </body>
        </html>
        )
    }
}

module.exports = createPokemon;