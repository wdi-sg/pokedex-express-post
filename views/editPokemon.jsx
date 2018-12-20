var React = require('react');

class createPokemon extends React.Component {

    render() {

        return (
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>
        <h1>Edit Pokemon</h1>
        <form action={'/pokemon/' + this.props.id + '?_method=PUT'} method='POST'>
            <label>ID:<br/><input type='text' name='id' value={this.props.id}/><br/><br/></label>
            <label>Num:<br/><input type='text' name='num' value={this.props.num}/><br/><br/></label>
            <label>Name:<br/><input type='text' name='name' value={this.props.name}/><br/><br/></label>
            <label>Img:<br/><input type='text' name='img' value={this.props.img}/><br/><br/></label>
            <label>Height:<br/><input type='text' name='height' value={this.props.height}/><br/><br/></label>
            <label>Weight:<br/><input type='text' name='weight' value={this.props.weight}/><br/><br/></label>
            <label>Candy:<br/><input type='text' name='candy' value={this.props.candy}/><br/><br/></label>
            <label>Candy Count:<br/><input type='text' name='candy_count' value={this.props.candy_count}/><br/><br/></label>
            <label>Egg:<br/><input type='text' name='egg' value={this.props.egg}/><br/><br/></label>
            <label>Average Spawns:<br/><input type='text' name='avg_spawns' value={this.props.avg_spawns}/><br/><br/></label>
            <label>Spawn Time:<br/><input type='text' name='spawn_time' value={this.props.spawn_time}/><br/><br/></label>
            <input type='submit' value='Submit'/>
        </form>
        </body>
        </html>
        )
    }
}

module.exports = createPokemon;