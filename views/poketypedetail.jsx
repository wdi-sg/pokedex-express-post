var React = require('react');

class Poketypedetail extends React.Component{
    render(){
        const pokemon = this.props.pokemon.map( pokes => {
            return <Poketypelist list={pokes}></Poketypelist>;
        });
        return(
            <div>
            <h3>Pokemon of {this.props.pokemon[0].type} type</h3>
                {pokemon}
            </div>
            );
    }
}

class Poketypelist extends React.Component{
    render(){
        return(
            <ul>
                <img src={this.props.list.img} />
                <h5>ID: {this.props.list.id}</h5>
                <h5>Name: {this.props.list.name}</h5>
                <form method="GET" action={"/pokemon/" + this.props.list.id + "/detail"}>
                    <input type="submit" value="Details" />
                </form>
                <br />
                <form method="GET" action={"/pokemon/"}>
                    <input type="submit" value="Home" />
                </form>
            </ul>
            );
    }
}

module.exports = Poketypelist;
module.exports = Poketypedetail;