const React = require('react');

class Home extends React.Component {
    render(){
        return(
            <html>
                <body>
                    <div>
                        <h1>Welcome to the SUPER AMAZING POKEDEX V3000</h1>
                        <p>To add new pokemon, click here: </p>
                        <form method="GET" action="/pokemon/new">
                            <input type="submit" value="Add pokemon"/>
                        </form>
                        <form method="GET" action="/pokemon/show">
                            <input type="submit" value="Show all pokemon"/>
                        </form>
                        <form method="GET" action="/pokemon">
                            <select name="path">
                                <option value="height">Height</option>
                            </select>
                            <input type="submit"/>
                        </form>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Home;