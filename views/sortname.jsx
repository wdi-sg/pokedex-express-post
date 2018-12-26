var React = require('react');
var DefaultLayout = require('./default');
var Form = require('./form');

class sortName extends React.Component {
  render() {
    var compare = function(a, b) {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    }
        let sortByNames = this.props.pokemon.sort(compare);
        const pokemonSortName = sortByNames.map ((obj, index)  => {

        return <div key = {index} className ="box-contain">
                    <div className ="num-name-img">
                        <div className = "poke-name"> {obj.name} </div>
                        <div className = "poke-img"> <img src ={obj.img}/></div>
                        <div className = "poke-num"> #{obj.num} </div>
                    </div>
                </div>
    });
    return (
        <DefaultLayout>
            <Form></Form>
                <div className = "container">
                    {pokemonSortName}
                </div>
        </DefaultLayout>
    )
  }
}

module.exports = sortName;
