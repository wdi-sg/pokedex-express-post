var React = require('react');

class Poketype extends React.Component{
    render(){
        return(
            <div>
                <form method="POST" action="/pokemon/addtype">
                <h3>What typing do you want to add to existing pokemon?</h3><br />
                <input type="text" name="pokename" placeholder="Insert pokemon name" />
                <span> </span>
                <select name="poketype">
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="ground">Ground</option>
                    <option value="rock">Rock</option>
                    <option value="flying">Flying</option>
                    <option value="fighting">Fighting</option>
                </select>
                <span> </span>
                <input type="submit" value="Add" />
                </form>
                <br />
                <form method="GET" action="/pokemon">
                    <input type="submit" value="Home" />
                </form>
            </div>
            );
    }
}

module.exports = Poketype;