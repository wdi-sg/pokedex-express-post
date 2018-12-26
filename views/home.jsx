var React = require ('react');
var DefaultLayout = require('./default');

class home extends React.Component {
    render() {
        const listofPokemons = this.props.pokemon.map ((obj,index) => {
                return <div key={index} className = "box-contain">
                            <div className = "num-name-img">
                                <div className = "poke-name"> {obj.name} </div>
                                <div className = "poke-img"> <img src={obj.img}/> </div>
                                <div className = "poke-num"> #{obj.num} </div>
                            </div>
                        </div>
            })
        return(
                <DefaultLayout>
                        <div className = "container">
                            {listofPokemons}
                        </div>
                </DefaultLayout>
        );
    }
}

module.exports =  home;