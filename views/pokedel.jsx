var React = require('react');

class Pokedeldetail extends React.Component{
    render(){
        return(
            <div>
                <h3>Successfully deleted pokemon</h3>

                <form method="GET" action={"/pokemon/"}>
                    <input type="submit" value="Home" />
                </form>
            </div>
            );
    }
}

module.exports = Pokedeldetail;