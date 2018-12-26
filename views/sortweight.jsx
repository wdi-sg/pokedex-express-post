var React = require ('react');
var DefaultLayout = require ('./default');
var Form = require ('./form');

class sortWeight extends React.Component {
    render(){
        var compare = function(a,b) {
            if (parseFloat(a.weight) < parseFloat(b.weight)) {
                return -1;
            } else if (parseFloat(a.weight) > parseFloat(b.weight)) {
                return 1;
            } else {
                return 0;
            }
        }
        let sortByWeight = this.props.pokemon.sort(compare);
        const pokemonSortWeight = sortByWeight.map ((obj,index) => {
            return <div key={index} className = "box-contain">
                        <div className = "poke-name"> {obj.name} </div>
                        <div className = "poke-img"><img src= {obj.img}/></div>
                        <div className = "poke-num"> #{obj.num} </div>
                        <div className = "poke-weight"> {obj.weight} </div>
                    </div>
        });
        return(
            <DefaultLayout>
                <Form></Form>
                    <div className = "container">
                        {pokemonSortWeight}
                    </div>
            </DefaultLayout>
        )
    }
}

module.exports = sortWeight;