var React = require('react');
class Deletepage extends React.Component {
render() {
let url = "/pokemon/" + this.props.id + "?_method=DELETE";
return (
<html>
    <head>
        <title>Delete that Mon!</title>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/style.css"/>
    </head>
    <body>
        <div className = "edit-mon">
            <h1>Are you sure you want to delete: {this.props.name}? :(</h1>
            <img src= {this.props.img}/>
            <form action={url} method="POST" className = "form-container">
            <h2>ID</h2>
                    <input type="number" name="id" defaultValue={this.props.id} readOnly/>
                    <h2>Num</h2>
                    <input type="text" name="num" defaultValue={this.props.num} readOnly/>
                    <h2>Name</h2>
                    <input type="text" name="name" defaultValue={this.props.name} readOnly/>
                    <h2>Img Src</h2>
                    <input type="text" name="img" defaultValue={this.props.img} readOnly/>
                    <h2>Height</h2>
                    <input type="text" name="height" defaultValue={this.props.height} readOnly/>
                    <h2>Weight</h2>
                    <input type="text" name="weight" defaultValue={this.props.weight} readOnly/>
                    <h2>Candy</h2>
                    <input type="text" name="candy" defaultValue={this.props.candy} readOnly/>
                    <h2>Candy Count</h2>
                    <input type="text" name="candycount" defaultValue={this.props.candy_count} readOnly/>
                    <h2>Egg</h2>
                    <input type="text" name="candycount" defaultValue={this.props.egg} readOnly/>
                    <h2>Average Spawns</h2>
                    <input type="number" name="avgspawns" defaultValue={this.props.avg_spawns} readOnly/>
                    <h2>Spawn Time</h2>
                    <input type="text" name="spawntime" defaultValue={this.props.spawn_time} readOnly/>
                    <br/><br/>
                <input type="submit"/>
            </form>
        </div>
    </body>
</html>
);
}
}
module.exports = Deletepage;