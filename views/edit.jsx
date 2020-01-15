var React = require('react');

class Edit extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
                </head>
                <body>
                    <div className="container">
                        <h1>Input Data for Existing Pokemon Here</h1>
                        <div className="col-6">
                            <form action="/pokemon?method=put" method="POST">
                                <div className="form-group">
                                    <label>Name :</label>
                                    <input type="text" className="form-control" placeholder="Pokemon Name" name="name" value={this.props.name}/>
                                </div>
                                <div className="form-group">
                                    <label>ID :</label>
                                    <input type="number" className="form-control" placeholder="ID" name="id" value={this.props.id}/>
                                </div>
                                <div className="form-group">
                                    <label>Num :</label>
                                    <input type="text" className="form-control" placeholder="Num" name="num" value={this.props.num}/>
                                </div>
                                <div className="form-group">
                                    <label>Img :</label>
                                    <input type="text" className="form-control" placeholder="img" name="img" value={this.props.img}/>
                                </div>
                                <div className="form-group">
                                    <label>Height :</label>
                                    <input type="text" className="form-control" placeholder="Height" name="height" value={this.props.height}/>
                                </div>
                                <div className="form-group">
                                    <label>Weight :</label>
                                    <input type="text" className="form-control" placeholder="Weight" name="weight" value={this.props.weight}/>
                                </div>
                                <div className="form-group">
                                    <label>Candy :</label>
                                    <input type="text" className="form-control" placeholder="Candy" name="candy" value={this.props.candy}/>
                                </div>
                                <div className="form-group">
                                    <label>Candy Count :</label>
                                    <input type="text" className="form-control" placeholder="Candy Count" name="candy_count" value={this.props.candy_count}/>
                                </div>
                                <div className="form-group">
                                    <label>Egg :</label>
                                    <input type="text" className="form-control" placeholder="Egg" name="egg" value={this.props.egg}/>
                                </div>
                                <div className="form-group">
                                    <label>Avg Spawns :</label>
                                    <input type="text" className="form-control" placeholder="Average Spawns" name="avg_spawns" value={this.props.avg_spawns}/>
                                </div>
                                <div className="form-group">
                                    <label>Spawn Time :</label>
                                    <input type="text" className="form-control" placeholder="Spawn Time" name="spawn_time" value={this.props.spawn_time}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Edit;