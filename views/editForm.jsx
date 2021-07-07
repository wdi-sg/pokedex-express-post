var React = require('react');

class Edit extends React.Component {
    render() {
        // console.log( "INSIDE jsx", this.props );
        let formUrl = "/pokemon/"+this.props.theId+"?_method=put"; //***  This is so that inside 
        // the index.js file the computer knows to route it through app.put
        // This is the part of the method-override library. 
        // Because the HTML <form>s do no yet support PUT and DELETE requests, this is the way we circumvent the problem.

        // app.put and app.get essentially has the same functionality, the different names are used to identify 
        // the method we are using for this task. 

        return (
        <html>
            <body>
            <div>
                <h1>Edit Pokemon</h1>
                
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
                </head>

                <form action={formUrl} method="POST">
                <div className="px-1 form-group">
                    <label htmlFor="id-form">ID</label>
                    <input name="id" type="text" className="form-control-plaintext" id="id-form" readOnly value={this.props.thePokemon.id}/>
                    <small className="text-danger"></small>
                </div>

                <div className="px-1 form-group">
                    <label htmlFor="num-form">Num</label>
                    <input name="num" type="text" className="form-control-plaintext" id="num-form" readOnly value= {this.props.thePokemon.num}/>
                    <small className="text-danger"></small>
                </div>

                <div className="px-1 form-group">
                    <label htmlFor="name-form">Name</label>
                    <input name="name" type="text" className="form-control" id="name-form" value={this.props.thePokemon.name}/>
                    <small className="text-danger"></small>
                </div>

                <div className="px-1 form-group">
                    <label htmlFor="img-form">Image</label>
                    <input name="img" type="text" className="form-control" id="img-form" value={this.props.thePokemon.img}/>
                    <small className="text-danger"></small>
                </div>

                <div className="px-1 form-group">
                    <label htmlFor="height-form">Height</label>
                    <input name="height" type="text" className="form-control" id="height-form" value={this.props.thePokemon.height}/>
                    <small className="text-danger"></small>
                </div>

                <div className="px-1 form-group">
                    <label htmlFor="weight-form">Weight</label>
                    <input name="weight" type="text" className="form-control" id="weight-form" value={this.props.thePokemon.weight}/>
                    <small className="text-danger"></small>
                </div>

                <div className="px-1 form-group">
                    <label htmlFor="weight-form">Candy</label>
                    <input name="candy" type="text" className="form-control" id="candy-form" value={this.props.thePokemon.candy}/>
                    <small className="text-danger"></small>
                </div>

                <div className="px-1 form-group">
                    <label htmlFor="weight-form">Candy Count</label>
                    <input name="candy_count" type="text" className="form-control" id="candycount-form" value={this.props.thePokemon.candy_count}/>
                    <small className="text-danger"></small>
                </div>

                <div className="px-1 form-group">
                    <label htmlFor="weight-form">Egg</label>
                    <input name="egg" type="text" className="form-control" id="egg-form" value={this.props.thePokemon.egg}/>
                    <small className="text-danger"></small>
                </div>

                <div className="px-1 form-group">
                    <label htmlFor="weight-form">Average Spawn</label>
                    <input name="avg_spawns" type="text" className="form-control" id="avspawn-form" value={this.props.thePokemon.avg_spawns}/>
                    <small className="text-danger"></small>
                </div>

                <div className="px-1 form-group">
                    <label htmlFor="weight-form">Spawn Time</label>
                    <input name="spawn_time" type="text" className="form-control" id="spawntime-form" value={this.props.thePokemon.spawn_time}/>
                    <small className="text-danger"></small>
                </div>
        
                <button type="submit" className="btn btn-primary">Submit Information</button>
        </form>
            </div>
            </body>
        </html>
        )
    }
}

module.exports = Edit;