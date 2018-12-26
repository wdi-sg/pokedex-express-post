var React = require ('react');
var DefaultLayout = require ('./default');
var Form = require ('./form');

class sortHeight extends React.Component {
    render(){
        var compare = function(a,b) {
            if (parseFloat(a.height) < parseFloat(b.height)) {
                return -1;
            } else if (parseFloat(a.height) > parseFloat(b.height)) {
                return 1;
            } else {
                return 0;
            }
        }
        let sortByHeight = this.props.pokemon.sort(compare);

        const pokemonSortHeight = sortByHeight.map ((obj,index) => {
            return <div key={index} className = "box-contain">
                        <div className = "poke-name"> {obj.name} </div>
                        <div className = "poke-img"> <img src = {obj.img}/> </div>
                        <div className = "poke-num"> {obj.num} </div>
                        <div className = "poke-height"> {obj.height} </div>
                    </div>
        });
        return(
            <DefaultLayout>
                <Form></Form>
                    <div className = "container">
                        {pokemonSortHeight}
                    </div>
            </DefaultLayout>
        )
    }
}

module.exports = sortHeight;

