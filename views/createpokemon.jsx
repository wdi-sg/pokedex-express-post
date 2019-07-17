var React = require('react');

class CreatePokemon extends React.Component {
    render() {
        return (
<html>
<head>
    <title>Create a pokemon</title>
    <link rel="stylesheet" type="text/css" href="/home.css"></link>
</head>

<body>
    <div className="pageWrapper">
        <h1>Let's create a new pokemon!</h1>
        <br/>
        <div className="displayContainer">
            <form method="POST" action="/pokemon">
                <h4>Provide your new pokemon's details here:</h4>
                Name: <input type="text" name="name"/>
                Image link: <input type="text" name="img"/>
                Height: <input type="text" name="height"/>
                Weight: <input type="text" name="weight"/>
                Candy: <input type="text" name="candy"/>
                Candy count: <input type="text" name="candy_count"/>
                Egg: <input type="text" name="egg"/>
                Average spawns: <input type="text" name="avg_spawns"/>
                Spawn time: <input type="text" name="spawn_time"/>
                <div className="submit">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
        );
    }
}

module.exports = CreatePokemon;