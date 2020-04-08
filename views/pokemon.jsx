var React = require('react');

class Pokemon extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
                </head>
                <body>
                    <div className="container">
                        <h1>Pokemon Data</h1>
                        <div className="pokemonData">
                            <div>ID : {this.props.id}</div>
                            <div>Num : {this.props.num}</div>
                            <div>Name : {this.props.name}</div>
                            <img src={this.props.img} alt="{this.props.name} img"/>
                            <div>Height : {this.props.height}</div>
                            <div>Weight : {this.props.weight}</div>
                            <div>Candy : {this.props.candy}</div>
                            <div>Candy Count : {this.props.candy_count}</div>
                            <div>Egg : {this.props.egg}</div>
                            <div>Average Spawns : {this.props.avg_spawns}</div>
                            <div>Spawn Time : {this.props.spawn_time}</div>
                        </div>
                        <form action="/pokemon?_method=delete" method="POST">
                            <input type="hidden" name="id" value={this.props.id}/>
                            <button type="submit" className="btn btn-primary">Delete</button>
                        </form>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Pokemon;