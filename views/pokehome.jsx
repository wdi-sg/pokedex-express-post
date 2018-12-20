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
            Pokemon Name :- {pokemon}
      </div>
    );
  }
}

class Pokelist extends React.Component{
    render(){
        return(
            <ul><img src={this.props.list.img} /><br />{this.props.list.name}</ul>
            );
    }
}

module.exports = Pokelist;
module.exports = Pokehome;
