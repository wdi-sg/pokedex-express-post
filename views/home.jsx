const React = require('react');

class Home extends React.Component {
    render(){
        return(
            <html>
                <body>
                    <div>
                        <h1>Welcome to the SUPER AMAZING POKEDEX V3000</h1>
                        <p>Choose the following: </p>
                        <form method="GET" action="/pokemon/new">
                            <input type="submit" value="Add pokemon"/>
                        </form>
                        <form method="GET" action="/pokemon/show">
                            <input type="submit" value="Show all pokemon"/>
                        </form>
                        <form method="GET" action="/pokemon/sort">
                            <select name="path">
                                <option value="height">Max Height</option>
                                <option value="weight">Max Weight</option>
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