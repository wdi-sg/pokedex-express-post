const React = require('react');

class Edit extends React.Component {

    render () {

        let url = '/' + this.props.params + '?_method=PUT';

        return (

            <div>
                <form method="POST" action={url}>
                <input type="hidden" name="id" value={this.props.editPokemon.id} />
                <input type="hidden" name="num" value={this.props.editPokemon.num} />
                Name:
                <br/>
                <input type="text" name="name" value={this.props.editPokemon.name} minlength="3" required/>
                <br/>
                Image:
                <br/>
                <input type="text" name="img" value={this.props.editPokemon.img}/>
                <br/>
                Height:
                <br/>
                <input type="text" name="height" value={this.props.editPokemon.height} required/>
                <br/>
                Weight:
                <br/>
                <input type="text" name="weight" value={this.props.editPokemon.weight} required/>
                <br/>
                Candy:
                <br/>
                <input type="text" name="candy" value={this.props.editPokemon.candy}/>
                <br/>
                Candy Count:
                <br/>
                <input type="text" name="candy_count" value={this.props.editPokemon.candy_count}/>
                <br/>
                Egg:
                <br/>
                <input type="text" name="egg" value={this.props.editPokemon.egg}/>
                <br/>
                Average Spawns:
                <br/>
                <input type="text" name="avg_spawns" value={this.props.editPokemon.avg_spawns}/>
                <br/>
                Spawn Time:
                <br/>
                <input type="text" name="spawn_time" value={this.props.editPokemon.spawn_time}/>
                <br/>
                <br/>
                <input type="submit" value="Submit"/>
                </form>
            </div>
    )}
}


module.exports = Edit;


