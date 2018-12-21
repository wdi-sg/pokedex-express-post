var React = require('react');

class Pokenew extends React.Component{
    render(){
        return(
            <div>
                <form method="POST" action="/pokemon/add"><h3>Create a new Pokemon: </h3><br />
                Pokemon Id:
                <input type="text" name="id" placeholder="Auto generated" /><br />
                Pokemon Num:
                <input type="text" name="num" placeholder="Auto generated" /><br />
                Pokemon Name:
                <input type="text" name="name" required="required" minlength="5" pattern="[a-zA-Z]*$" placeholder="No special char and numbers"/><br />
                Pokemon Img:
                <input type="text" name="img" /><br />
                Pokemon Height:
                <input type="text" name="height" /><br />
                Pokemon Weight:
                <input type="text" name="weight" /><br />
                <input type="submit" value="Submit" />
                </form>
            </div>
            );
    }
}

module.exports = Pokenew;