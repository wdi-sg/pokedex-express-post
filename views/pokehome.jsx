var React = require('react');

class Pokehome extends React.Component{
    render(){
        const pokemon = this.props.pokemon.map( pokes => {
            return <Pokelist list={pokes}></Pokelist>;
        });
    return (
      <div>
        <h3>Welcome to the online Pokedex! Here are the list of pokemon currently in the Pokedex:- </h3>
        <form method="GET" action="/pokemon">
            <select name="sortby">
                <option value="asc">Ascending order</option>
                <option value="desc">Descending order</option>
                <option value="id">ID</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
            </select>
            <span> </span>
            <input type="submit" value="sort" />
        </form>
        <br />
        <form method="GET" action="/pokemon/new">
            <input type="submit" value="Create new Pokemon" />
        </form>
        <br />
        <form method="GET" action={"/pokemon/type"}>
            <input type="submit" value="Add Type" />
        </form>
        <br />
            Pokemon Name :- {pokemon}
      </div>
    );
  }
}

class Pokelist extends React.Component{
    render(){
        return(
            <ul>
                <img src={this.props.list.img} />
                <br />
                {this.props.list.name}
                <br />
                <form method="GET" action={"/pokemon/" + this.props.list.id + "/edit"}>
                    <input type="submit" value="Edit" />
                </form>
                <br />
                <form method="GET" action={"/pokemon/" + this.props.list.id + "/detail"}>
                    <input type="submit" value="Details" />
                </form>
                <br />
                <form method="GET" action={"/pokemon/" + this.props.list.type + "/typedetail"}>
                    <input type="submit" value={this.props.list.type}/>
                </form>
                <br />
                <form method="POST" action={"/pokemon/" + this.props.list.id + "?_method=delete"}>
                    <input type="submit" value="Delete"/>
                </form>
            </ul>
            );
    }
}

module.exports = Pokelist;
module.exports = Pokehome;
